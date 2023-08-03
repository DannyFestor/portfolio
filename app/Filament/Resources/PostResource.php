<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Filament\Resources\PostResource\RelationManagers\MetatagsRelationManager;
use App\Models\Post;
use App\Models\Tag;
use Carbon\Exceptions\InvalidFormatException;
use Exception;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Pages\EditRecord;
use Filament\Resources\Pages\Page;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Carbon;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;

    protected static ?string $navigationIcon = 'heroicon-o-bookmark-square';

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
                    })
                    ->default(Carbon::now()),

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

                Forms\Components\TextInput::make('subtitle')
                    ->maxLength(255)
                    ->lazy()
                    ->columnSpan(['sm' => 3]),

                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->maxLength(100)
                    ->lazy()
                    ->columnSpan(['default' => 1, 'sm' => 2]),

                Forms\Components\Select::make('tags')
                    ->relationship('tags', 'title')
                    ->options(fn () => Tag::pluck('title', 'id')->toArray())
                    ->multiple()
                    ->maxItems(5),

                Forms\Components\SpatieMediaLibraryFileUpload::make(Post::HERO_IMAGE)
                    ->collection(Post::HERO_IMAGE)
                    ->multiple(false)
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->columnSpan(['sm' => 3]),

                Forms\Components\TextInput::make('normal-link')
                    ->visible(
                        fn (Page $livewire, ?Post $record) => $livewire instanceof EditRecord && $record?->hasMedia(
                            Post::HERO_IMAGE
                        )
                    )
                    ->disabled()
                    ->formatStateUsing(fn (?Post $record) => $record?->getFirstMediaUrl(Post::HERO_IMAGE))
                    ->columnSpan(['md' => 3]),

                Forms\Components\TextInput::make('sns-link')
                    ->visible(
                        fn (Page $livewire, ?Post $record) => $livewire instanceof EditRecord && $record?->hasMedia(
                            Post::HERO_IMAGE
                        )
                    )
                    ->disabled()
                    ->formatStateUsing(fn (?Post $record) => $record?->getFirstMediaUrl(Post::HERO_IMAGE, 'twitter'))
                    ->columnSpan(['md' => 3]),

                Forms\Components\TextInput::make('thumbnail')
                    ->visible(
                        fn (Page $livewire, ?Post $record) => $livewire instanceof EditRecord && $record?->hasMedia(
                            Post::HERO_IMAGE
                        )
                    )
                    ->disabled()
                    ->formatStateUsing(fn (?Post $record) => $record?->getFirstMediaUrl(Post::HERO_IMAGE, 'thumb'))
                    ->columnSpan(['md' => 3]),
            ])->columns(['default' => 1, 'sm' => 3]),
            Forms\Components\Card::make([
                Forms\Components\MarkdownEditor::make('description')
                    ->required()
                    ->fileAttachmentsDisk('public')
                    ->fileAttachmentsDirectory('posts')
                    ->fileAttachmentsVisibility('public')
                    ->maxLength(65535),
            ]),
        ];
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

    /**
     * @throws Exception
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns(self::getTableColumns())
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
     * @return array<Tables\Columns\Column>
     */
    public static function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('user.email')
                ->searchable(isIndividual: true, isGlobal: false)
                ->sortable(),
            Tables\Columns\TextColumn::make('title')
                ->searchable(isIndividual: true, isGlobal: false)
                ->wrap()
                ->sortable(),
            Tables\Columns\TextColumn::make('subtitle')
                ->searchable(isIndividual: true, isGlobal: false)
                ->wrap()
                ->sortable(),
            Tables\Columns\TextColumn::make('slug')
                ->searchable(isIndividual: true, isGlobal: false)
                ->wrap()
                ->sortable(),
            //            Tables\Columns\TextColumn::make('description')
            //                ->searchable(isIndividual: true, isGlobal: false)
            //                ->wrap()
            //                ->formatStateUsing(fn (?string $state) => $state ? \Str::limit($state, 50) : '')
            //                ->sortable(),
            Tables\Columns\IconColumn::make('is_released')
                ->boolean()
                ->sortable(),
            Tables\Columns\TextColumn::make('released_at')
                ->dateTime()
                ->sortable(),
        ];
    }

    /**
     * @return string[]
     */
    public static function getRelations(): array
    {
        return [
            MetatagsRelationManager::class,
        ];
    }

    /**
     * @return array<string, array<string, string>>
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
