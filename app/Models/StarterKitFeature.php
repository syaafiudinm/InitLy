<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StarterKitFeature extends Model
{
    protected $fillable = ["starter_kit_id", "name"];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<\App\Models\StarterKit, \App\Models\StarterKitFeature>
     */
    public function starterKit()
    {
        return $this->belongsTo(StarterKit::class);
    }
}
