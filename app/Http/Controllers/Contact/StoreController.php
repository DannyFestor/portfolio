<?php

namespace App\Http\Controllers\Contact;

use App\Http\Requests\Contact\StoreRequest;
use App\Mail\Contact\CreatedMail;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;

class StoreController
{
    public function __invoke(StoreRequest $request)
    {
        if (is_null($request->get('telephone'))) {
            $contact = Contact::create($request->validated());

            Mail::to('contact@festor.info')->send(new CreatedMail($contact));
        }

        return redirect()->route('contact.index')->with('success', __('emails.sent'));
    }
}
