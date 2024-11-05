// resources/js/Pages/heroes.jsx
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import NavLink from '../../Components/NavLink';


export default function proPlayer({ players }) {
  const [playerss, setHeroes] = useState(players.original);
console.log(playerss);
  return (
    <div>
      <Head title="proPlayers" />
      <h1>lista de jugadores profecionales</h1>
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
    </div>
  );
}
