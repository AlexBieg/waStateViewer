<?php
    header('Content-Type: text/plain');

    if ( isset($_POST['address'])) {
        echo file_get_contents($_POST['address']);
    } else {
        echo 'post not set';
    }
 ?>
