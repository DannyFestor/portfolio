<?php

namespace App\Livewire\Forms;

use App\Mail\Contact\CreatedMail;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use Livewire\Attributes\Rule;
use Livewire\Form;

class ContactForm extends Form
{
    #[Rule(['required'])]
    public string $name = '';

    #[Rule(['required', 'email', 'max:254'])]
    public string $email = '';

    #[Rule(['required'])]
    public string $subject = '';

    #[Rule(['required'])]
    public string $body = '';

    #[Rule(['nullable'])]
    public string $telephone = '';

    public function store(): void
    {
        $validated = $this->validate();

        if (empty($this->telephone)) {
            $contact = Contact::create($validated);

            // TODO for the future: send a mail
//            Mail::to('contact@festor.info')->send(new CreatedMail($contact));
        }

        $this->reset();
    }
}
