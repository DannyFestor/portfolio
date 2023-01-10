<?=
'<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
'<?xml-stylesheet type="text/xsl" media="screen" href="/~files/feed-premium.xsl"?>' . PHP_EOL;
?>
<rss version="2.0" xmlns:media="http://www.w3.org/2001/XMLSchema" xml:base="{{ route('blog.feed') }}" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <atom:link rel="hub" href="{{ route('blog.feed') }}"/>
        <image>
            <link>{{ config('app.url') }}</link>
            <title><![CDATA[festor.info]]></title>
            <url><!-- TODO --></url>
        </image>

        <title><![CDATA[ festor.info ]]></title>
        <atom:link href="{{ route('blog.feed') }}" rel="self" type="application/rss+xml"/>
        <link>{{ config('app.url') }}</link>
        <description>New Articles </description>
        <lastBuildDate>{{ now() }}</lastBuildDate>
        <language>en</language>
        <generator>{{ config('app.url') }}</generator>

        @foreach($posts as $post)
            <item>
                <title>
                    <![CDATA[{{ $post->title }}]]>
                </title>
                <link>{{ route('blog.show', $post) }}</link>
                <description>
                    <![CDATA[{!! $post->description !!}]]>
                </description>
                <category />
                <author>
                    <![CDATA[{{ $post->user->name }} ({{ $post->user->email }})]]>
                </author>
                <guid>{{ $post->slug }}</guid>
                <pubDate>{{ $post->released_at->format('Y-m-d H:i') }}</pubDate>
            </item>
        @endforeach
    </channel>
</rss>
