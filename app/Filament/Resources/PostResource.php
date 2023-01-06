<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Filament\Resources\PostResource\RelationManagers;
use App\Models\Post;
use Carbon\Exceptions\InvalidFormatException;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Support\Carbon;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;

    protected static ?string $navigationIcon = 'heroicon-o-bookmark-alt';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Card::make([
                    Forms\Components\Select::make('user_id')
                        ->label('Author')
                        ->relationship('user', 'email')
                        ->searchable()
                        ->lazy()
                        ->required(),
                    Forms\Components\DateTimePicker::make('released_at')
                        ->reactive()
                        ->afterStateUpdated(function (callable $set, callable $get, ?string $state) {
                            $set('slug', self::buildSlug(title: $get('title'), date: $state));
                        }),
                    Forms\Components\Toggle::make('is_released')
                        ->inline(false)
                        ->lazy()
                        ->required(),
                    Forms\Components\TextInput::make('title')
                        ->required()
                        ->maxLength(255)
                        ->lazy()
                        ->columnSpan(['sm' => 3])
                        ->afterStateUpdated(function (callable $set, callable $get, ?string $state) {
                            $set('slug', self::buildSlug(title: $state, date: $get('released_at')));
                        }),
                    Forms\Components\TextInput::make('slug')
                        ->required()
                        ->maxLength(100)
                        ->lazy()
                        ->columnSpan(['default' => 1, 'sm' => 2]),
                    Forms\Components\Select::make('tags')
                        ->relationship('tags', 'title')
                        ->multiple(),
                ])->columns(['default' => 1, 'sm' => 3]),
                Forms\Components\Card::make([
                    Forms\Components\MarkdownEditor::make('description')
                        ->required()
                        ->lazy()
                        ->maxLength(65535),
                ]),
            ]);
    }

    private static function buildSlug(?string $title, ?string $date): string
    {
        $slug = '';
        if ($date) {
            try {
                $date = Carbon::parse($date)->format('Ymd');
            } catch (InvalidFormatException $e) {
            }

            $slug .= $date . '-';
        }

        $slug .= $title;

        return \Str::Limit(\Str::slug($slug), 100, '');
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.email')
                    ->searchable(isIndividual: true, isGlobal: false)
                    ->sortable(),
                Tables\Columns\TextColumn::make('title')
                    ->searchable(isIndividual: true, isGlobal: false)
                    ->wrap()
                    ->sortable(),
                Tables\Columns\TextColumn::make('slug')
                    ->searchable(isIndividual: true, isGlobal: false)
                    ->wrap()
                    ->sortable(),
                Tables\Columns\TextColumn::make('description')
                    ->searchable(isIndividual: true, isGlobal: false)
                    ->wrap()
                    ->formatStateUsing(fn (?string $state) => $state ? \Str::limit($state, 50) : '')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_released')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('released_at')
                    ->dateTime()
                    ->sortable(),
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

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}