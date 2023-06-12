<?php

namespace models;

class ScoreRepository extends Model
{
    protected string $table;

    public function __construct()
    {
        parent::__construct();
        $this->table = "score";
    }

    public function displayScore()
    {
        $query = $this->pdo->prepare("SELECT * FROM {$this->table} ORDER BY user_score DESC LIMIT 10");
        $query->execute();
        $allScores = $query->fetchAll();
        return compact("allScores");
    }
}
