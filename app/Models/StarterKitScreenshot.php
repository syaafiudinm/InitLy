<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StarterKitScreenshot extends Model
{
    protected $fillable = ["starter_kit_id", "image_path", "order"];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<\App\Models\StarterKit, \App\Models\StarterKitScreenshot>
     */
    public function starterKit()
    {
        return $this->belongsTo(StarterKit::class);
    }
}
