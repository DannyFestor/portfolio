<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Response;

class ProjectController extends Controller
{
    public function index(string $locale): View
    {
        $projects = Project::query()
            ->select([
                'id',
                'slug',
                'title_' . $locale . ' as title',
                \DB::raw('SUBSTR(body_' . $locale . ', 1, 100) as body'),
                'git_url',
                'live_url',
            ])
            ->with('tags')
            ->where('display', '=', true)
            ->orderBy('sort')
            ->get();

        return view('projects.index', [
            'locale' => $locale,
            'projects' => $projects,
        ]);
    }

    public function show(string $locale, Project $project): View
    {
        if (!$project->display) {
            abort(Response::HTTP_NOT_FOUND);
        }
        $project->load('metatags');

        $metatags = $this->buildMetags($project);

        $locale = app()->getLocale();
        $p = [
            'slug' => $project->slug,
            'git_url' => $project->git_url,
            'live_url' => $project->live_url,
        ];
        if ($locale === 'de') {
            $p['title'] = $project->title_de;
            $p['body'] = $project->body_de;
        } elseif ($locale === 'ja') {
            $p['title'] = $project->title_ja;
            $p['body'] = $project->body_ja;
        } else {
            $p['title'] = $project->title_en;
            $p['body'] = $project->body_en;
        }

        if ($project->hasMedia(Project::PROJECT_IMAGE)) {
            $p['img_url'] = $project->getFirstMediaUrl(Project::PROJECT_IMAGE);
        }

        return view('projects.show', [
            'project' => $p,
            'tags' => $project->tags,
            'screenshots' => $project->getMedia(Project::PROJECT_IMAGES),
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
