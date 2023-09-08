"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { message } from 'antd';

const NewTarea = ({ params }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteHandler = async (id) => {
    setLoading(true);
    try {
      await fetch(`/api/task/${id}`, {
        method: 'DELETE',
      })
      router.push('/');
    } catch (error) {
      console.log(error.message);
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      setLoading(true)
      fetch(`/api/task/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
          setLoading(false);
        });
    }
    const id = parseInt(localStorage.getItem('userId'), 10);
    setUserId(id);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (title && description) {
      if (!params.id) {
        try {
          await fetch('/api/task', {
            method: 'POST',
            body: JSON.stringify({ title, description, userId: userId }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          router.refresh();
          console.log('creado correctamente');
          message.success('Tarea creada correctamente!')
          router.push('/');
        } catch (error) {
          console.log(error);
          message.error('hubo un problema');
          setLoading(false);
        }
      } else {
        try {
          await fetch(`/api/task/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          router.refresh()
          message.success('Actualizado correctamente!')
          console.log('actualizado correctamente');
          router.push('/');
        } catch (error) {
          console.log(error);
          message.error('hubo un problema');
          setLoading(false);
        }
      }
    } else {
      message.error('faltan datos');
    }
    setLoading(false)
  };

  return (
    <div className="flex justify-center items-center h-screen text-black text-center">
      {!loading?
      <form onSubmit={submitHandler} action="" className="bg-slate-500 p-4 rounded-lg shadow-lg w-96">
      {params.id ? <h1 className=' font-bold text-4xl text-white mb-6'>Editar tarea</h1> : <h1 className=' font-bold text-4xl text-white mb-6'>Crear tarea</h1>}
      <div className="mb-4">
        {
          <input value={title} onChange={(e) => setTitle(e.target.value)} id='title' type="text" className="w-full p-2 border rounded" placeholder="Escribe una tarea" />
        }
      </div>
      <div className="mb-4">

          <textarea value={description} onChange={(e) => setDescription(e.target.value)} id='description' rows="3" className="w-full p-2 border rounded resize-none" placeholder="Escribe una descripción"></textarea>
        
      </div>
      <div className="text-center">
        {params.id ?
          <button disabled={loading} className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {!loading ? 'Guardar' : 'Cargando'}
          </button> :
          <button disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
            {!loading ? 'Crear' : 'Cargando'}
          </button>}
        {params.id && <button disabled={loading} type='button' className="bg-red-500 hover:bg-red-400 font-bold py-2 px-4 rounded mt-4 ml-2 text-white disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => deleteHandler(params.id)}>
        {!loading ? 'Borrar' : 'Cargando'}
        </button>
        }
      </div>
    </form>: <div className=' ml-5'><img src="https://i.ibb.co/wSGF6Nt/1494.gif" className=' mx-auto'/></div>}
    </div>
  );
};

export default NewTarea;
