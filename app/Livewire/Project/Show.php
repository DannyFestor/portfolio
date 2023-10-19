<?php

namespace App\Livewire\Project;

use App\Models\Post;
use App\Models\Project;
use Illuminate\Http\Response;
use Livewire\Component;

class Show extends Component
{
    public string $locale;

    public Project $project;

    public function mount(string $locale, Project $project)
    {
        $this->locale = $locale;

        if (!$project->display) {
            abort(Response::HTTP_NOT_FOUND);
        }

        $this->project = $project;
    }

    public function render()
    {
        $this->project->load('metatags');

        $metatags = $this->buildMetags($this->project);

        $locale = app()->getLocale();

        $this->project->title = $this->project->{'title_' . $this->locale};
        $this->project->body = $this->project->{'body_' . $this->locale};

        return view('livewire.project.show', [
            'metatags' => implode("\n\t\t", $metatags),
        ]);
    }

    /**
     * @return array<string>
     */
    private function buildMetags(Project $project): array
    {
        $metatags = [];
        foreach ($project->metatags as $metatag) {
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
