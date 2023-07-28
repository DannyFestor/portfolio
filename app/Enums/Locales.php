<?php

namespace App\Enums;

enum Locales: string
{
    case English = 'en';
    case German = 'de';
    case Japanese = 'ja';

    /**
     * @return array<int, string>
     */
    public static function toArray(): array
    {
        $values = [];

        foreach (self::cases() as $props) {
            $values[] = $props->value;
        }

        return $values;
    }
}
