import cookie from "cookie"
import { Cookies } from "react-cookie"

export const isServer = typeof window === 'undefined'

export function parseCookies(req: any) {
    // console.log(req)
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export const getCookies = (ctx:any) => {
    if (ctx && ctx.req && ctx.req.headers.cookie) {
      return new Cookies(ctx.req.headers.cookie);
    }

    return new Cookies();
  }