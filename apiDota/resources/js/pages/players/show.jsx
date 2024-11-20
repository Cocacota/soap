import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import React, { useState,  } from 'react';
import { Head, Link} from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
 import NavLink from '@/Components/NavLink';
export default function proPlayer({ player }) {
    
  const [jugador, setHeroes] = useState(player.original);
  return (
    <AuthenticatedLayout
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