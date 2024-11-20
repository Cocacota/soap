import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import React, { useState, useEffect } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';



export default function Index({ posts }) {

  
  const [buscador, setBuscador] = useState('');
  const [posteos, setFilteredPosts] = useState(posts);
    useEffect(() => {
      if(buscador===''){
        setFilteredPosts(posts);
      }
      // Filtrar los posteos en tiempo real a medida que se escribe en la barra de búsqueda
      const lowerCaseInput = buscador.toLowerCase();
      const filtro = posts.filter(post => 
          post.titulo.toLowerCase().includes(lowerCaseInput)
      );
      setFilteredPosts(filtro);
  }, [buscador, posts]); 

  
  const darLike = (postId) => {
    Inertia.post(`/posts/${postId}/like`, {}, {
        preserveScroll: true,
        onSuccess: (page) => {
            const updatedPosts = page.props.posts; // Actualización basada en la respuesta
            setPosts(updatedPosts);
        }
    });
  }
  return (
    <AuthenticatedLayout
    
    >
      <Head title="Posts" />
      <div className='mx-80'>
      <Link
          href={route('posts.create')}
                            className="rounded-md text-xl text-white underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        >
                            crear post
                        </Link>
        <h1 className="text-2xl font-bold mb-4 text-white">Publicaciones del Blog</h1>
          <InputLabel htmlFor="buscador" value="buscador" className='text-white my-4'/>
            <TextInput
              id="filtro"
              type="text"
              name="filtro"
              value={buscador}
              className="my-4 block w-full"
              autoComplete="buscador"
              onChange={(e) => setBuscador( e.target.value)}
              required
            />
            {posteos.length > 0 ? (
        <ul>
          {posteos.map((post) => (
            <li key={post.id} className="p-6 my-4 text-gray-800 dark:text-gray-100 aos-flip-up bg-gray-100 mb-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{post.titulo}</h2>
              {/* Inserta HTML de manera segura */}
              <p dangerouslySetInnerHTML={{ __html: post.contenido }} />
              <p> cantidad de likes {post.likes}   </p> 
              <button onClick={() => darLike(post.id)} > like</button>
              <p> usuario que creo el post {post.user_id} </p>
            </li>
          ))}
        </ul>
            ):(
              <p className="p-6 my-4 text-gray-800 dark:text-gray-100 aos-flip-up bg-gray-100 mb-4 rounded-lg shadow-md">No se encontraron posteos.</p>
            )}
            
        
      </div>
    </AuthenticatedLayout>
  );
}