<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class SocialAccount extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'provider_id',
        'provider_name',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
