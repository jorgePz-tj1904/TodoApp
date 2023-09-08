import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma";

export const POST=async(req,)=>{
    const data  = await req.json();
    console.log(data);
    await prisma.user.create({data})
    return NextResponse.json('se creo correctamente');
}

export const GET=async()=>{
    const data = await prisma.user.findMany()
    return NextResponse.json(data);
}