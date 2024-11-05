<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentarios extends Model
{
    use HasFactory;
    protected $fillable = ['contenido', 'user_id', 'posts_id'];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function posts()
    {
        return $this->belongsTo(Posts::class);
    }
}
