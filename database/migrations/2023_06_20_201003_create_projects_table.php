<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title_en');
            $table->string('title_de');
            $table->string('title_ja');
            $table->text('body_en');
            $table->text('body_de');
            $table->text('body_ja');
            $table->boolean('display')->default(false);
            $table->integer('sort');
            $table->string('git_url')->nullable();
            $table->string('live_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
