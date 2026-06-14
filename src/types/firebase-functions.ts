import { type Functions, httpsCallable } from "firebase/functions"

type PrimitiveMap = {
  string: string
  number: number
  boolean: boolean
  null: null
}

type ParseType<T extends string> =
  T extends keyof PrimitiveMap
    ? PrimitiveMap[T]
    : T extends `${infer A} | ${infer B}`
      ? ParseType<A> | ParseType<B>
      : never

type SchemaRecord = {
  name: string
  params: Record<string, string>
  result: Record<string, string>
}

export type FnSchemaLike = Record<string, SchemaRecord>

export type FnKey<TSchema extends FnSchemaLike> = keyof TSchema

export type FnCallableName<
  TSchema extends FnSchemaLike,
  K extends FnKey<TSchema>,
> = TSchema[K]["name"]

export type ToRuntimeType<T extends Record<string, string>> = {
  [K in keyof T]: ParseType<T[K]>
}

export type FnParams<
  TSchema extends FnSchemaLike,
  K extends FnKey<TSchema>,
> = ToRuntimeType<TSchema[K]["params"]>

export type FnResult<
  TSchema extends FnSchemaLike,
  K extends FnKey<TSchema>,
> = ToRuntimeType<TSchema[K]["result"]>

export function createCallableFactory<TSchema extends FnSchemaLike>(
  functions: Functions,
  schema: TSchema,
) {
  return function createCallable<K extends FnKey<TSchema>>(key: K) {
    return httpsCallable<FnParams<TSchema, K>, FnResult<TSchema, K>>(
      functions,
      schema[key].name,
    )
  }
}