<?php
/**
 * Created by PhpStorm.
 * User: Dylan
 * Date: 25/01/2015
 * Time: 18:11
 */

include_once 'bdd_connect.php';

if($_SESSION['user'] != NULL && $_POST['id'])
{
    echo 'true';
}
else
{
    echo 'false';
}