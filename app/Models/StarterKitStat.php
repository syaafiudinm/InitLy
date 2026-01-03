<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StarterKitStat extends Model
{
    public $timestamps = false;

    protected $primaryKey = "starter_kit_id";
    public $incrementing = false;

    protected $fillable = [
        "starter_kit_id",
        "installs_count",
        "last_installed_at",
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<\App\Models\StarterKit, \App\Models\StarterKitStat>
     */
    public function starterKit()
    {
        return $this->belongsTo(StarterKit::class);
    }
}
