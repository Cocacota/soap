import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

function formatTime(seconds) {
    // Redondear hacia el minuto más cercano
    let mins = Math.floor(seconds / 60);
    let secs = Math.round(seconds % 60);

    // Asegurar que los segundos estén en dos dígitos (por ejemplo, 05)
    secs = secs < 10 ? '0' + secs : secs;

    // Retornar el formato mm:ss
    return `${mins}:${secs}`;
}

export default function matchs({ matchs }) {
  const [matches, setHeroes] = useState(matchs.original);
console.log(matches);
  return (
    <div>
      <Head title="matchs" />
      <h1>informacion de las partidas del jugador</h1>
      <ul>
        {matches.map((match) => (
          <li key={match.match_id} className="p-6 text-gray-800 dark:text-gray-100 aos-flip-up bg-gray-100 mb-4 rounded-lg shadow-md flex">
            <p>duracion { formatTime( match.duration)}</p>
            <p>modo de juego {match.game_mode}</p>
            <p>heroe de la partida {match.hero_id}</p>
            <p>asesinatos totales {match.kills}</p>
            <p>muertes {match.deaths} </p>
            <p>asistencias {match.assists} </p>
            
          </li>
        ))}
      </ul>
    </div>
  );
}