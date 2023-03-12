@component('mail::message')
# Introduction

The body of your message.

{{ $contact->name }}

{{ $contact->email }}

{{ $contact->subject }}

{{ $contact->body }}

@component('mail::button', ['url' => ''])
Button Text
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
