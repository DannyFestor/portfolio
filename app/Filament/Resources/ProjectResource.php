<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers\MetatagsRelationManager;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Pages\PageRegistration;
use Filament\Resources\Resource;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $slug = 'projects';

    protected static ?string $navigationIcon = 'heroicon-o-presentation-chart-bar';

    protected static ?string $recordTitleAttribute = 'id';

    public static function form(Form $form): Form
    {
        return $form
            ->schema(self::getFormSchema());
    }

    /**
     * @return array<Forms\Components\Component>
     */
    public static function getFormSchema(): array
    {
        return [
            TextInput::make('slug')
                ->unique(ignoreRecord: true)
                ->required(),

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

            Select::make('tags')
                ->relationship('tags', 'title')
                ->multiple(),

            //TextInput::make('sort')
            //->required()
            //->integer(),

            SpatieMediaLibraryFileUpload::make('media')
                ->disk('public')
                ->label('Main Image')
                ->collection(Project::PROJECT_IMAGE)
                ->visibility('public')
                ->columnSpan(['sm' => 2])
                ->image(),

            SpatieMediaLibraryFileUpload::make('screenshots')
                ->disk('public')
                ->label('Project Screenshots')
                ->collection(Project::PROJECT_IMAGES)
                ->multiple()
                ->visibility('public')
                ->columnSpan(['sm' => 2])
                ->enableReordering()
                ->image(),

            TextInput::make('git_url')
                ->url(),

            TextInput::make('live_url')
                ->url(),

            Placeholder::make('created_at')
                ->label('Created Date')
                ->content(fn (?Project $record): string => $record?->created_at?->diffForHumans() ?? '-'),

            Placeholder::make('updated_at')
                ->label('Last Modified Date')
                ->content(fn (?Project $record): string => $record?->updated_at?->diffForHumans() ?? '-'),
        ];
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title_en'),

                TextColumn::make('title_de'),

                TextColumn::make('title_ja'),

                //                TextColumn::make('body_en'),
                //
                //                TextColumn::make('body_de'),
                //
                //                TextColumn::make('body_ja'),

                IconColumn::make('display')->boolean(),

                TextColumn::make('sort'),

                //                TextColumn::make('git_url'),
                //
                //                TextColumn::make('live_url'),
            ])->reorderable('sort');
    }

    /**
     * @return array|PageRegistration[]
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }

    public static function getRelations(): array
    {
        return [
            MetatagsRelationManager::class,
        ];
    }
}
