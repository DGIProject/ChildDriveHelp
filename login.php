<?php
/**
 * Created by PhpStorm.
 * User: Dylan
 * Date: 25/01/2015
 * Time: 18:12
 */

session_start();

if($_SESSION['user'] != NULL)
{
    header('Location: index.php');
}

$_SESSION['user'] = 'User';