<?php

it('can show the german contact page', function () {
    $this
        ->session(['locale' => 'de'])
        ->get(route('contact.index'))
        ->assertSee('Kontakt-Aufnahme')
        ->assertStatus(\Symfony\Component\HttpFoundation\Response::HTTP_OK);
});

it('can show the english contact page', function () {
    $this
        ->session(['locale' => 'en'])
        ->get(route('contact.index'))
        ->assertSee('Contact me')
        ->assertStatus(\Symfony\Component\HttpFoundation\Response::HTTP_OK);
});

it('can show the japanese contact page', function () {
    $this
        ->session(['locale' => 'ja'])
        ->get(route('contact.index'))
        ->assertSee('連絡する')
        ->assertStatus(\Symfony\Component\HttpFoundation\Response::HTTP_OK);
});

// todo: test mail content

it('can send an email', function () {
    \Illuminate\Support\Facades\Mail::fake();

    $data = [
        'name' => 'Test User',
        'email' => 'test@test.com',
        'subject' => 'Valid Subject',
        'body' => 'Valid Body',
    ];

    $this
        ->post(route('contact.store'), $data)
        ->assertRedirect(route('contact.index'))
        ->assertSessionHas('success', __('emails.sent'));

    $this->assertDatabaseHas('contacts', $data);

    \Illuminate\Support\Facades\Mail::assertQueued(\App\Mail\Contact\CreatedMail::class);
});

it('requires a name', function () {
    $this
        ->post(route('contact.store'), [
            'name' => null,
            'email' => 'test@test.com',
            'subject' => 'Valid Subject',
            'body' => 'Valid Body',
        ])
        ->assertSessionHasErrors('name');
});

it('requires an email', function () {
    $this
        ->post(route('contact.store'), [
            'name' => 'Test User',
            'email' => null,
            'subject' => 'Valid Subject',
            'body' => 'Valid Body',
        ])
        ->assertSessionHasErrors('email');
});

it('requires a subject', function () {
    $this
        ->post(route('contact.store'), [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'subject' => null,
            'body' => 'Valid Body',
        ])
        ->assertSessionHasErrors('subject');
});

it('requires a body', function () {
    $this
        ->post(route('contact.store'), [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'subject' => 'Valid Subject',
            'body' => null,
        ])
        ->assertSessionHasErrors('body');
});

it('ignores input when telephone field is filled', function () {
    \Illuminate\Support\Facades\Mail::fake();

    $data = [
        'name' => 'Test User',
        'email' => 'test@test.com',
        'subject' => 'Valid Subject',
        'body' => 'Valid Body',
        'telephone' => '080-1234-5678',
    ];

    $this
        ->post(route('contact.store'), $data)
        ->assertRedirect(route('contact.index'))
        ->assertSessionHas('success', __('emails.sent'));

    unset($data['telephone']);

    \Illuminate\Support\Facades\Mail::assertNotQueued(\App\Mail\Contact\CreatedMail::class);
    $this->assertDatabaseMissing('contacts', $data);
});
