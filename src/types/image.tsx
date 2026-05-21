import type {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react"

export type FieldProps = {
  children: ReactNode
}

export type DescriptionProps = {
  children: ReactNode
}

export type CardProps = HTMLAttributes<HTMLDivElement>

export type ScrollAreaProps = {
  className?: string
  children?: ReactNode
  style?: CSSProperties
  dir?: "ltr" | "rtl"
  type?: "auto" | "always" | "scroll" | "hover"
  scrollHideDelay?: number
}

export type ScrollBarProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical"
}

export type IconProps = {
  className?: string
}

export type ButtonLikeProps = ButtonHTMLAttributes<HTMLButtonElement>

export const DefaultField = ({ children }: FieldProps) => <div>{children}</div>

export const DefaultFieldLabel = (
  props: LabelHTMLAttributes<HTMLLabelElement>,
) => <label {...props} />

export const DefaultFieldDescription = ({ children }: DescriptionProps) => (
  <p>{children}</p>
)

export const DefaultInput = (
  props: InputHTMLAttributes<HTMLInputElement>,
) => <input {...props} />

export const DefaultScrollArea = ({
                                    children,
                                    ...props
                                  }: ScrollAreaProps) => <div {...props}>{children}</div>

export const DefaultScrollBar = (_props: ScrollBarProps) => null

export const DefaultCard = ({ children, ...props }: CardProps) => (
  <div {...props}>{children}</div>
)

export const DefaultButton = ({
                                children,
                                type = "button",
                                ...props
                              }: ButtonLikeProps) => (
  <button type={type} {...props}>
    {children}
  </button>
)

export const DefaultCloseIcon = ({ className }: IconProps) => (
  <span className={className}>×</span>
)