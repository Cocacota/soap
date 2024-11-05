<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipos extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'descripcion', 'user_id', 'evento_id'];

    public function user()
    {
        return $this->hasMany(User::class);
    }
    public function evento()
    {
        return $this->belongsTo(Eventos::class);
    }
}
