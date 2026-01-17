<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Video extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'description',
        'slug',
        'status',
        'author',
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    protected $keyType = 'string';
    public $incrementing = false;

    public function media()
    {
        return $this->morphMany(Media::class, 'model');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) \Illuminate\Support\Str::uuid();
            }
        });
    }
}
