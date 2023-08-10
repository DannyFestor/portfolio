<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('access_logs', function (Blueprint $table) {
            $table->after('id', function (Blueprint $table) {
                $table->unsignedBigInteger('accessable_id')->nullable();
                $table->string('accessable_type')->nullable();
                $table->date('accessed_at')->nullable();

                $table->index(['accessable_id', 'accessable_type', 'accessed_at']);
            });
        });
    }

    public function down(): void
    {
        Schema::table('access_logs', function (Blueprint $table) {
            $table->dropIndex(['accessable_id', 'accessable_type', 'accessed_at']);

            $table->dropColumn(['accessable_id', 'accessable_type', 'accessed_at']);
        });
    }
};
