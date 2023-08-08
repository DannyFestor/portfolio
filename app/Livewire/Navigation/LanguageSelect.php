<?php

namespace App\Livewire\Navigation;

use App\Enums\Locales;
use Livewire\Attributes\Computed;
use Livewire\Component;

class LanguageSelect extends Component
{
    public string $xModel = '';

    public string $locale = '';

    /** @var array<int, array<string, string>> */
    public array $options = [];

    public function mount(): void
    {
        $this->locale = \Session::get('locale') ?? app()->getLocale();

        $this->options[] = [
            'code' => 'de',
            'name' => 'German | Deutsch',
            'flag' => asset('flags/de.svg'),
        ];

        $this->options[] = [
            'code' => 'en',
            'name' => 'English',
            'flag' => asset('flags/us.svg'),
        ];

        $this->options[] = [
            'code' => 'ja',
            'name' => 'Japanese | 日本語',
            'flag' => asset('flags/jp.svg'),
        ];
    }

    public function render()
    {
        return view('livewire.navigation.language-select');
    }

    #[Computed]
    public function selectedLocale()
    {
        return array_values(array_filter($this->options, function (array $option) {
            return $option['code'] === $this->locale;
        }))[0] ?? [
            'code' => 'en',
            'name' => 'English',
            'flag' => asset('flags/us.svg'),
        ];
    }

    public function setLocale(string $newLocale, string $routeName, array $routeOptions)
    {
        if (!in_array($newLocale, Locales::toArray())) {
            return;
        }

        return redirect()->route($routeName, array_merge(['locale' => $newLocale, ...$routeOptions]));
    }
}
