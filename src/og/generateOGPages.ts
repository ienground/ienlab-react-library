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

function replaceMetaContent(
  html: string,
  attrName: "name" | "property",
  attrValue: string,
  newContent: string,
): string {
  const metaRegex = /<meta\s[^>]*\/?>/gi

  return html.replace(metaRegex, (tag) => {
    const hasTarget = new RegExp(
      `\\s${attrName}=["']${attrValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`,
      "i",
    ).test(tag)

    if (!hasTarget) return tag
    return tag.replace(
      /content=["']([^"']*)["']/i,
      `content="${newContent}"`,
    )
  })
}

export function replaceOGTags(html: string, og: OGData): string {
  const t = escapeHtml(og.title)
  const d = escapeHtml(og.description)
  const i = escapeHtml(og.image)

  let result = html.replace(
    /(<title[^>]*>)[^<]*(<\/title>)/i,
    (_, open, close) => `${open}${t}${close}`,
  )

  result = replaceMetaContent(result, "name", "description", d)
  result = replaceMetaContent(result, "property", "og:title", t)
  result = replaceMetaContent(result, "property", "og:description", d)
  result = replaceMetaContent(result, "property", "og:image", i)
  result = replaceMetaContent(result, "name", "twitter:title", t)
  result = replaceMetaContent(result, "name", "twitter:description", d)
  result = replaceMetaContent(result, "name", "twitter:image", i)

  return result
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
