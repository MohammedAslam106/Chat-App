import { NextResponse } from "next/server"


export async function POST(request:Request ){
    try {
        const response=NextResponse.json({message:'Logout Successfuly'})
        response.cookies.delete('uid')
        return response
    } catch (error) {
        return Response.json({error})
    }
}