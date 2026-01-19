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
        Schema::table('videos', function (Blueprint $table) {
            $table->string('description', 500)->change();
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->string('description', 500)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->text('description')->change();
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->string('description', 255)->change();
        });
    }
};
