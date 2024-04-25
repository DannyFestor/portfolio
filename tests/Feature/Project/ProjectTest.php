<?php

use App\Livewire\Project\Index;

it('can show the project page', function () {
    $response = $this->get('/en/projects')
        ->assertSeeLivewire(Index::class)
        ->assertStatus(200);
    $response = $this->get('/de/projects')
        ->assertSeeLivewire(Index::class)
        ->assertStatus(200);
    $response = $this->get('/ja/projects')
        ->assertSeeLivewire(Index::class)
        ->assertStatus(200);
});

it('shows project posts that are released an in the past', function () {
    $releasedProject = \App\Models\Project::factory()->create([
        'display' => true,
    ]);
    $unreleasedProject = \App\Models\Project::factory()->create([
        'display' => false,
    ]);

    $this
        ->get('/en/projects')
        ->assertSee($releasedProject->title_en)
        ->assertSee('/en/projects/' . $releasedProject->slug)
        ->assertDontSee($releasedProject->title_de)
        ->assertDontSee($releasedProject->title_ja)
        ->assertDontSee($unreleasedProject->title_en)
        ->assertDontSee($unreleasedProject->title_de)
        ->assertDontSee($unreleasedProject->title_ja);

    $this
        ->get('/de/projects')
        ->assertSee($releasedProject->title_de)
        ->assertSee('/de/projects/' . $releasedProject->slug)
        ->assertDontSee($releasedProject->title_en)
        ->assertDontSee($releasedProject->title_ja)
        ->assertDontSee($unreleasedProject->title_en)
        ->assertDontSee($unreleasedProject->title_de)
        ->assertDontSee($unreleasedProject->title_ja);

    $this
        ->get('/ja/projects')
        ->assertSee($releasedProject->title_ja)
        ->assertSee('/ja/projects/' . $releasedProject->slug)
        ->assertDontSee($releasedProject->title_de)
        ->assertDontSee($releasedProject->title_en)
        ->assertDontSee($unreleasedProject->title_en)
        ->assertDontSee($unreleasedProject->title_de)
        ->assertDontSee($unreleasedProject->title_ja);

    Livewire::test(Index::class, ['locale' => 'en'])
        ->assertSee($releasedProject->title_en)
        ->assertSee('/en/projects/' . $releasedProject->slug)
        ->assertDontSee($releasedProject->title_de)
        ->assertDontSee($releasedProject->title_ja)
        ->assertDontSee($unreleasedProject->title_en)
        ->assertDontSee($unreleasedProject->title_de)
        ->assertDontSee($unreleasedProject->title_ja);

    Livewire::test(Index::class, ['locale' => 'de'])
        ->assertSee($releasedProject->title_de)
        ->assertSee('/de/projects/' . $releasedProject->slug)
        ->assertDontSee($releasedProject->title_en)
        ->assertDontSee($releasedProject->title_ja)
        ->assertDontSee($unreleasedProject->title_en)
        ->assertDontSee($unreleasedProject->title_de)
        ->assertDontSee($unreleasedProject->title_ja);

    Livewire::test(Index::class, ['locale' => 'ja'])
        ->assertSee($releasedProject->title_ja)
        ->assertSee('/ja/projects/' . $releasedProject->slug)
        ->assertDontSee($releasedProject->title_en)
        ->assertDontSee($releasedProject->title_de)
        ->assertDontSee($unreleasedProject->title_en)
        ->assertDontSee($unreleasedProject->title_de)
        ->assertDontSee($unreleasedProject->title_ja);
});

it('can show project posts by slug', function () {
    $project = \App\Models\Project::factory()->create([
        'display' => true,
        'git_url' => 'https://githubtesturl.com/',
        'live_url' => 'https://livetesturl.com/',
    ]);

    $tag = \App\Models\Tag::create(['title' => 'project_test']);
    $project->tags()->attach([$tag->id]);

    $this->get('/en/projects/' . $project->slug)
        ->assertStatus(\Illuminate\Http\Response::HTTP_OK)
        ->assertSee($project->title_en)
        ->assertSee($project->body_en)
        ->assertSee($project->git_url)
        ->assertSee($project->live_url)
        ->assertSee($project->tags()->first()->title)
        ->assertDontSee($project->title_de)
        ->assertDontSee($project->body_de)
        ->assertDontSee($project->title_ja)
        ->assertDontSee($project->body_ja);

    $this->get('/de/projects/' . $project->slug)
        ->assertStatus(\Illuminate\Http\Response::HTTP_OK)
        ->assertSee($project->title_de)
        ->assertSee($project->body_de)
        ->assertSee($project->git_url)
        ->assertSee($project->live_url)
        ->assertSee($project->tags()->first()->title)
        ->assertDontSee($project->title_en)
        ->assertDontSee($project->body_en)
        ->assertDontSee($project->title_ja)
        ->assertDontSee($project->body_ja);

    $this->get('/ja/projects/' . $project->slug)
        ->assertStatus(\Illuminate\Http\Response::HTTP_OK)
        ->assertSee($project->title_ja)
        ->assertSee($project->body_ja)
        ->assertSee($project->git_url)
        ->assertSee($project->live_url)
        ->assertSee($project->tags()->first()->title)
        ->assertDontSee($project->title_en)
        ->assertDontSee($project->body_en)
        ->assertDontSee($project->title_de)
        ->assertDontSee($project->body_de);

    Livewire::test(\App\Livewire\Project\Show::class, ['locale' => 'en', 'project' => $project])
        ->assertStatus(\Illuminate\Http\Response::HTTP_OK)
        ->assertSee($project->title_en)
        ->assertSee($project->body_en)
        ->assertSee($project->git_url)
        ->assertSee($project->live_url)
        ->assertSee($project->tags()->first()->title)
        ->assertDontSee($project->title_de)
        ->assertDontSee($project->body_de)
        ->assertDontSee($project->title_ja)
        ->assertDontSee($project->body_ja);

    Livewire::test(\App\Livewire\Project\Show::class, ['locale' => 'de', 'project' => $project])
        ->assertStatus(\Illuminate\Http\Response::HTTP_OK)
        ->assertSee($project->title_de)
        ->assertSee($project->body_de)
        ->assertSee($project->git_url)
        ->assertSee($project->live_url)
        ->assertSee($project->tags()->first()->title)
        ->assertDontSee($project->title_en)
        ->assertDontSee($project->body_en)
        ->assertDontSee($project->title_ja)
        ->assertDontSee($project->body_ja);

    Livewire::test(\App\Livewire\Project\Show::class, ['locale' => 'ja', 'project' => $project])
        ->assertStatus(\Illuminate\Http\Response::HTTP_OK)
        ->assertSee($project->title_ja)
        ->assertSee($project->body_ja)
        ->assertSee($project->git_url)
        ->assertSee($project->live_url)
        ->assertSee($project->tags()->first()->title)
        ->assertDontSee($project->title_en)
        ->assertDontSee($project->body_en)
        ->assertDontSee($project->title_de)
        ->assertDontSee($project->body_de);
});
