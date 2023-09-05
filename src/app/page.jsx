import React from 'react'
import Tasks from '@/components/Tasks';
import { prisma } from "@/libs/prisma";
const loadTask=async()=>{
  const data = prisma.task.findMany();
  return data
}

const HomePage =async() => {
  const tasks = await loadTask();

  return (
    <div>
      <h1 className=' text-center text-3xl'>Tareas</h1>
      <div>
        <Tasks tasks={tasks}/>
      </div>
    </div>
  )
}

export default HomePage