<?php

namespace App\Livewire\Contact;

use App\Helpers\MetaTags;
use App\Livewire\Forms\ContactForm;
use Livewire\Component;

class Index extends Component
{
    public ContactForm $form;

    public ?string $message = null;

    public function render(): \Illuminate\Contracts\View\View
    {
        $metatags = MetaTags::makeMetatags(
            path: 'blog',
            title: __('metatags.title'),
            titleShort: __('metatags.title.short'),
            keywords: __('metatags.keywords'),
            description: __('metatags.title'),
            type: 'website',
        );

        return view('livewire.contact.index', ['metatags' => $metatags])->title(__('contact.title'));
    }

    public function save(): void
    {
        $this->message = '';

        $this->form->store();

        $this->message = __('emails.sent');
    }
}
