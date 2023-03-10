<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;

    public function create(User $user): bool
    {
        return $user->is_admin;
    }

    public function update(User $user, Post $post): bool
    {
        return $user->is_admin;
    }
}
