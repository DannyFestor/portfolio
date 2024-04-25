<?php

use Symfony\Component\Finder\Finder;

require 'vendor/autoload.php';

array_shift($argv); // remove first argument (script name) from command line script

$files = find_files();

if (empty($files)) {
    exit;
}

$failure = false;

foreach ($files as $file) {
    // reset pointers because this is a loop. exec appends to end of arrays.
    $output = []; // exec uses outputs folder to populate this
    $exitCode = 0; // same
    exec('php -l ' . $file . ' 2>&1', $output, $exitCode);
    // 2>&1 -> send strErr to stdout

    if ($exitCode !== 0) {
        [$line, $error] = parse_error($output);
        display_error($file, $line, $error);
        $failure = true;
    }
}

exit($failure ? 1 : 0);

function parse_error(array $lines): array
{
    // output: PHP Parse error: [error type,]? [type] in [path] on line [number]
    // ?: group we don't care to capture
    preg_match('/PHP Parse error:\s+(?:syntax error, )(.+?)\s+in\s+.+?\.php\s+on\s+line\s+(\d+)/', $lines[0], $matches);

    // print_r($matches);

    return [$matches[2], $matches[1]];
}

function display_error(string $path, int $line, string $error)
{
    echo $path;
    echo PHP_EOL;
    echo '  - Line', $line, ': ', $error;
    echo PHP_EOL;
    echo PHP_EOL;
}

function find_files()
{
    global $argv;
    if ($argv) { // if command line args contains files
        return $argv;
    }

    $finder = new Finder();
    // find all files in the current directory
    $finder
        ->files()
        ->in(dirname(__DIR__))
        ->exclude('vendor')
        ->name('*.php');

    return array_map(fn ($file) => $file->getRelativePathname(), iterator_to_array($finder, false));
}
