<?php
    header('Content-Type: text/xml');

    if ( isset($_POST['address'])) {
        echo file_get_contents($_POST['address']);
    } else {
        echo 'post not set';
    }
 ?>
