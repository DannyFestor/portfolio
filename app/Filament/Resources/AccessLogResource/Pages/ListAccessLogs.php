<?php

namespace App\Filament\Resources\AccessLogResource\Pages;

use App\Filament\Resources\AccessLogResource;
use Filament\Resources\Pages\ListRecords;

class ListAccessLogs extends ListRecords
{
    protected static string $resource = AccessLogResource::class;
}
