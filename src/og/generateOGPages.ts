/// <reference types="node" />
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs"
import {join} from "node:path"
import type {OGData} from "./types.js"

export function replaceOGTags(html: string, og: OGData): string {
  return html
    .replace(/(<title>)[^<]*(<\/title>)/, `$1${og.title}$2`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${og.description}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${og.title}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${og.description}$2`,
    )
    .replace(
      /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
      `$1${og.image}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      `$1${og.title}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      `$1${og.description}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
      `$1${og.image}$2`,
    )
}

export function generateOGPages(
  distDir: string,
  routeMap: Record<string, OGData>,
  templateFile = "index.html",
): void {
  const indexPath = join(distDir, templateFile)

  if (!existsSync(indexPath)) {
    console.error(`[generateOGPages] Template not found: ${indexPath}`)
    process.exit(1)
  }

  const html = readFileSync(indexPath, "utf-8")
  let count = 0

  for (const [route, og] of Object.entries(routeMap)) {
    const dir = join(distDir, route.replace(/^\//, ""))
    mkdirSync(dir, {recursive: true})
    writeFileSync(join(dir, "index.html"), replaceOGTags(html, og), "utf-8")
    console.log(`  ✓ ${route} → ${join(dir, "index.html")}`)
    count++
  }

  console.log(`\n✅ ${count} OG pages generated`)
}
