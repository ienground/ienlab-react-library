import {type ReactNode, useEffect, useRef} from "react"

export function NaverLogin(props: {
  clientId: string,
  callbackUrl: string,
  domain?: string,
  onToken?: (token: string) => void,
  render: (onClick: () => void) => ReactNode
}) {
  const hiddenRef = useRef<HTMLDivElement>(null)
  const naver = window.naver

  useEffect(() => {
    if (!naver || !hiddenRef.current) return
    const naverLogin = new naver.LoginWithNaverId({
      clientId: props.clientId,
      callbackUrl: props.callbackUrl,
      isPopup: true,
      loginButton: {
        color: "green",
        type: 3,
        height: 50,
      },
    })

    naverLogin.init()
  }, [])

  useEffect(() => {
    if (!window.opener) return

    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const accessToken = params.get("access_token")

    if (accessToken) {
      window.opener.postMessage(
        { type: "naver_login", token: accessToken },
        window.location.origin
      )
    }

    window.close()
  }, [])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "naver_login" && event.data?.token) {
        props.onToken?.(event.data.token)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [props.onToken])

  const handleCustomLogin = () => {
    const anchor = hiddenRef.current?.querySelector("a") as HTMLAnchorElement | null
    anchor?.click()
  }

  return (
    <>
      <div
        id="naverIdLogin"
        ref={hiddenRef}
        className="hidden"
        aria-hidden="true"
      />
      {props.render(handleCustomLogin)}
    </>
  )
}