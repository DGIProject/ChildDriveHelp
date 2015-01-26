<?php
/**
 * Created by PhpStorm.
 * User: Dylan
 * Date: 25/01/2015
 * Time: 16:53
 */

include_once 'bdd_connect.php';

if($_SESSION['user'] != NULL)
{
    $req = $bdd->prepare('SELECT * FROM drives ORDER BY id DESC');
    $req->execute();

    $tabDrives = [];
    $i = 0;

    $tabDrives[0] = 'success';

    foreach($req->fetchAll() as $drive)
    {
        $tabDrives[1][$i] = array(
            'date' => $drive['dateRide'],
            'address1' => $drive['address1'],
            'address2' => $drive['address2'],
            'distance' => $drive['distance'],
            'time' => $drive['timeRide']);

        $i++;
    }

    echo json_encode($tabDrives);
}
else
{
    echo 'false';
}