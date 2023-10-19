<?php

namespace App\Livewire\Contact;

use App\Livewire\Forms\ContactForm;
use Livewire\Component;

class Index extends Component
{
    public ContactForm $form;

    public ?string $message = null;

    public function render(): \Illuminate\Contracts\View\View
    {
        return view('livewire.contact.index')->title(__('contact.title'));
    }

    public function save(): void
    {
        $this->message = '';

        $this->form->store();

        $this->message = __('emails.sent');
    }
}
