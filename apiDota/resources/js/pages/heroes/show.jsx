import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function Heroes({ heroes }) {
  const [heroess, setHeroes] = useState(heroes);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-3xl bg-gray-800 font-semibold leading-tight text-red-800 dark:text-gray-200">
          Posts
        </h2>
      }
    >
      <Head title="Heroes" />
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