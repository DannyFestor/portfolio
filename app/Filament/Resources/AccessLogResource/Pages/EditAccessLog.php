<?php

namespace App\Filament\Resources\AccessLogResource\Pages;

use App\Filament\Resources\AccessLogResource;
use Exception;
use Filament\Pages\Actions\Action;
use Filament\Pages\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAccessLog extends EditRecord
{
    protected static string $resource = AccessLogResource::class;

    /**
     * @return array<Action>
     *
     * @throws Exception
     */
    protected function getActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
