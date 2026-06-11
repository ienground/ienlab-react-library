export class FileUploadItem {
  url: string = ""
  file: File | null = null

  constructor(partial: Partial<FileUploadItem> = {}) {
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

  get isEmpty() {
    return !this.file && !this.url
  }
}