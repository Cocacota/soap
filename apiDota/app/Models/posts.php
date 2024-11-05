<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class posts extends Model
{
    use HasFactory;

    protected $fillable = ['titulo', 'contenido', 'user_id','likes','comentario_id'];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function comentario()
    {
        return $this->hasMany(Comentarios::class);
    }

}
