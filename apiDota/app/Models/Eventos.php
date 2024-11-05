<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eventos extends Model
{
    use HasFactory;
    protected $fillable = ['titulo', 'descripcion', 'equipo_id', 'fecha','hora'];
    
    public function equipo()
    {
        return $this->hasMany(Equipo::class);
    }

}
