<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StarterKitStep extends Model
{
    protected $fillable = ["title", "description", "command", "order"];

    public function starterKit()
    {
        return $this->belongsTo(StarterKit::class);
    }

    public function step()
    {
        return $this->hasMany(StarterKitStep::class)->orderBy("order");
    }
}
