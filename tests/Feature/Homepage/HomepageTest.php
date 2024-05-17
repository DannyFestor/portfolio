<?php

//
//it('can show the german homepage', function () {
//    $this
//        ->session(['locale' => 'de'])
//        ->get(route('home'))
//        ->assertSee('Hi, ich bin Danny!')
//        ->assertSee('Ich bin <em>Freelancer</em>.', escape: false)
//        ->assertSee('Ich erstelle <strong>moderne Webseiten</strong>.', escape: false)
//        ->assertSee('Ich lebe in <em>Nagasaki, Japan</em>.', escape: false)
//        ->assertStatus(\Symfony\Component\HttpFoundation\Response::HTTP_OK);
//});

it('can show the english homepage', function () {
    $this
        ->get(route('home'))
        ->assertSee('Hi! I am Danny.')
        ->assertSee('I am a <em>Freelancer</em>.', escape: false)
        ->assertSee('I create <strong>modern websites</strong>.', escape: false)
        ->assertSee('I live in <em>Nagasaki, Japan</em>', escape: false)
        ->assertStatus(\Symfony\Component\HttpFoundation\Response::HTTP_OK);
});
