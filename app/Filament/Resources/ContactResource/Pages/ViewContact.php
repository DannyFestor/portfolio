<?php

namespace App\Filament\Resources\ContactResource\Pages;

use App\Filament\Resources\ContactResource;
use App\Models\Contact;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ViewRecord;
use Illuminate\Support\HtmlString;

/**
 * @property Contact $record
 */
class ViewContact extends ViewRecord
{
    protected static string $resource = ContactResource::class;

    protected function getActions(): array
    {
        return [
            //Actions\EditAction::make(),
            Actions\DeleteAction::make(),
            Actions\Action::make('mark-read')
                ->action(function () {
                    $this->record->update(['seen_at' => now()]);
                    $this->fillForm();
                })
                ->visible(fn (): bool => $this->record->seen_at === null)
                ->modalHeading(fn (): HtmlString => new HtmlString('Mark Email as read?'))
                ->modalContent(fn (): HtmlString => new HtmlString('Confirm to mark email as read'))
                ->requiresConfirmation(),
            Actions\Action::make('mark-unread')
                ->action(function () {
                    $this->record->update(['seen_at' => null]);
                    $this->fillForm();
                })
                ->visible(fn (): bool => $this->record->seen_at !== null)
                ->color('danger')
                ->requiresConfirmation(),
            Actions\Action::make('reply')
                ->url('mailto:' . $this->record->email . '?Subject=Re: ' . $this->record->subject)
                ->color('success'),
        ];
    }
}
