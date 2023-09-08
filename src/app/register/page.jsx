'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { message } from "antd";

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const registerHandler = async (e) => {
    e.preventDefault();
    if(name && password){
      if(name.includes(' ') || password.includes(' ')){
        return message.error('El nombre y la contraseña no deben tener espacios en blanco')
      }
      try {
        const data = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ name, password}),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        localStorage.setItem('user', name);
        message.success('Registrado correctamente')
        router.push('/')
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }else{
      message.error('Faltan datos.')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen text-white text-center">

      <form action="" className="bg-slate-500 p-4 rounded-lg shadow-lg w-96" onSubmit={registerHandler}>

        <h1 className=' text-white font-bold'>Registrarte</h1>
        <div className="mb-4 text-black">
          <input onChange={(e) => setName(e.target.value)} value={name} id='usuario' type="text" className="w-full p-2 border rounded" placeholder="Escribe tu usuario" />
        </div>
        <div className="mb-4 text-black">
          <input onChange={(e) => setPassword(e.target.value)} value={password} id='password' type="password" className="w-full p-2 border rounded" placeholder="Escribe tu contraseña" />
        </div>
        <div className="text-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Registrarse
          </button>
        </div>

      </form>
    </div>
  )
}

export default Register