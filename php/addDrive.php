<?php
/**
 * Created by PhpStorm.
 * User: Dylan
 * Date: 25/01/2015
 * Time: 16:34
 */

include_once 'bdd_connect.php';

if($_SESSION['user'] != NULL && $_POST['date'])
{
    $req = $bdd->prepare('INSERT INTO `drives`(`username`, `dateRide`, `address1`, `address2`, `distance`, `timeRide`) VALUES (?,?,?,?,?,?)');

    if($req->execute(array($_SESSION['user'], $_POST['date'], $_POST['address1'], $_POST['address2'], $_POST['distance'], $_POST['time'])))
    {
        echo 'true';
    }
    else
    {
        echo 'false2';
    }
}
else
{
    echo 'false1';
}