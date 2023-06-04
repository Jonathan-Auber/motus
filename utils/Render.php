<?php

namespace utils;

class Render
{
    public static function render(string $path, array $var = [])
    {
        extract($var);
        ob_start();
        require('views/' . $path .  '.phtml');
        $pageContent = ob_get_clean();

        require('views/layout.phtml');
    }
}
