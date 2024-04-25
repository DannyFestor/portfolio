<?php

namespace App\Livewire\Project;

use App\Models\Metatag;
use App\Models\Project;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Livewire\Component;

class Show extends Component
{
    public string $locale;

    public Project $project;

    public function mount(string $locale, Project $project): void
    {
        $this->locale = $locale;

        if (!$project->display) {
            abort(Response::HTTP_NOT_FOUND);
        }

        $this->project = $project;
    }

    public function render(): \Illuminate\Contracts\View\View
    {
        $this->project->load('metatags');

        $metatags = $this->buildMetags($this->project->metatags);

        $locale = app()->getLocale();

        /** @phpstan-ignore-next-line */
        $this->project->title = $this->project->{'title_' . $this->locale};
        /** @phpstan-ignore-next-line */
        $this->project->body = $this->project->{'body_' . $this->locale};

        return view('livewire.project.show', [
            'metatags' => implode("\n\t\t", $metatags),
        ]);
    }

    /**
     * @param  Collection<int, Metatag>  $projectMetatags
     * @return array<string>
     */
    private function buildMetags(Collection $projectMetatags): array
    {
        $metatags = [];

        foreach ($projectMetatags as $metatag) {
            $properties = [];

            foreach ($metatag->properties as $label => $value) {
                if (empty($value)) {
                    continue;
                }

                $properties[] = "$label=\"$value\"";
            }

            $tag = '<';
            $tag .= $metatag->tag;
            $tag .= ' ';
            $tag .= implode(' ', $properties);
            $tag .= '>';
            if ($metatag->tag === 'script') {
                $tag .= '</script>';
            }
            $metatags[] = $tag;
        }

        return $metatags;
    }
}
