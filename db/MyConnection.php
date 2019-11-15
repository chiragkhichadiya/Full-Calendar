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
/*define("DB_HOST", "sql5016.smarterasp.net");
define("DB_USER", "DB_A1898B_test_admin");
define("DB_PASSWORD", "h0Aka01F");
define("DB_DATABASE", "db_a1898b_test");*/

define("DB_HOST", "mssql2.gear.host");
define("DB_USER", "webapp101");
define("DB_PASSWORD", "El32p~1A?V2D");
define("DB_DATABASE", "webapp101");

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
