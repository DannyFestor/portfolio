<?php

namespace App\Filament\Resources\ProjectResource\Pages;

use App\Events\Project\CreatedEvent;
use App\Filament\Resources\ProjectResource;
use Filament\Resources\Pages\CreateRecord;

class CreateProject extends CreateRecord
{
    protected static string $resource = ProjectResource::class;

    protected function afterCreate(): void
    {
        CreatedEvent::dispatch($this->record);
    }
}
