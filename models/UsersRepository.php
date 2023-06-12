<?php

namespace models;

use Exception;
use utils\Session;

class UsersRepository extends Model
{
    protected string $table;
    protected string $scoreTable;

    public function __construct()
    {
        parent::__construct();
        $this->table = "users";
        $this->scoreTable = "score";
    }

    public function saveScore()
    {
        $username = trim(htmlspecialchars($_POST["username"]));
        $score = trim(htmlspecialchars($_POST["userScore"]));
        $query = $this->pdo->prepare("INSERT INTO {$this->scoreTable} SET username = :username, user_score = :score");
        $query->execute([
            "username" => $username,
            "score" => $score
        ]);
    }
}
