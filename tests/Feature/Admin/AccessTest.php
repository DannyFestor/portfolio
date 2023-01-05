<?php

it('confirms user is admin', function () {
    $response = $this->get(route('admin.dashboard'));
    $response
        ->assertRedirect(route('login'));

    $user = \App\Models\User::factory()->create();
    $response = $this->actingAs($user)->get(route('admin.dashboard'));
    $response
        ->assertRedirect(route('home.ger'));

    $user = \App\Models\User::factory()->create(['is_admin' => true]);
    dd($user->is_admin);
    $response = $this->actingAs($user)->get(route('admin.dashboard'));
    $response
        ->assertStatus(\Illuminate\Http\Response::HTTP_OK);
});
