<?php

namespace App\Http\Requests\Contact;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'email' => ['required', 'email'],
            'telephone' => ['nullable', 'string'],
            'subject' => ['required', 'string', 'min:5', 'max:255'],
            'body' => ['required', 'string', 'min:10', 'max:2500'],
        ];
    }
}
