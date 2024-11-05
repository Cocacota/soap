// src/components/PostsList.js
import React, { useEffect, useState } from 'react';



const PostsList = ($posts) => {
  const [posts, setPosts] = useState([]); // Estado para almacenar los posts
 
  
      setPosts($posts); // Almacena los posts en el estado
      

  return (
    <div
    >
      <h1>Publicaciones del Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} className=" p-6 text-gray-800 dark:text-gray-100 aos-flip-up bg-grey-100">
            <h2>{post.titulo.rendered}</h2>
            <p dangerouslySetInnerHTML={{ __html: post.contenido.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
