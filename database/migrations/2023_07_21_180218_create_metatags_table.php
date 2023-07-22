<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('metatags', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('metatagable_id');
            $table->string('metatagable_type');
            $table->enum('tag', ['link', 'meta', 'script']);
            $table->json('properties');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('metatags');
    }
};
