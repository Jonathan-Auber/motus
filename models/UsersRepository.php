<?php

namespace models;

use Exception;

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
        if (!empty($_POST["username"])) {
            $username = trim(htmlspecialchars($_POST["username"]));
            $score = trim(htmlspecialchars($_POST["userScore"]));
            $query = $this->pdo->prepare("INSERT INTO {$this->scoreTable} SET username = :username, user_score = :score");
            $query->execute([
                "username" => $username,
                "score" => $score
            ]);
        } else {
            throw new Exception("400 : Vous n'avez pas rentré votre nom d'utilisateur");
        }
    }
}
