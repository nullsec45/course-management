<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


class Article extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'content',
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

    public function author()
    {
        return $this->belongsTo(User::class, 'author', 'id');
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
