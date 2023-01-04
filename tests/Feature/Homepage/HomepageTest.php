<?php

it('can show the homepage', function () {
    $this
        ->get(route('home.ger'))
        ->assertStatus(\Symfony\Component\HttpFoundation\Response::HTTP_OK);
});
