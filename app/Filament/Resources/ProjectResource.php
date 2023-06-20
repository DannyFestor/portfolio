<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $slug = 'projects';

    protected static ?string $recordTitleAttribute = 'id';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title_en')
                    ->required(),

                TextInput::make('title_de')
                    ->required(),

                TextInput::make('title_ja')
                    ->required(),

                TextInput::make('body_en')
                    ->required(),

                TextInput::make('body_de')
                    ->required(),

                TextInput::make('body_ja')
                    ->required(),

                Toggle::make('display'),

                    //TextInput::make('sort')
                    //->required()
                    //->integer(),

                SpatieMediaLibraryFileUpload::make('media')
                    ->disk('public')
                    ->collection('project-images')
                    ->directory('projects')
                ->image(),

                TextInput::make('git_url')
                    ->url(),

                TextInput::make('live_url')
                    ->url(),

                Placeholder::make('created_at')
                    ->label('Created Date')
                    ->content(fn(?Project $record): string => $record?->created_at?->diffForHumans() ?? '-'),

                Placeholder::make('updated_at')
                    ->label('Last Modified Date')
                    ->content(fn(?Project $record): string => $record?->updated_at?->diffForHumans() ?? '-'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title_en'),

                TextColumn::make('title_de'),

                TextColumn::make('title_ja'),

                TextColumn::make('body_en'),

                TextColumn::make('body_de'),

                TextColumn::make('body_ja'),

                IconColumn::make('display')->boolean(),

                TextColumn::make('sort'),

                TextColumn::make('git_url'),

                TextColumn::make('live_url'),
            ])->reorderable('sort');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return [];
    }
}
