export class ImageUploadItem {
  url: string = ""
  file: File | null = null

  constructor(partial: Partial<ImageUploadItem> = {}) {
    Object.assign(this, partial)
  }

  isBlobUrl() {
    return this.url.startsWith("blob:")
  }

  revokeIfNeeded() {
    if (this.file && this.isBlobUrl()) {
      URL.revokeObjectURL(this.url)
    }
  }

  empty() {
    return this.file === null && this.url.length === 0
  }
}