import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavLink from '../../Components/NavLink';


export default function proPlayer({ player }) {
  const [jugador, setHeroes] = useState(player.original);
console.log(jugador);
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-3xl bg-gray-800 font-semibold leading-tight text-red-800 dark:text-gray-200">
          Posts
        </h2>
      }
    >
      <Head title="perfil de jugador" />  
            <img href={jugador.profile.avatarmedium} className='flex'></img>
            <h2 className="text-xl font-semibold">{jugador.profile.personaname}</h2>
            <p> id de cuenta {jugador.profile.account_id}     id de steam {jugador.profile.steamid}</p>
            <NavLink href={`/player/${jugador.profile.account_id}/matches`}>
            mas detelles
          </NavLink>
    </AuthenticatedLayout>
  );
}