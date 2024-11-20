import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import React, { useState,  } from 'react';
import { Head, Link} from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import NavLink from '@/Components/NavLink';

export default function proPlayer({ players }) {
  
  const [playerss, setHeroes] = useState(players.original);
console.log(playerss);
  return (
    <AuthenticatedLayout
    >
      <Head title="proPlayers" />
      <h1 className='text-white'>lista de jugadores profecionales</h1>
      <ul>
        {playerss.map((player) => (
          <li key={player.account_id} className="p-6 text-gray-800 dark:text-gray-100 aos-flip-up bg-gray-100 mb-4 rounded-lg shadow-md flex">
            <img href={player.avatarmedium} className='flex'></img>
            <h2 className="text-xl font-semibold">{player.personaname}</h2>
            <p> id de cuenta {player.account_id}     id de steam {player.steamid}</p>

            <NavLink href={`/player/${player.account_id}`}>
            mas detelles
          </NavLink>
          </li>
        ))}
      </ul>
    </AuthenticatedLayout>
  );
}
