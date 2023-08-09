<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('access_logs', function (Blueprint $table) {
            $table->after('origin', function (Blueprint $table) {
                $table->string('platform')->nullable();
                $table->string('platform_version')->nullable();
                $table->string('device')->nullable();
                $table->string('device_kind')->nullable();
                $table->string('browser')->nullable();
                $table->string('browser_version')->nullable();
                $table->boolean('is_robot')->nullable();
            });
        });
    }

    public function down(): void
    {
        Schema::table('access_logs', function (Blueprint $table) {
            $table->dropColumn(['platform', 'platform_version', 'device', 'device_kind', 'browser', 'browser_version', 'is_robot']);
        });
    }
};
