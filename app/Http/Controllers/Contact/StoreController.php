<?php

namespace App\Http\Controllers\Contact;

use App\Http\Requests\Contact\StoreRequest;
use App\Mail\Contact\CreatedMail;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class StoreController
{
    public function __invoke(StoreRequest $request): RedirectResponse
    {
        if (gettype($request->validated()) !== 'array') {
            abort(500);
        }

        if (is_null($request->get('telephone'))) {
            $contact = Contact::create($request->validated());

            Mail::to('contact@festor.info')->send(new CreatedMail($contact));
        }

        $locale = $request->session()->get('locale');
        if (gettype($locale) !== 'string') {
            $locale = 'en';
        }

        return redirect()->route('contact.index', ['locale' => $locale])->with('success', __('emails.sent'));
    }
}
