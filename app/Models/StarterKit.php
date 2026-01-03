<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class StarterKit extends Model
{
    protected $fillable = [
        "name",
        "slug",
        "short_description",
        "description",
        "difficulty",
        "setup_time_minutes",
        "is_featured",
        "status",
    ];

    /* ======================
        |  RELATIONSHIPS
        ====================== */

    public function versions()
    {
        return $this->hasMany(StarterKitVersion::class);
    }

    public function latestVersion()
    {
        return $this->hasOne(StarterKitVersion::class)->where(
            "is_latest",
            true,
        );
    }

    public function features()
    {
        return $this->hasMany(StarterKitFeature::class);
    }

    public function stacks()
    {
        return $this->hasMany(StarterKitStack::class);
    }

    public function screenshots()
    {
        return $this->hasMany(StarterKitScreenshot::class)->orderBy("order");
    }

    public function stats()
    {
        return $this->hasOne(StarterKitStat::class);
    }

    /* =============
    |  SCOPES
     ==============*/

    public function scopePublished(Builder $query)
    {
        return $query->where("status", "published");
    }

    public function scopeFeatured(Builder $query)
    {
        return $query->where("is_featured", true);
    }

    public function scopeDifficulty(Builder $query, string $level)
    {
        return $query->where("difficulty", $level);
    }
}
