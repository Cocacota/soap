import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import React, { useState,  } from 'react';
import { Head, Link} from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';


export default function Heroes({ heroes }) {
  const [heroess, setHeroes] = useState(heroes);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarHistorial = () => {
        if (input.trim()) {
            setLoading(true); // Inicia la carga
            Inertia.get(`/matchs/${input}/history`, {}, {
                onFinish: () => setLoading(false), // Finaliza la carga cuando termina
            });
        } else {
            alert('Por favor, ingrese un ID válido.');
        }
    };

  return (
    <AuthenticatedLayout
    header={
      <div className="bg-red-700 w-full  flex">
              <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-4/5 m-8">
              <Link href='/proPlayer' className=" p-6  text-xl  text-gray-900 dark:text-gray-100 aos-flip-up">jugadores profecionales</Link>
          </div>
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-4/5 m-8">
          <Link href='/heroes' className=" p-6  text-xl  text-gray-900 dark:text-gray-100 aos-flip-up">lista de los heroes</Link>

          </div>
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-4/5 m-8">
          
          <InputLabel htmlFor="id_user" value="ingrese el id del usuario" className="block mb-2 text-sm font-medium text-white dark:text-gray-300" />

          <TextInput
              id="id_user"
              name="id_user"
              value={input}
              className="block w-full px-4 py-2 mb-4 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
              isFocused={true}
              onChange={(e) => setInput( e.target.value)}
              required
          />
              </div>
              <button
      onClick={buscarHistorial}
      disabled={loading}
      className={`px-4 py-2 m-auto rounded-md text-white ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
      }`}
  >
      {loading ? 'Buscando...' : 'Buscar Historial'}
  </button>
          
              </div>
  }
    >
      <Head title="Heroes" />
      <h1 className='text-white'>Heroes List</h1>
      <ul>
        {heroess.map((heroe) => (
          <li key={heroe.id} className="p-6 text-gray-800 dark:text-gray-100 aos-flip-up bg-gray-100 mb-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{heroe.localized_name}</h2>
            <p>{heroe.primary_attr}</p>
          <Link href={`/heroes/${heroe.id}`}>
            mas detelles
          </Link>
          </li>
        ))}
      </ul>
    </AuthenticatedLayout>
  );
}
