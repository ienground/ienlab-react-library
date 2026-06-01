export type AppMatch<TData> = {
  data: TData
  params: Record<string, string | undefined>
  pathname: string
}