<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('access_logs', function (Blueprint $table) {
            $table->id();
            $table->string('ip')->nullable();
            $table->string('origin')->nullable();
            $table->string('address')->nullable();
            $table->string('referrer')->nullable();
            $table->string('method')->nullable();
            $table->string('language')->nullable();
            $table->boolean('is_livewire');
            $table->string('content_type')->nullable();
            $table->string('accept')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('access_logs');
    }
};
