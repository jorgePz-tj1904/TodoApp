"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const NewTarea = ({ params }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (params.id) {
      fetch(`/api/task/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
        });
    }
  }, []);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!params.id) {
      const res = await fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      router.refresh()
      console.log('creado correctamente');
    } else {
      await fetch(`/api/task/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      router.refresh()
      console.log('actualizado correctamente');
    }

    router.push('/');
  };

  return (
    <div className="flex justify-center items-center h-screen text-black text-center">
      <form onSubmit={submitHandler} action="" className="bg-slate-500 p-4 rounded-lg shadow-lg w-96">
        {params.id ? <h1 className=' font-bold text-4xl text-white mb-6'>Editar tarea</h1> : <h1 className=' font-bold text-4xl text-white mb-6'>Crear tarea</h1>}
        <div className="mb-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} id='title' type="text" className="w-full p-2 border rounded" placeholder="Escribe una tarea" />
        </div>
        <div className="mb-4">
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} id='description' rows="3" className="w-full p-2 border rounded resize-none" placeholder="Escribe una descripción"></textarea>
        </div>
        <div className="text-center">
          {params.id ?
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Guardar
            </button> :
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Crear
            </button>}
        </div>
      </form>
    </div>
  );
};

export default NewTarea;
