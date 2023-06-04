<?php

namespace controllers;

use utils\Session;


abstract class Controller
{
    protected $model;
    protected $modelName;
    protected $session;

    public function __construct()
    {
        $this->model = new $this->modelName();
        $this->session = new Session();
    }
}
