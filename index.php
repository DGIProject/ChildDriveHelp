<?php
session_start();

if($_SESSION['user'] == NULL)
{
    header('Location: login.php');
}?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ChildDriveHelp</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <link href="css/style.css" rel="stylesheet">

    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
</head>
<body>

<div class="container">
    <h1>ChildDriveHelp</h1>
    <div id="map-canvas" style="height: 450px;" class="panel panel-default panel-body"></div>
    <div role="tabpanel">

        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li id="listDrivesLi" role="presentation" class="active"><a href="#listDrives" onclick="listDrives();" aria-controls="home" role="tab" data-toggle="tab">List</a></li>
            <li id="addDriveLi" role="presentation"><a href="#addDrive" onclick="addDrive();" aria-controls="profile" role="tab" data-toggle="tab">Add</a></li>
            <li id="settingsLi" role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="listDrives">
                <table id="tableDrives" class="table table-striped">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Distance</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr></tr>
                    </tbody>
                </table>
            </div>
            <div role="tabpanel" class="tab-pane" id="addDrive">
                <h2>Add Drive</h2>
                <form method="post" onsubmit="confirmAddDrive();return false" class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Date</label>
                        <div class="col-sm-4">
                            <input type="text" id="datepicker" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">From</label>
                        <div class="col-sm-4">
                            <span id="address1">--</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">To</label>
                        <div class="col-sm-4">
                            <span id="address2">--</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Distance</label>
                        <div class="col-sm-4">
                            <span id="distance">-- km</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">Time</label>
                        <div class="col-sm-4">
                            <span id="time">0 hour(s), 0 minute(s)</span>
                            <div class="btn-group-xs">
                                <button type="button" onmousedown="plusTime();" onmouseup="clearTimeoutPlusLess();" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-plus"></span></button>
                                <button type="button" onmousedown="lessTime();" onmouseup="clearTimeoutPlusLess();" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-minus"></span></button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-4">
                            <button type="submit" class="btn btn-default">Add Drive</button>
                        </div>
                    </div>
                </form>
            </div>
            <div role="tabpanel" class="tab-pane" id="settings">...</div>
        </div>

    </div>

    <footer class="footer">
        <p>ChildDriveHelp By Dylan Delaporte - 2015</p>
    </footer>
</div>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="js/bootstrap.min.js"></script>

<script src="js/class/DRIVE.class.js"></script>
<script src="js/script.js"></script>

<script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
</body>
</html>