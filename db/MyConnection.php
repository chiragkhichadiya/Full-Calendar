<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MyConnection
 *
 * @author Chirag Khichadiya
 */
$conn = false;

define("DB_HOST", "localhost");
define("DB_USER", "test");
define("DB_PASSWORD", "test");
define("DB_DATABASE", "calendar");

class MyConnection {

    static function closeConnection() {
        global $conn;
        if (!$conn) {
            return;
        }
        sqlsrv_close($conn);
        $conn = false;
    }

    static function getConnection() {
        global $conn;
        $serverName = DB_HOST; //serverName\instanceName 
        $connectionInfo = array("Database" => DB_DATABASE, "Uid" => DB_USER, "PWD" => DB_PASSWORD, "CharacterSet" => "UTF-8");
        $conn = sqlsrv_connect($serverName, $connectionInfo);
        if (!$conn) {
            return false;
        }
        return $conn;
    }

}
