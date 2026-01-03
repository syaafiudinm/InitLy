<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StarterKitVersion extends Model
{
    protected $fillable = [
        "starter_kit_id",
        "version",
        "repo_url",
        "branch",
        "install_type",
        "install_command",
        "release_notes",
        "is_latest",
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<\App\Models\StarterKit, \App\Models\StarterKitVersion>
     */
    public function starterKit()
    {
        return $this->belongsTo(StarterKit::class);
    }
}
