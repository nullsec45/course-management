<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory;

    protected $appends = ['original_url'];


    protected $fillable = [
        'model_type',
        'model_id',
        'uuid',
        'collection_name',
        'file_name',
        'mime_type',
        'disk',
        'size',
        'path'
    ];

    public function getOriginalUrlAttribute()
    {
        $url = $this->path . "/" . $this->file_name;
        return Storage::url($url);
    }
}
