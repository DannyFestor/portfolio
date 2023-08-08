<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactResource\Pages;
use App\Models\Contact;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Pages\PageRegistration;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ContactResource extends Resource
{
    protected static ?string $model = Contact::class;

    protected static ?string $navigationIcon = 'heroicon-o-envelope-open';

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->sortable()
                    ->searchable(isGlobal: false, isIndividual: true),
                Tables\Columns\TextColumn::make('email')
                    ->sortable()
                    ->searchable(isGlobal: false, isIndividual: true),
                Tables\Columns\TextColumn::make('subject')
                    ->sortable()
                    ->searchable(isGlobal: false, isIndividual: true),
                Tables\Columns\TextColumn::make('body')
                    ->formatStateUsing(fn ($state) => \Str::limit($state)),
                Tables\Columns\IconColumn::make('seen_at')
                    ->options([
                        'heroicon-o-check-badge',
                        'heroicon-o-x-circle' => fn ($state): bool => $state === null,
                    ])
                    ->colors([
                        'success' => fn ($state): bool => $state !== null,
                        'danger' => fn ($state): bool => $state === null,
                    ]),
                Tables\Columns\TextColumn::make('created_at')
                    ->sortable()
                    ->dateTime(),
                //Tables\Columns\TextColumn::make('updated_at')
                //    ->dateTime(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('seen_at')
                    ->trueLabel('Seen Only')
                    ->falseLabel('Unseen Only')
                    ->queries(
                        true: fn (Builder $query) => $query->whereNotNull('seen_at'),
                        false: fn (Builder $query) => $query->whereNull('seen_at'),
                    ),
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('created_from'),
                        Forms\Components\DatePicker::make('created_until'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['created_from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['created_until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );
                    }),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                //Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('subject')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('body')
                    ->required()
                    ->maxLength(65535),
                Forms\Components\DateTimePicker::make('seen_at'),
            ])->columns(1);
    }

    /**
     * @return array<RelationManager>
     */
    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    /**
     * @return array|PageRegistration[]
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContacts::route('/'),
            //'create' => Pages\CreateContact::route('/create'),
            'view' => Pages\ViewContact::route('/{record}'),
            //'edit' => Pages\EditContact::route('/{record}/edit'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::whereNull('seen_at')->count();
    }
}
