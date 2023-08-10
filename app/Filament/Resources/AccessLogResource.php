<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AccessLogResource\Pages;
use App\Models\AccessLog;
use App\Models\Post;
use App\Models\Project;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\MorphToSelect;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Pages\PageRegistration;
use Filament\Resources\Resource;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AccessLogResource extends Resource
{
    protected static ?string $model = AccessLog::class;

    protected static ?string $slug = 'access-logs';

    protected static ?string $navigationIcon = 'heroicon-o-pencil-square';

    protected static ?string $recordTitleAttribute = 'id';

    // TODO: NICE LOOKING ACCESS WIDGETS
    public static function form(Form $form): Form
    {
        // 'platform', 'platform_version', 'device', 'device_kind', 'browser', 'browser_version', 'is_robot'
        return $form
            ->schema([
                MorphToSelect::make('accessible')
                    ->types([
                        MorphToSelect\Type::make(Post::class)
                            ->titleAttribute('title'),
                        MorphToSelect\Type::make(Project::class)
                            ->titleAttribute('title_en'),
                    ]),

                DatePicker::make('accessed_at'),

                TextInput::make('ip'),

                TextInput::make('origin'),

                TextInput::make('platform'),

                TextInput::make('platform_version'),

                TextInput::make('device'),

                TextInput::make('device_kind'),

                TextInput::make('browser'),

                TextInput::make('browser_version'),

                Toggle::make('is_robot'),

                TextInput::make('address'),

                TextInput::make('referrer'),

                TextInput::make('method'),

                TextInput::make('language'),

                Toggle::make('is_livewire'),

                TextInput::make('content_type'),

                TextInput::make('accept'),

                Placeholder::make('created_at')
                    ->label('Created Date')
                    ->content(fn (?AccessLog $record): string => $record?->created_at?->diffForHumans() ?? '-'),

                Placeholder::make('updated_at')
                    ->label('Last Modified Date')
                    ->content(fn (?AccessLog $record): string => $record?->updated_at?->diffForHumans() ?? '-'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('accessed_at')
                    ->searchable(isIndividual: true, isGlobal: false)
                    ->sortable(),

                TextColumn::make('address')
                    ->searchable(isIndividual: true, isGlobal: false)
                    ->sortable(),

                TextColumn::make('ip')
                    ->searchable(isIndividual: true, isGlobal: false)
                    ->sortable(),

                TextColumn::make('browser')
                    ->searchable(isIndividual: true, isGlobal: false)
                    ->sortable(),

                TextColumn::make('platform')
                    ->searchable(isIndividual: true, isGlobal: false)
                    ->sortable(),

                TextColumn::make('device')
                    ->searchable(isIndividual: true, isGlobal: false)
                    ->sortable(),
            ])
            ->defaultSort('accessed_at', 'desc');
    }

    /**
     * @return array|PageRegistration[]
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAccessLogs::route('/'),
            //            'create' => Pages\CreateAccessLog::route('/create'),
            'edit' => Pages\EditAccessLog::route('/{record}/edit'),
        ];
    }
}
