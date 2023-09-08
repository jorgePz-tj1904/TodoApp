import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma";


export async function GET(request, { params }) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                name: String(params.usuario),
            },
            include: {
                tasks: true,
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
export const DELETE= async(request, {params})=>{
    try {
        const task = await prisma.user.delete({
            where:{
                id: Number(params.id)
            }
        });
        return NextResponse.json('se elimino correctamente'+ task);
    } catch (error) {
        return NextResponse.json(error.message)
    }
}