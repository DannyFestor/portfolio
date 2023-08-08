<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TagResource\Pages;
use App\Filament\Resources\TagResource\RelationManagers;
use App\Models\Tag;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Pages\PageRegistration;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\HtmlString;

class TagResource extends Resource
{
    protected static ?string $model = Tag::class;

    protected static ?string $navigationIcon = 'heroicon-o-tag';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->reactive(),
                Forms\Components\ColorPicker::make('text_color')
                    ->required()
                    ->reactive(),
                Forms\Components\ColorPicker::make('background_color')
                    ->required()
                    ->reactive(),
                Forms\Components\ColorPicker::make('border_color')
                    ->required()
                    ->reactive(),
                Forms\Components\Select::make('logo')
                    ->reactive()
                    ->options(function () {
                        $icons = scandir(base_path('public/icons'));
                        if ($icons === false) {
                            return [];
                        }

                        return array_reduce(
                            array_filter(
                                $icons,
                                function ($icon) {
                                    return str_ends_with($icon, '.svg');
                                }),
                            function ($result, $icon) {
                                $result[$icon] = $icon;

                                return $result;
                            }
                        );
                    }),
                Forms\Components\Placeholder::make('preview')
                    ->content(function (callable $get) {
                        $title = $get('title');
                        $text_color = $get('text_color');
                        $background_color = $get('background_color');
                        $border_color = $get('border_color');
                        $logo = asset('icons/' . $get('logo'));

                        return new HtmlString(<<<HTML
<div class="flex">
    <span class="px-2 py-1 rounded flex items-center justify-center gap-2" style="color: $text_color; background-color: $background_color; border: 1px solid $border_color">
        <img src="$logo" alt="" class="h-4 w-4">
        $title
    </span>
</div>
HTML);
                    }),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title'),
                Tables\Columns\TextColumn::make('text_color'),
                Tables\Columns\TextColumn::make('background_color'),
                Tables\Columns\TextColumn::make('border_color'),
                Tables\Columns\TextColumn::make('logo'),
                Tables\Columns\TextColumn::make('preview')
                    ->formatStateUsing(function ($state, Tag $record) {
                        $title = $record->title;
                        $text_color = $record->text_color;
                        $background_color = $record->background_color;
                        $border_color = $record->border_color;
                        $logo = asset('icons/' . $record->logo);

                        return new HtmlString(<<<HTML
<div class="flex">
    <span class="px-2 py-1 rounded flex items-center justify-center gap-2" style="color: $text_color; background-color: $background_color; border: 1px solid $border_color">
        <img src="$logo" alt="" class="h-4 w-4">
        $title
    </span>
</div>
HTML);
                    }),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    /**
     * @return string[]
     */
    public static function getRelations(): array
    {
        return [
            RelationManagers\PostsRelationManager::class,
        ];
    }

    /**
     * @return array|PageRegistration[]
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTags::route('/'),
            'create' => Pages\CreateTag::route('/create'),
            'edit' => Pages\EditTag::route('/{record}/edit'),
        ];
    }
}
