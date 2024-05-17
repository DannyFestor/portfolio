<?php

namespace App\Filament\Resources\PostResource\Pages;

use App\Filament\Resources\PostResource;
use App\Models\Post;
use Exception;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPost extends EditRecord
{
    protected static string $resource = PostResource::class;

    /**
     * @return array<Actions\Action>
     *
     * @throws Exception
     */
    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('view')
                ->label('View Post')
                ->url(fn (Post $record) => route('blog.show', $record))
                ->openUrlInNewTab(),
            Actions\DeleteAction::make(),
        ];
    }
}
