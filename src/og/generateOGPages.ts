/// <reference types="node" />
import {existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs"
import {join} from "node:path"
import type {OGData} from "./types.js"

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export function replaceOGTags(html: string, og: OGData): string {
  const t = escapeHtml(og.title)
  const d = escapeHtml(og.description)
  const i = escapeHtml(og.image)

  return html
    .replace(/(<title>)[^<]*(<\/title>)/, (_, open, close) => `${open}${t}${close}`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      (_, pre, quote) => `${pre}${d}${quote}`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      (_, pre, quote) => `${pre}${t}${quote}`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      (_, pre, quote) => `${pre}${d}${quote}`,
    )
    .replace(
      /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
      (_, pre, quote) => `${pre}${i}${quote}`,
    )
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      (_, pre, quote) => `${pre}${t}${quote}`,
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      (_, pre, quote) => `${pre}${d}${quote}`,
    )
    .replace(
      /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
      (_, pre, quote) => `${pre}${i}${quote}`,
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
