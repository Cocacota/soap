// resources/js/Pages/heroes.jsx
import React, { useState } from 'react';
import Layout from '../../layout/layout';
import { Head } from '@inertiajs/react';

export default function Heroes({ heroes }) {
  const [heroess, setHeroes] = useState(heroes);

  return (
    <Layout>
      <Head title="Heroes" />
      <h1>Heroes List</h1>
      <ul>
        {heroess.map((heroe) => (
          <li key={heroe.id} className="p-6 text-gray-800 dark:text-gray-100 aos-flip-up bg-gray-100 mb-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{heroe.localized_name}</h2>
            <p>{heroe.primary_attr}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
