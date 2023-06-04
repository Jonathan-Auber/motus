<?php

namespace utils;

class Session
{
    public function __construct()
    {
        if (!isset($_SESSION)) {
            session_start();
        }
    }

    public function setSession(string $word): void
    {
        $_SESSION['word'] = "";
        $_SESSION['score'] = 0;
    }
}
