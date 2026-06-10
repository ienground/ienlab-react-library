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

/** 기본 Field 렌더러 - children을 div로 감싸 반환합니다 */
export const DefaultField = ({ children }: FieldProps) => <div>{children}</div>

/** 기본 Label 렌더러 - label 엘리먼트를 반환합니다 */
export const DefaultFieldLabel = (
  props: LabelHTMLAttributes<HTMLLabelElement>,
) => <label {...props} />

/** 기본 Description 렌더러 - p 엘리먼트를 반환합니다 */
export const DefaultFieldDescription = ({ children }: DescriptionProps) => (
  <p>{children}</p>
)

/** 기본 Input 렌더러 - input 엘리먼트를 반환합니다 */
export const DefaultInput = (
  props: InputHTMLAttributes<HTMLInputElement>,
) => <input {...props} />

/** 기본 ScrollArea 렌더러 - div로 감싸 반환합니다 */
export const DefaultScrollArea = ({
                                    children,
                                    ...props
                                  }: ScrollAreaProps) => <div {...props}>{children}</div>

/** 기본 ScrollBar 렌더러 - 아무것도 렌더링하지 않습니다 */
export const DefaultScrollBar = (_props: ScrollBarProps) => null

/** 기본 Card 렌더러 - div에 props를 전달하여 반환합니다 */
export const DefaultCard = ({ children, ...props }: CardProps) => (
  <div {...props}>{children}</div>
)

/** 기본 Button 렌더러 - button 엘리먼트를 반환하며 기본 type은 "button"입니다 */
export const DefaultButton = ({
                                children,
                                type = "button",
                                ...props
                              }: ButtonLikeProps) => (
  <button type={type} {...props}>
    {children}
  </button>
)

/** 기본 닫기 아이콘 렌더러 - "×" 문자를 span으로 감싸 반환합니다 */
export const DefaultCloseIcon = ({ className }: IconProps) => (
  <span className={className}>×</span>
)