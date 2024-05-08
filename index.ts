/**
 * AllKeysAsSameType
 * 
 * Takes an interface T which is an object, and makes all its keys the same type.
 * 
 * Example:
 * 
 * interface Foo {
 *   foo: string;
 *   bar: number;
 * }
 * 
 * type AllKeysAsSameType<Foo, boolean> = {
 *   foo: boolean;
 *   bar: boolean;
 * }
 */
type AllKeysAsSameType<T extends Record<string | number | symbol, unknown>, U> = {
  [x in keyof T]: U;
}

/**
 * AlterSingleKey
 * 
 * Takes an interface T which is an object, one of it keys, and a new key, and changes the current key name to the new key.
 * 
 * Example:
 * 
 * interface Foo {
 *   foo: string;
 *   bar: number;
 * }
 * 
 * type AlterSingleKey<Foo, 'bar', 'foobar'> = {
 *   foo: string;
 *   foobar: number;
 * }
 */
type AlterSingleKey<T extends Record<string | number | symbol, unknown>, K extends keyof T, N extends string> = {
  [x in keyof T as x extends K ? N : x]: T[x];
};

/**
 * SingleKeyNewType
 * 
 * Takes an interface T which is an object, one of its keys, and a new type, and changes that key to be of that type.
 * 
 * Example:
 * 
 * interface Foo {
 *   foo: string;
 *   bar: number;
 * }
 * 
 * type SingleKeyNewType<Foo,'foo',boolean> = {
 *   foo: boolean;
 *   bar: number;
 * }
 */
type SingleKeyNewType<T extends Record<string | number | symbol, unknown>, K extends keyof T, N extends any> = {
  [x in keyof T]: x extends K ? N : T[x];
}

/**
 * CamelCase
 * 
 * Turns a snake_cased_string into a camelCasedString.
 */
type CamelCase<T extends string> =
  Lowercase<T> extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<CamelCase<Tail>>}`
  : Lowercase<T>;

/**
 * CamelCaseKeys
 * 
 * Takes an interface T which is an object with snake_cased_keys, and turns them into camelCasedKeys.
 */
type CamelCaseKeys<T> = T extends Record<string | number | symbol, unknown> ? {
  [x in keyof T as CamelCase<`${string & x}`>]: T[x] extends Array<infer U extends Record<string | number | symbol, unknown>> ? Array<CamelCaseKeys<U>> : CamelCaseKeys<T[x]>;
} : T;

/**
 * KeysWithPostString
 * 
 * Takes an interface T which is an object, and adds a given string to the end of all its keys.
 * 
 * Example:
 * 
 * interface Foo {
 *   foo: string;
 *   bar: boolean;
 * }
 * 
 * type KeysWithPostString<Foo, 'Match'> = {
 *   fooMatch: string;
 *   barMatch: boolean;
 * }
 */
type KeysWithPostString<T extends Record<string | number | symbol, unknown>, S extends string> = {
  [x in keyof T as `${string & x}${S}`]: T[x];
}

/**
 * KeysWithPreString
 * 
 * Takes an interface T which is an object, and adds a given string to the start of all its keys.
 * 
 * Example:
 * 
 * interface Foo {
 *   foo: string;
 *   bar: boolean;
 * }
 * 
 * type KeysWithPreString<Foo, 'update_'> = {
 *   update_foo: string;
 *   update_bar: boolean;
 * }
 */
type KeysWithPreString<T extends Record<string | number | symbol, unknown>, S extends string> = {
  [x in keyof T as `${S}${Capitalize<string & x>}`]: T[x];
}

/**
 * PrependString
 * 
 * Takes a string T and prepends a given string S as long as T does not already start with that string.
 * 
 * Example:
 * 
 * PrependString<'name','project_'> = 'project_name'
 * PrependString<'project_name','project_'> = 'project_name'
 */
type PrependString<T extends string, S extends string> =
  T extends `${S}${infer Tail}`
  ? T
  : `${S}${T}`;

/**
 * PrependStringToKeys
 * 
 * Similar to PrependString, except T is an object and the transformation is applied to each of its keys.
 * 
 * Example:
 * 
 * interface Foo {
 *   foo: string;
 *   bar: number;
 * }
 * 
 * type PrependStringToKeys<Foo,'foo'> = {
 *   foo: string;
 *   foobar: number;
 * }
 */
type PrependStringToKeys<T extends Record<string | number | symbol, unknown>, S extends string> = {
  [x in keyof T as PrependString<`${string & x}`,S>]: T[x];
}

/**
 * ArrayElement
 * 
 * Takes an array and extracts the type of the inner elements.
 * 
 * Example:
 * 
 * type Foo = Array<string>
 * 
 * type ArrayElement<Foo> = string
 */
type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/**
 * AllNullable
 * 
 * Takes in a type and makes all of its properties nullable rather than optional.
 * 
 * Example:
 * 
 * type Foo = {
 *   foo: number;
 *   bar: string;
 * }
 * 
 * type AllNullable<Foo> = {
 *  foo: number | null;
 *  bar: string | null;
 * }
 */
type AllNullable<T> = {
  [x in keyof T]: T[x] | null;
}

/**
 * RecursivePartial
 * 
 * Takes in an object and makes all of its properties optional.
 * Also, it checks all sub-properties and, if they are objects, makes their properties optional as well.
 * 
 * Example:
 * type Foo = {
 *  foo: number;
 *  bar: {
 *   baz: string;
 *   foobar: boolean;
 *   barbaz: {
 *    foobarbaz: number;
 *    bazbar: unknown;
 *   };
 *  }
 * }
 * 
 * type RecursivePartial<Foo> = {
 *  foo?: number;
 *  bar?: {
 *   baz?: string;
 *   foobar?: boolean;
 *   barbaz?: {
 *    foobarbaz?: number;
 *    bazbar?: unknown;
 *   }
 *  }
 * }
 */
type RecursivePartial<T extends Record<string | number | symbol, unknown>> = {
  [P in keyof T]?: T[P] extends Record<string | number | symbol, unknown> ? RecursivePartial<T[P]> : T[P];
};
