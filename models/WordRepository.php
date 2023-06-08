<?php

namespace models;

class Word extends Model
{
    protected string $table = "word";
    protected string $word;

    public function __construct()
    {
        parent::__construct();
    }
}
