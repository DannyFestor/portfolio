<?php

namespace App\Helpers;

use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\MarkdownConverter;

class Markdown
{
    public static function make(string $input) : string {
        $config = [
            'html_input' => 'allow',
//            'html_input' => 'escape',
            'table_of_contents' => [
                'html_class' => 'table-of-contents',
//                'position' => 'top',
                'position' => 'placeholder',
                'placeholder' => '[TOC]',
                'style' => 'bullet',
                'min_heading_level' => 1,
                'max_heading_level' => 6,
                'normalize' => 'relative',
//                'placeholder' => null,
            ],
            'heading_permalink' => [
                'html_class' => 'heading-permalink',
                'id_prefix' => 'content',
                'fragment_prefix' => 'content',
                'insert' => 'before',
                'min_heading_level' => 1,
                'max_heading_level' => 6,
                'title' => 'Permalink',
                'symbol' => '#',
                'aria_hidden' => true,
            ],
        ];
//
//// Configure the Environment with all the CommonMark parsers/renderers
        $environment = new Environment($config);
        $environment->addExtension(new CommonMarkCoreExtension());
        $environment->addExtension(new \League\CommonMark\Extension\Table\TableExtension());
        $environment->addExtension(new \League\CommonMark\Extension\Strikethrough\StrikethroughExtension());
        $environment->addExtension(new \League\CommonMark\Extension\Footnote\FootnoteExtension());
        $environment->addExtension(new \League\CommonMark\Extension\HeadingPermalink\HeadingPermalinkExtension());
        $environment->addExtension(new \League\CommonMark\Extension\TableOfContents\TableOfContentsExtension());

// Instantiate the converter engine and start converting some Markdown!
        $converter = new MarkdownConverter($environment);

        return $converter->convert($input)->getContent();
    }
}
