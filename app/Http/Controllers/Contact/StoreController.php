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
    }
}
