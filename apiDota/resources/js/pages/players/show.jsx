import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavLink from '../../Components/NavLink';


export default function proPlayer({ player }) {
  const [jugador, setHeroes] = useState(player.original);
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-3xl bg-gray-800 font-semibold leading-tight text-red-800 dark:text-gray-200">
          detalles del jugador
        </h2>
      }
    >
      <Head title="perfil de jugador" />  
      {console.log(jugador.profile.avatarmedium)}
            <img src={jugador.profile.avatarmedium} ></img>
            <h2 className="text-xl font-semibold text-white">{jugador.profile.personaname}</h2>
            <p className='text-white'> id de cuenta {jugador.profile.account_id}     id de steam {jugador.profile.steamid}</p>
            <NavLink href={`/player/${jugador.profile.account_id}/matches`}>
            historial de partidas
          </NavLink>
    </AuthenticatedLayout>
  );
}