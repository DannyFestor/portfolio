<?php

namespace App\Helpers;

class MetaTags
{
    public static function makeMetatags(
        string $path,
        string $title,
        string $titleShort,
        string $keywords,
        string $description,
        string $type = 'website',
    ): string {
        /** @var string $url */
        $url = config('app.url');
        $imagePath = $url . '/img/danny-640.jpeg';

        $twitterHandle = __('metatags.twitter.username');
        $locale = __('metatags.locale');

        return <<<HTML
        <link rel="home" href="{$url}/">
        <link rel="canonical" href="{$url}/{$path}">
        <meta name="title" content="{$title}">
        <meta name="keywords" content="{$keywords}">
        <meta name="description" content="{$title}">
        <meta name="twitter:site" content="{$twitterHandle}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:creator" content="{$twitterHandle}">
        <meta name="twitter:description" content="{$title}">
        <meta name="twitter:image" content="{$imagePath}">
        <meta name="twitter:title" content="{$titleShort}">
        <meta name="og:description" content="{$title}">
        <meta name="og:image" content="{$imagePath}">
        <meta name="og:locale" content="{$locale}">
        <meta name="og:site_name" content="festor.info">
        <meta name="og:title" content="{$titleShort}">
        <meta name="og:type" content="{$type}">
        <meta name="og:url" content="{$url}/{$path}">
    HTML;
    }
}
