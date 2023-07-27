<?php

namespace App\Mail\Contact;

use App\Models\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\File;

class CreatedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public Contact $contact)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '[festor.info] You have a new mail',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.contact.created',
        );
    }

    /**
     * @return array<string|File>
     */
    public function attachments(): array
    {
        return [];
    }
}
