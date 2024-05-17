<?php

//
//it('can show the german contact page', function () {
//    $this
//        ->session(['locale' => 'de'])
//        ->get(route('contact.index', ['locale' => 'de']))
//        ->assertSee('Kontakt-Aufnahme')
//        ->assertStatus(\Symfony\Component\HttpFoundation\Response::HTTP_OK);
//});

it('can show the english contact page', function () {
    $this
        ->session(['locale' => 'en'])
        ->get(route('contact.index'
        ))
        ->assertSee('Contact me')
        ->assertStatus(\Symfony\Component\HttpFoundation\Response::HTTP_OK);
});
//
//it('can show the japanese contact page', function () {
//    $this
//        ->session(['locale' => 'ja'])
//        ->get(route('contact.index', ['locale' => 'ja']))
//        ->assertSee('連絡する')
//        ->assertStatus(\Symfony\Component\HttpFoundation\Response::HTTP_OK);
//});

// TODO: test mail content

it('can send an email', function () {
    //    \Illuminate\Support\Facades\Mail::fake();

    $data = [
        'name' => 'Test User',
        'email' => 'test@test.com',
        'subject' => 'Valid Subject',
        'body' => 'Valid Body',
    ];

    \Livewire\Livewire::test(App\Livewire\Contact\Index::class)
        ->set('form.name', $data['name'])
        ->set('form.email', $data['email'])
        ->set('form.subject', $data['subject'])
        ->set('form.body', $data['body'])
        ->call('save')
        ->assertSee(__('emails.sent'));
    $this->assertDatabaseHas('contacts', $data);
    //    \Illuminate\Support\Facades\Mail::assertQueued(\App\Mail\Contact\CreatedMail::class);
});

it('requires a name', function () {
    \Livewire\Livewire::test(App\Livewire\Contact\Index::class)
        ->set('form.name', '')
        ->set('form.email', 'test@test.com')
        ->set('form.subject', 'Valid Subject')
        ->set('form.body', 'Valid Body')
        ->call('save')
        ->assertHasErrors('form.name');
});

it('requires an email', function () {
    \Livewire\Livewire::test(App\Livewire\Contact\Index::class)
        ->set('form.name', 'Test User')
        ->set('form.email', '')
        ->set('form.subject', 'Valid Subject')
        ->set('form.body', 'Valid Body')
        ->call('save')
        ->assertHasErrors('form.email');
});

it('requires a subject', function () {
    \Livewire\Livewire::test(App\Livewire\Contact\Index::class)
        ->set('form.name', 'Test User')
        ->set('form.email', 'test@test.com')
        ->set('form.subject', '')
        ->set('form.body', 'Valid Body')
        ->call('save')
        ->assertHasErrors('form.subject');
});

it('requires a body', function () {
    \Livewire\Livewire::test(App\Livewire\Contact\Index::class)
        ->set('form.name', 'Test User')
        ->set('form.email', 'test@test.com')
        ->set('form.subject', 'Valid Subject')
        ->set('form.body', '')
        ->call('save')
        ->assertHasErrors('form.body');
});

it('ignores input when telephone field is filled', function () {
    //    \Illuminate\Support\Facades\Mail::fake();

    \Livewire\Livewire::test(App\Livewire\Contact\Index::class)
        ->set('form.name', 'Test User')
        ->set('form.email', 'test@test.com')
        ->set('form.subject', 'Valid Subject')
        ->set('form.body', 'Valid Body')
        ->set('form.telephone', '080-1234-5678')
        ->call('save')
        ->assertSee(__('emails.sent'));

    //    unset($data['telephone']);

    //    \Illuminate\Support\Facades\Mail::assertNotQueued(\App\Mail\Contact\CreatedMail::class);
    $this->assertDatabaseMissing('contacts', [
        'name' => 'Test User',
        'email' => 'test@test.com',
        'subject' => 'Valid Subject',
        'body' => 'Valid Body',
    ]);
});
