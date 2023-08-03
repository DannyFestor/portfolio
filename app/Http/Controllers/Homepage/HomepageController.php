<?php

namespace App\Http\Controllers\Homepage;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;

class HomepageController extends Controller
{
    public function __invoke(string $locale = null): View
    {
        $metatags = $this->getMetatagsForLocale($locale ?? app()->getLocale());

        return view('homepage.index', ['metatags' => $metatags]);
    }

    private function getMetatagsForLocale(string $locale)
    {
        $imagePath = public_path('img/danny-640.jpeg');

        return match ($locale) {
            'de' => <<<HTML
<link rel="home" href="http://portfolio.test">
<link rel="canonical" href="http://portfolio.test/{$locale}">
<meta name="title" content="Moderne, sichere Webseiten und Services - festor.info">
<meta name="keywords" content="Fullstack,Freelance,Webdev,Sicher,Modern,Schnell,PHP,Golang,Typescript,Vue,Deutsch,Englisch,Japanisch">
<meta name="description" content="Moderne, sichere Webseiten und Services. Ich realisiere Ihr Traumprojekt schnell und zuverlässig. Gute Kommunikation ist mir wichtig. festor.info">
<meta name="twitter:site" content="@Denakino">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@Denakino">
<meta name="twitter:description" content="Moderne, sichere Webseiten und Services. Ich realisiere Ihr Traumprojekt schnell und zuverlässig. Gute Kommunikation ist mir wichtig. festor.info">
<meta name="twitter:image" content="{$imagePath}">
<meta name="twitter:title" content="Moderne, sichere Webseiten und Services - festor.info">
<meta name="og:description" content="Moderne, sichere Webseiten und Services. Ich realisiere Ihr Traumprojekt schnell und zuverlässig. Gute Kommunikation ist mir wichtig. festor.info">
<meta name="og:image" content="{$imagePath}">
<meta name="og:locale" content="de_DE">
<meta name="og:site_name" content="festor.info">
<meta name="og:title" content="Moderne, sichere Webseiten und Services - festor.info">
<meta name="og:type" content="homepage">
<meta name="og:url" content="http://portfolio.test/{$locale}">
HTML,
            'ja' => <<<'HTML'
<link rel="home" href="http://portfolio.test">
<link rel="canonical" href="http://portfolio.test/{$locale}">
<meta name="title" content="モダンで安全なウェブサイトとサービス - festor.info">
<meta name="keywords" content="フルスタック,Web開発,多言語対策,安全,モダーン,はやい,PHP,Go言語,Typescript,Vue,日本語,英語,ドイツ語">
<meta name="description" content="モダンで安全なウェブサイトとサービス。あなたの夢のプロジェクトを迅速かつ確実に実現します。良いコミュニケーションは私にとって重要です。 - festor.info">
<meta name="twitter:site" content="@Denakino">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@Denakino">
<meta name="twitter:description" content="モダンで安全なウェブサイトとサービス。あなたの夢のプロジェクトを迅速かつ確実に実現します。良いコミュニケーションは私にとって重要です。 - festor.info">
<meta name="twitter:image" content="{$imagePath}">
<meta name="twitter:title" content="モダンで安全なウェブサイトとサービス - festor.info">
<meta name="og:description" content="モダンで安全なウェブサイトとサービス。あなたの夢のプロジェクトを迅速かつ確実に実現します。良いコミュニケーションは私にとって重要です。 - festor.info">
<meta name="og:image" content="{$imagePath}">
<meta name="og:locale" content="ja_JP">
<meta name="og:site_name" content="festor.info">
<meta name="og:title" content="モダンで安全なウェブサイトとサービス - festor.info">
<meta name="og:type" content="homepage">
<meta name="og:url" content="http://portfolio.test/{$locale}">
HTML,
            default => <<<'HTML'
<link rel="home" href="http://portfolio.test">
<link rel="canonical" href="http://portfolio.test/{$locale}">
<meta name="title" content="Modern, secure Websites and Services - festor.info">
<meta name="keywords" content="Fullstack,Freelance,Webdev,Sicher,Modern,Schnell,PHP,Golang,Typescript,Vue,Deutsch,Englisch,Japanisch">
<meta name="description" content="Modern, secure websites and services. I realize your dream project quickly and reliably. Good communication is important to me. - festor.info">
<meta name="twitter:site" content="@Denakino">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@Denakino">
<meta name="twitter:description" content="Modern, secure websites and services. I realize your dream project quickly and reliably. Good communication is important to me. - festor.info">
<meta name="twitter:image" content="{$imagePath}">
<meta name="twitter:title" content="Modern, secure Websites and Services - festor.info">
<meta name="og:description" content="Modern, secure websites and services. I realize your dream project quickly and reliably. Good communication is important to me. - festor.info">
<meta name="og:image" content="{$imagePath}">
<meta name="og:locale" content="en_US">
<meta name="og:site_name" content="festor.info">
<meta name="og:title" content="Modern, secure Websites and Services - festor.info">
<meta name="og:type" content="homepage">
<meta name="og:url" content="http://portfolio.test/{$locale}">
HTML,

        };
    }
}
