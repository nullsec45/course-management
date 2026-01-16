<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->morphs('model');

            $table->uuid("uuid")->unique();
            $table->string("collection_name", 255);
            $table->string('path')->nullable();
            $table->string("file_name", 255);
            $table->string("mime_type", 255);
            $table->string("disk", 255);
            $table->bigInteger("size");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
