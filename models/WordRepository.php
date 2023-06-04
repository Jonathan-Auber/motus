<?php

namespace models;

Class Word extends Model{
    protected string $table = "word";
    protected string $word;
    

    public function __construct()
    {
        parent::__construct();
    }

}