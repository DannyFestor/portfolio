<?php

namespace App\Filament\Resources\ProjectResource\Pages;

use App\Events\Project\CreatedEvent;
use App\Filament\Resources\ProjectResource;
use App\Models\Project;
use Filament\Resources\Pages\CreateRecord;

class CreateProject extends CreateRecord
{
    protected static string $resource = ProjectResource::class;

    protected function afterCreate(): void
    {
        /** @var Project $project */
        $project = $this->record;
        CreatedEvent::dispatch($project);
    }
}
