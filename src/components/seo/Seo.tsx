// src/components/common/Seo.tsx
import {Helmet} from "react-helmet-async"

type Props = {
  title: string
  description?: string
  image?: string
  fallbackImage?: string
}

export function Seo({title, description, image, fallbackImage}: Props) {
  const fullTitle = title
  const defaultOGImage = `${window.location.origin}/og/og-default.png`
  const ogImage = image ?? fallbackImage ?? defaultOGImage
  const url = window.location.href

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description}/>}

      <meta property="og:type" content="website"/>
      <meta property="og:title" content={fullTitle}/>
      {description && <meta property="og:description" content={description}/>}
      <meta property="og:image" content={ogImage}/>
      <meta property="og:url" content={url}/>

      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={fullTitle}/>
      {description && <meta name="twitter:description" content={description}/>}
      <meta name="twitter:image" content={ogImage}/>
    </Helmet>
  )
}