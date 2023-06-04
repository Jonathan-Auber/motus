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


}