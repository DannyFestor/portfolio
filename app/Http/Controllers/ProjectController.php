<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Response;

class ProjectController extends Controller
{
    public function index()
    {
        $locale = app()->getLocale();
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
            'projects' => $projects,
        ]);
    }

    public function show(Project $project)
    {
        if (!$project->display) {
            abort(Response::HTTP_NOT_FOUND);
        }

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

        if ($project->hasMedia(Project::COLLECTION)) {
            $p['img_url'] = $project->getFirstMediaUrl(Project::COLLECTION);
        }

        //        dd($project, $p);
        //        dd(
        //        isset($p['img_url'])
        //        );

        return view('projects.show', [
            'project' => $p,
            'tags' => $project->tags,
        ]);
    }
}
