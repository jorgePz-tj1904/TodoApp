'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Checkbox, message, Button, Dropdown, Space } from 'antd';
import { useEffect, useState } from 'react';


const Tasks = ({ tasks }) => {
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState('');

  const logOutHandler = () => {
    setLogin(false);
    setUser('');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  }

  const items = [
    {
      key: '1',
      label: (
        <p>{user} <i class='bx bxs-log-out'></i></p>
      ),
    },
    {
      key: '2',
      label: (
        <button onClick={logOutHandler}>
          Cerrar Sesión
        </button>
      ),
      danger: true,
    },
  ];

  const loginHandler = () => {
    const data = localStorage.getItem('user');
    if (!data) {
      return message.info('inicia sesion')
    }
    setLogin(true);
    console.log(data);
    setUser(data);
  };


  useEffect(() => {
    loginHandler()
  })

  return (
    <div className="flex justify-center items-center">

      {
        login &&
        <>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            className="absolute top-0 right-3 h-10 text-white mt-[-24px] md:m-4 md:text-2xl px-2 rounded-md"
          >
            <Button>Perfil</Button>
          </Dropdown>
        </>

      }
      {tasks[0] === 'null' && login === true ? (
        <div className=' text-center font-bold text-3xl mt-40'>
          <h2>No hay tareas!! añade una con el botón de abajo a la derecha.</h2>
        </div>
      ) : (
        !login && (
          <div className=' text-center'>
            <div className="my-8 sm:ml-32"> {/* Contenedor para centrar */}
              <h2 className="text-3xl">Inicia sesión para añadir notas!</h2>
              <Link href='/login' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 inline-block">
                Iniciar Sesión
              </Link>
            </div>
          </div>
        )
      )}
      {tasks.length === 0 && login && <div><img src="https://i.ibb.co/wSGF6Nt/1494.gif" className=' mx-auto' /></div>}

      <div className={`grid grid-cols-1 gap-4 mx-2 sm:mx-4 sm:grid-cols-3 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-20`}>

        {tasks[0] !== 'null' && login &&
          tasks.map((task) => (
            <div className='bg-slate-500 p-4 rounded-lg max-w-xs shadow-2xl' key={task.id}>
              <h1 className='text-2xl font-bold'>{task.title}</h1>
              <p className='mt-3'>{task.description}</p>
              <p>{new Date(task.createdAt).toLocaleDateString()}</p>

              <button className="bg-blue-500 hover:bg-blue-600 ml-0 font-bold py-2 px-4 rounded mt-4" onClick={() => router.push(`/tasks/edit/${task.id}`)}>
                Editar
              </button>
            </div>
          ))}
      </div>
      {
        login && <Link className='bottom-2 right-2 mr-4 mb-4 text-8xl text-white w-24 h-26 fixed' href='/new'>
          <img src="https://i.ibb.co/xgcSGbB/icons8-m-s-128.png" alt="icons8-m-s-128" border="0" />
        </Link>
      }
    </div>
  );
};

export default Tasks;