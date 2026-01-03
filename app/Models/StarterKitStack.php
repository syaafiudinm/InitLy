<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StarterKitStack extends Model
{
    protected $fillable = ["starter_kit_id", "name", "version"];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<\App\Models\StarterKit, \App\Models\StarterKitStack>
     */
    public function starterKit()
    {
        return $this->belongsTo(StarterKit::class);
    }
}
