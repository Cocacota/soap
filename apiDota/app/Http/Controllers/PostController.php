<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\posts;
use App\Models\Comentarios;
use App\Models\Like;
use App\models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    
    

    // Método para obtener y devolver todas las publicaciones
    public function index() {
        $posts = posts::all();
        foreach($posts as $post){
            $user= User::findOrFail($post['user_id']);
            $post['user_id']=$user['name'];
        }
        
        return Inertia::render('Posts/index', [
            'posts' => $posts,
            
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
        return Inertia::render('posts/create');
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        posts::create([
            'titulo'=> $validatedData['titulo'],
            'contenido'=>$validatedData['contenido'],
            'user_id'=> Auth::id()]);

        return redirect()->route('posts.index');
    }
    public function likePost ($post_id){
        $post = posts::findOrFail($post_id);
        $userId = Auth::id();

        
        $likeExists = DB::table('likes')
        ->where('posts_id', $post_id)
        ->where('user_id', $userId)
        ->exists();

    if ($likeExists) {
        // Si el "like" ya existe, eliminarlo y disminuir el contador
        DB::table('likes')
            ->where('posts_id', $post_id)
            ->where('user_id', $userId)
            ->delete();

        $post->likes = max(0, $post->likes - 1);
        $liked = false;
    } else {
        // Si no existe, agregar el "like" y aumentar el contador
        DB::table('likes')->insert([
            'posts_id' => $post_id,
            'user_id' => $userId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $post->likes += 1;
        $liked = true;
    }

    $post->save();
    return redirect()->back()->with('success', 'likeado');

    }
}
