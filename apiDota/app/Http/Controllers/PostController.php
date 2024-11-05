<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\posts;
use App\Models\Comentarios;

class PostController extends Controller
{
    
    

    // Método para obtener y devolver todas las publicaciones
    public function index() {
        $posts = posts::all();
        return Inertia::render('Posts/index', [
            'posts' => $posts
        ]);
    }

    // Método para obtener una publicación específica por su ID
    public function show($post_id) {
        $post=posts::findOrFail($post_id);
        $comentario=Comentarios::where('post_id',$post_id)->get();
        return Inertia::render('posts/show',[
            'post'=>$post,
            'comentarios'=>$comentario
        ]);
    }

    public function create()
    {
        return Inertia::render('Posts/Create');
    }
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required',
            'contenido' => 'required',
        ]);

        Posts::create($request->all());

        return redirect()->route('posts.index');
    }
}
