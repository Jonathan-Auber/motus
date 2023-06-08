<?php

namespace controllers;

use utils\Render;

class UsersController extends Controller
{
    protected $modelName = \models\UsersRepository::class;

    public function index()
    {
        $pageTitle = "Accueil";
        Render::render("index", compact("pageTitle"));
    }

    public function game()
    {
        $pageTitle = "Motus";
        Render::render("motus", compact("pageTitle"));
    }

    public function saveScore()
    {
        if (isset($_POST["username"]) && intval($_POST["userScore"]) > 0) {
            $this->model->saveScore();
        }
        header("Location: /motus/users/game");
    }
}
