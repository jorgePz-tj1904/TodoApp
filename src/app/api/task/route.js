import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma";

export const GET=async()=>{
    const data = await prisma.task.findMany()
    return NextResponse.json(data);
}

export const POST=async(req,)=>{
    const data  = await req.json();
    console.log(data);
    await prisma.task.create({
        data
    });
    return NextResponse.json('se creo correctamente')
}