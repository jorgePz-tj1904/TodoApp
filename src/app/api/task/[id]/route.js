import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma";


export async function GET (request, {params}) {
    try {
        const task = await prisma.task.findUnique({
            where:{
                id: Number(params.id)
            }
        });
        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json(error.message);
    }
};

export const PUT= async(request, {params})=>{
    try {
        const data = await request.json();
    const taskUpdate = await prisma.task.update({
        where:{
            id: Number(params.id)
        },
        data: data
    })

    return NextResponse.json(taskUpdate);
    } catch (error) {
        return NextResponse.json(error.message);
    }
}

export const DELETE= async(request, {params})=>{
    try {
        const task = await prisma.task.delete({
            where:{
                id: Number(params.id)
            }
        });
        return NextResponse.json('se elimino correctamente'+ task);
    } catch (error) {
        return NextResponse.json(error.message)
    }
}