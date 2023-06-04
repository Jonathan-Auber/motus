<?php

namespace controllers;

use utils\Render;

class UsersController extends Controller
{
    protected $modelName = \models\UsersRepository::class;

    public function index()
    {
            $pageTitle = "Login";
            Render::render("index", compact("pageTitle"));

    }

    public function game(){
        $pageTitle = "Motus";
        Render::render("motus", compact("pageTitle"));
    }
}
