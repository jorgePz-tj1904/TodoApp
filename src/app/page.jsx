'use client'
import React, { useEffect, useState } from 'react';
import Tasks from '@/components/Tasks';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async (user) => {
    try {
      const response = await fetch(`/api/users/${user}`);
      if (!response) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      
      if(data.tasks.length > 0){
        setTasks(data.tasks);
      }else{
        setTasks(['null']);
      }
      
      localStorage.setItem('userId', data.id);
      console.log(tasks);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    loadTasks(user);
  }, []);

  return (
    <div className="relative">
  <div className="mt-10">
    <img
      src="https://i.ibb.co/Nyrrmcm/My-project-1-2.png"
      className="w-40 mx-auto mb-10 md:w-52"
      alt="Logo"
    />
  </div>
  <div>
    <Tasks tasks={tasks} />
  </div>
</div>
  );
};

export default HomePage;