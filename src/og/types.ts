export type OGData = {
  title: string
  description: string
  image: string
}

export type RouteParams = Record<string, string>

export type RouteResolver = (params: RouteParams) => OGData | Promise<OGData>
