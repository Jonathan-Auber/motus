<?php

namespace controllers;

use utils\Render;

class ScoreController extends Controller
{
    protected $modelName = \models\ScoreRepository::class;

    public function displayScore()
    {
        $allScores = $this->model->displayScore();
        extract($allScores);
        $pageTitle = "Wall of Fame";
        Render::render("score", compact("pageTitle", "allScores"));
    }
}
