<?php

namespace models;

use Exception;
use utils\Session;

class UsersRepository extends Model
{
    protected string $table = "users";
    protected Session $session;

    public function __construct()
    {
        parent::__construct();
        $this->session = new Session();
    }

    public function saveScore()
    {
        $username = trim(htmlspecialchars($_POST["username"]));
        $score = trim(htmlspecialchars($_POST["userScore"]));
        $query = $this->pdo->prepare("INSERT INTO score SET username = :username, score = :score");
        $query->execute([
            "username" => $username,
            "score" => $score
        ]);
    }
}
