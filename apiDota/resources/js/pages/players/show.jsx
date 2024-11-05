import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import NavLink from '../../Components/NavLink';


export default function proPlayer({ player }) {
  const [jugador, setHeroes] = useState(player.original);
console.log(jugador);
  return (
    <div className="p-6 text-gray-800 dark:text-gray-100 aos-flip-up bg-gray-100 mb-4 rounded-lg shadow-md flex">
      <Head title="perfil de jugador" />  
            <img href={jugador.profile.avatarmedium} className='flex'></img>
            <h2 className="text-xl font-semibold">{jugador.profile.personaname}</h2>
            <p> id de cuenta {jugador.profile.account_id}     id de steam {jugador.profile.steamid}</p>
            <NavLink href={`/player/${jugador.profile.account_id}/matches`}>
            mas detelles
          </NavLink>
    </div>
  );
}