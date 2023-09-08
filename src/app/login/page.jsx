'use client'
import Link from "next/link";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { message } from "antd";

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando]=useState(false);
  const router = useRouter();
  

  const loginHandler = async (e) => {
    setCargando(true);
    e.preventDefault()
   if(!name || !password){
    setCargando(false)
    return message.error('Faltan datos.')
   }
   try {
    const res = await fetch(`/api/users/${name}`);
    const data = await res.json();
    if (data.password === password) {
      localStorage.setItem('user', name);
      localStorage.setItem('userId', data.id);
      console.log('funca?');
      return router.push('/');
    }else if(data.id){
      message.error('Contraseña incorrecta');
      setCargando(false);
    }
  } catch (error) {
    console.log(error);
    message.error('No existe ese Usuario');
    setCargando(false);
  }
  }

  return (
    <div className="flex justify-center items-center h-screen text-white text-center" >
      <form action="" className="bg-slate-500 p-4 rounded-lg shadow-lg w-96" onSubmit={loginHandler}>
        <h1 className=' text-white font-bold'>Iniciar Sesion</h1>
        <div className="mb-4 text-black">
          <input value={name} id='name' type="text" className="w-full p-2 border rounded" placeholder="Escribe tu usuario" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-4 text-black">
          <input value={password} id='password' type="password" className="w-full p-2 border rounded" placeholder="Escribe tu contraseña" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="text-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed" disabled={cargando}>
            {
              !cargando?'Iniciar sesion':"Cargando"
            }
          </button>
        </div>
        <p>No tienes cuenta? registrate <Link className=" text-blue-500 cursor-pointer" href='/register'>aqui</Link></p>
      </form>
    </div>
  )
}

export default Login;