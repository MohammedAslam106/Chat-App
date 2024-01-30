import { NextResponse } from "next/server"

export async function POST( request:Request ){
    try {
        const body=await request.json()
        const response=NextResponse.json({body})
        response.cookies.set('uid',body)
        return response
    } catch (error) {
        return Response.json({error})
    }
    
}