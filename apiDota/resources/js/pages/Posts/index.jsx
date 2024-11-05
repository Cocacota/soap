import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';


export default function Index({ posts }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-3xl bg-gray-800 font-semibold leading-tight text-red-800 dark:text-gray-200">
          Posts
        </h2>
      }
    >
      <Head title="Posts" />
      <div>
        <h1 className="text-2xl font-bold mb-4">Publicaciones del Blog</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="p-6 text-gray-800 dark:text-gray-100 aos-flip-up bg-gray-100 mb-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{post.titulo}</h2>
              {/* Inserta HTML de manera segura */}
              <p dangerouslySetInnerHTML={{ __html: post.contenido }} />
            </li>
          ))}
        </ul>
        <Link
          href={route('posts.create')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        >
                            crear post
                        </Link>
      </div>
    </AuthenticatedLayout>
  );
}