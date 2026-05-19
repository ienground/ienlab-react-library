import type {CSSProperties} from "react";

export const ToastCSS = {
  Info: {
    Soft: {
      '--normal-bg':
        'color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, var(--background))',
      '--normal-text': 'light-dark(var(--color-sky-600), var(--color-sky-400))',
      '--normal-border': 'light-dark(var(--color-sky-600), var(--color-sky-400))'
    } as CSSProperties,

    Outline: {
      '--normal-bg': 'var(--background)',
      '--normal-text': 'light-dark(var(--color-sky-600), var(--color-sky-400))',
      '--normal-border': 'light-dark(var(--color-sky-600), var(--color-sky-400))'
    } as CSSProperties,

    Solid: {
      '--normal-bg': 'light-dark(var(--color-sky-600), var(--color-sky-400))',
      '--normal-text': 'var(--color-white)',
      '--normal-border': 'light-dark(var(--color-sky-600), var(--color-sky-400))'
    } as CSSProperties
  },

  Success: {
    Soft: {
      '--normal-bg':
        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
      '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
      '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
    } as CSSProperties,

    Outline: {
      '--normal-bg': 'var(--background)',
      '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
      '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
    } as CSSProperties,

    Solid: {
      '--normal-bg': 'light-dark(var(--color-green-600), var(--color-green-400))',
      '--normal-text': 'var(--color-white)',
      '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
    } as CSSProperties
  },

  Warning: {
    Soft: {
      '--normal-bg':
        'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
      '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
      '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
    } as CSSProperties,

    Outline: {
      '--normal-bg': 'var(--background)',
      '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
      '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
    } as CSSProperties,

    Solid: {
      '--normal-bg': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
      '--normal-text': 'var(--color-white)',
      '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
    } as CSSProperties
  },

  Destructive: {
    Soft: {
      '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
      '--normal-text': 'var(--destructive)',
      '--normal-border': 'var(--destructive)'
    } as CSSProperties,

    Outline: {
      '--normal-bg': 'var(--background)',
      '--normal-text': 'var(--destructive)',
      '--normal-border': 'var(--destructive)'
    } as CSSProperties,

    Solid: {
      '--normal-bg':
        'light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))',
      '--normal-text': 'var(--color-white)',
      '--normal-border': 'transparent'
    } as CSSProperties
  }
}