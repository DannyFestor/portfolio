<?php

namespace App\Filament\Resources\PostResource\RelationManagers;

use App\Models\Metatag;
use Filament\Forms;
use Filament\Resources\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\HtmlString;

class MetatagsRelationManager extends RelationManager
{
    protected static string $relationship = 'metatags';

    protected static ?string $recordTitleAttribute = 'tag';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('tag')
                    ->required()
                    ->reactive()
                    ->options(function () {
                        $tags = [];
                        foreach (array_keys(Metatag::TAGS) as $tag) {
                            $tags[$tag] = $tag;
                        }

                        return $tags;
                    }),
                self::buildSchemaForTag('link'),
                self::buildSchemaForTag('meta'),
                self::buildSchemaForTag('script'),
            ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('tag'),
                Tables\Columns\TextColumn::make('properties')
                    ->formatStateUsing(function (Metatag $record, $state): HtmlString {
                        $tags = [];
                        foreach ($record->properties as $key => $value) {
                            $tags[] = "$key: $value";
                        }

                        return new HtmlString(implode('<br>', $tags));
                    }),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
//                Tables\Actions\AssociateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->mutateFormDataUsing(function (array $data): array {
                        $data['properties'] = array_filter($data['properties']);

                        return $data;
                    }),
//                Tables\Actions\DissociateAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
//                Tables\Actions\DissociateBulkAction::make(),
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }


    private static function buildSchemaForTag(string $tag): Forms\Components\Section
    {
        $schema = [];

        foreach (Metatag::TAGS[$tag] as $label => $value) {
            if ($value['type'] === 'text') {
                $schema[] = Forms\Components\TextInput::make('properties.' . $label)
                    ->required(isset($value['required']) && $value['required']);
            } elseif ($value['type'] === 'select') {
                $schema[] = Forms\Components\Select::make('properties.' . $label)
                    ->required(isset($value['required']) && $value['required'])
                    ->options(function () use ($value) {
                        $options = [];
                        foreach ($value['options'] as $option) {
                            $options[$option] = $option;
                        }

                        return $options;
                    });
            } elseif ($value['type'] === 'checkmark') {
                $schema[] = Forms\Components\Checkbox::make('properties.' . $label)
                    ->required(isset($value['required']) && $value['required']);
            }
        }

        return Forms\Components\Section::make('Properties')
            ->visible(fn(\Closure $get) => $get('tag') === $tag)
            ->schema($schema)
            ->columnSpan(1);
    }
}
