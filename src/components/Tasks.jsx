'use client'
import Link from 'next/link';
import {useRouter} from 'next/navigation'
const deleteHandler=async(id)=>{
    try {
        await fetch(`http://localhost:3000/api/task/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })
    } catch (error) {
        console.log(error.message);
    }
}

const Tasks = ({tasks}) => {
    const router = useRouter();

  return (
    <div>
      <div className="flex flex-wrap justify-center mt-28">
        {tasks && tasks.map((task)=>(
         <div className='bg-slate-500 m-3 p-4 rounded-lg max-w-xs' key={task.id}>
          <h1 className=' text-2xl font-bold'>{task.title}</h1>
          <p className=' mt-3'>{task.description}</p>
          <p>{new Date(task.createdAt).toLocaleDateString()}</p>

          <button className="bg-red-500 hover:bg-red-400 font-bold py-2 px-4 rounded mt-4" onClick={()=>deleteHandler(task.id)}>Borrar</button>

          <button className=" bg-green-500 hover:bg-green-400 ml-4 font-bold py-2 px-4 rounded mt-4" onClick={()=>router.push(`/tasks/edit/${task.id}`)}>Editar</button>
        </div>
      ))}
    </div>
    <Link className=' absolute bottom-2 right-2 mr-4 mb-4 text-8xl text-white bg-slate-500 rounded-full w-30 h-26' href='/new'>+</Link>
    </div>
  )
}

export default Tasks