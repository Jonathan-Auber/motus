<?php

namespace config;

use controllers\UsersController;
use utils\Render;
use Exception;

class Routing
{
    public function get()
    {
        try {
            if (isset($_GET['controller'])) {
                $url = htmlspecialchars($_GET['controller']);
                $newUrl = explode("/", $url);
                $controllerName = "controllers\\" . ucfirst($newUrl[0] . "Controller");
                if (isset($newUrl[1])) {
                    $methodName = strtolower($newUrl[1]);
                    $controller = new $controllerName();
                    if (isset($newUrl[2])) {
                        $id = $newUrl[2];
                        $controller->$methodName(intval($id));
                    } else {
                        $controller->$methodName();
                    }
                } else {
                    throw new Exception("404 : Cette page n'existe pas");
                }
            } else {
                $index = new UsersController();
                $index->index();
            }
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $parts = explode(': ', $errorMessage);
            $errorCode = $parts[0];
            $errorDescription = $parts[1];
            $pageTitle = "Page d'erreur";
            Render::render("error", compact("errorCode", "errorDescription", "pageTitle"));
        }
    }
}
