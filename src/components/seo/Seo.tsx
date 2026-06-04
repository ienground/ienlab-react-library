// src/components/common/Seo.tsx
import {Helmet} from "react-helmet-async"

type Props = {
  title: string
  description?: string
  image?: string
}

export function Seo({title, description, image}: Props) {
  const fullTitle = title
  const fallbackImage = `${window.location.origin}/og-default.png`
  const ogImage = image ?? fallbackImage
  const url = window.location.href

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description}/>

      <meta property="og:type" content="website"/>
      <meta property="og:title" content={fullTitle}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content={ogImage}/>
      <meta property="og:url" content={url}/>

      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={fullTitle}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:image" content={ogImage}/>
    </Helmet>
  )
}