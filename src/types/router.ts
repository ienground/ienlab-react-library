export type AppMatch<TData> = {
  loaderData: TData
  params: Record<string, string | undefined>
  pathname: string
}