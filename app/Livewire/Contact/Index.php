<?php

namespace App\Livewire\Contact;

use App\Livewire\Forms\ContactForm;
use Livewire\Component;

class Index extends Component
{
    public ContactForm $form;

    public ?string $message = null;

    public function render()
    {
        return view('livewire.contact.index')->title(__('contact.title'));
    }

    public function save()
    {
        $this->message = '';

        $validated = $this->form->store();

        $this->form->reset();

        $this->message = __('emails.sent');
    }
}
