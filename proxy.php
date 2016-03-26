<?php
    header('Content-Type: text/plain');

    $params = json_decode(file_get_contents('php://input'), true);

    if ( isset($_POST['address'])) {
        echo file_get_contents($params['address']);
    } else {
        echo 'post not set';
    }
 ?>
