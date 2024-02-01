import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path=request.nextUrl.pathname
    const isPublicPath=path==='/' 
    const token=request.cookies.get('uid')
    // console.log(token)
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/chat-room',request.nextUrl))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/',request.nextUrl))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/chat-room/:id*'
    // '/',
    // '/login',
    // '/signup',
    // '/profile/:path*',
    // '/verifyemail'
  ]
}