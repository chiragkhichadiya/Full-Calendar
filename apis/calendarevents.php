<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

include '../db/MyConnection.php';
include '../db/DBCalendar.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if (isset($_REQUEST["action"]) && !empty($_REQUEST["action"])) { //Checks if action value exists
    $action = $_REQUEST["action"];
    switch ($action) { //Switch case for value of action
        case "savevisit": save_visit();
            break;
        case "updatevisit": update_visit();
            break;
        case "getallevents": get_events();
            break;
        case "movevisit": move_visit();
            break;
        case "deletevisit": delete_visit();
            break;
        case "getcontacts": get_contacts();
            break;
        case "getlocations": get_location();
            break;
        case "getspecialties": get_specialties();
            break;
        case "getproducts": get_products();
            break;
        default : echo send_error_message("Invalid request");
            break;
    }
}

function send_error_message($message) {
    MyConnection::closeConnection();
    return json_encode(array("STATUS" => 2, "MESSAGE" => $message));
}

function save_visit() {
    foreach ($_REQUEST as $key => $value) {
        $param[$key] = $value;
    }
    if (empty($param["startdate"]) || strlen($param["startdate"]) == 0) {
        echo send_error_message("Invalid start date");
        return;
    }
    if (empty($param["starttime"]) || strlen($param["starttime"]) == 0) {
        echo send_error_message("Invalid start time");
        return;
    }
    if (empty($param["enddate"]) || strlen($param["enddate"]) == 0) {
        echo send_error_message("Invalid end date");
        return;
    }
    if (empty($param["endtime"]) || strlen($param["endtime"]) == 0) {
        echo send_error_message("Invalid end time");
        return;
    }
    if (empty($param["title"]) || strlen($param["title"]) == 0) {
        echo send_error_message("Invalid title");
        return;
    }
    if (empty($param["location"]) || strlen($param["location"]) == 0) {
        echo send_error_message("Invalid location");
        return;
    }
    if (empty($param["specialty"]) || strlen($param["specialty"]) == 0) {
        echo send_error_message("Invalid specialty");
        return;
    }
    if (empty($param["contact"]) || strlen($param["contact"]) == 0) {
        echo send_error_message("Invalid contact");
        return;
    }
    if (empty($param["state"]) || strlen($param["state"]) == 0) {
        echo send_error_message("Invalid state");
        return;
    }
    if (empty($param["notes"]) || strlen($param["notes"]) == 0) {
        $param["notes"] = NULL;
    }
    $param["starttime"] = date("Y-m-d H:i:s.000", strtotime($param["startdate"] . " " . $param["starttime"]));
    $param["endtime"] = date("Y-m-d H:i:s.000", strtotime($param["enddate"] . " " . $param["endtime"]));

    if (empty($param["noteparam"]) || strlen($param["noteparam"]) == 0) {
        $meetingNotes = array();
    } else {
        $meetingNotes = json_decode($param["noteparam"], TRUE);
    }
//
//    if (!empty($param["final_startdate"])) {
//        $param["final_startdate"] = date("Y-m-d H:i:s.000", strtotime($param["final_startdate"] . " " . $param["final_starttime"]));
//    } else {
//        $param["final_startdate"] = NULL;
//    }
//
//    if (!empty($param["final_enddate"])) {
//        $param["final_enddate"] = date("Y-m-d H:i:s.000", strtotime($param["final_enddate"] . " " . $param["final_endtime"]));
//    } else {
//        $param["final_enddate"] = NULL;
//    }

    if (empty($param["final_notes"]) || strlen($param["final_notes"]) == 0) {
        $param["final_notes"] = NULL;
    }

    $conn = MyConnection::getConnection();
    if (!$conn) {
        echo send_error_message("Something's not right, try refreshing the page.");
        return;
    }
    $visitId = DBCalendar::saveVisit($conn, $param);
    if (!$visitId) {
        echo send_error_message("Error while making entry.");
        return;
    }
    $result = DBCalendar::saveCalendarContacts($conn, $visitId, $param);
    if (!$result) {
        echo send_error_message("Error while making contact entry.");
        return;
    }
    foreach ($meetingNotes as $curNote) {
        if (!empty($curNote["final_startdate"])) {
            $curNote["final_startdate"] = date("Y-m-d H:i:s.000", strtotime($curNote["final_startdate"] . " " . $curNote["final_starttime"]));
        } else {
            $curNote["final_startdate"] = NULL;
        }

        if (!empty($curNote["final_enddate"])) {
            $curNote["final_enddate"] = date("Y-m-d H:i:s.000", strtotime($curNote["final_enddate"] . " " . $curNote["final_endtime"]));
        } else {
            $curNote["final_enddate"] = NULL;
        }
        $noteId = DBCalendar::saveMeetingNotes($conn, $visitId, $curNote);
        if (!$noteId) {
            echo send_error_message("Error while making entry.");
            return;
        }
        if (count($curNote["selectedproducts"]) > 0) {
            $result = DBCalendar::saveMeetingNoteProducts($conn, $visitId, $noteId, $curNote["selectedproducts"]);
            if (!$result) {
                echo send_error_message("Error while making note product entry.");
                return;
            }
        }
        if (!empty($curNote["contact"]) && strlen($curNote["contact"]) > 0) {
            $result = DBCalendar::saveMeetingNoteContacts($conn, $visitId, $noteId, explode(",", $curNote["contact"]));
            if (!$result) {
                echo send_error_message("Error while making note contact entry.");
                return;
            }
        }
    }

    if (!$result) {
        echo send_error_message("Visit entry unsuccessful, try again.");
        return;
    }
    $result = DBCalendar::getCalendarEventById($conn, $visitId);
    if (!$result || $result == NULL) {
        echo send_error_message("Something's not right, try refreshing the page.");
        return;
    }
    MyConnection::closeConnection();

    $responseFinal["STATUS"] = 1;
    $responseFinal["MESSAGE"] = "Visit registered sucessfully.";
    $responseFinal["DATA"] = $result;
    echo json_encode($responseFinal);
}

function update_visit() {
    foreach ($_REQUEST as $key => $value) {
        $param[$key] = $value;
    }
    $conn = MyConnection::getConnection();
    if (!$conn) {
        echo send_error_message("Something's not right, try refreshing the page.");
        return;
    }
    if (!empty($param["id"]) && strlen($param["id"]) > 0) {
        $result = DBCalendar::getCalendarEventById($conn, $param["id"]);
        if (!$result || $result == null) {
            echo send_error_message("Invalid visit selected");
            return;
        }
    }
    if (empty($param["startdate"]) || strlen($param["startdate"]) == 0) {
        echo send_error_message("Invalid start date");
        return;
    }
    if (empty($param["starttime"]) || strlen($param["starttime"]) == 0) {
        echo send_error_message("Invalid start time");
        return;
    }
    if (empty($param["enddate"]) || strlen($param["enddate"]) == 0) {
        echo send_error_message("Invalid end date");
        return;
    }
    if (empty($param["endtime"]) || strlen($param["endtime"]) == 0) {
        echo send_error_message("Invalid end time");
        return;
    }
    if (empty($param["title"]) || strlen($param["title"]) == 0) {
        echo send_error_message("Invalid title");
        return;
    }
    if (empty($param["location"]) || strlen($param["location"]) == 0) {
        echo send_error_message("Invalid location");
        return;
    }
    if (empty($param["specialty"]) || strlen($param["specialty"]) == 0) {
        echo send_error_message("Invalid specialty");
        return;
    }
    if (empty($param["contact"]) || strlen($param["contact"]) == 0) {
        echo send_error_message("Invalid contact");
        return;
    }
    if (empty($param["state"]) || strlen($param["state"]) == 0) {
        echo send_error_message("Invalid state");
        return;
    }
    if (empty($param["notes"]) || strlen($param["notes"]) == 0) {
        $param["notes"] = NULL;
    }

    $param["starttime"] = date("Y-m-d H:i:s.000", strtotime($param["startdate"] . " " . $param["starttime"]));
    $param["endtime"] = date("Y-m-d H:i:s.000", strtotime($param["enddate"] . " " . $param["endtime"]));

    if (empty($param["noteparam"]) || strlen($param["noteparam"]) == 0) {
        $meetingNotes = array();
    } else {
        $meetingNotes = json_decode($param["noteparam"], TRUE);
    }

//    if (!empty($param["final_startdate"])) {
//        $param["final_startdate"] = date("Y-m-d H:i:s.000", strtotime($param["final_startdate"] . " " . $param["final_starttime"]));
//    } else {
//        $param["final_startdate"] = NULL;
//    }
//
//    if (!empty($param["final_enddate"])) {
//        $param["final_enddate"] = date("Y-m-d H:i:s.000", strtotime($param["final_enddate"] . " " . $param["final_endtime"]));
//    } else {
//        $param["final_enddate"] = NULL;
//    }

    if (empty($param["final_notes"]) || strlen($param["final_notes"]) == 0) {
        $param["final_notes"] = NULL;
    }

    $result = DBCalendar::updateVisit($conn, $param, $param["id"]);

    if (!$result) {
        echo send_error_message("Visit update unsuccessful, try again.");
        return;
    }
    $result = DBCalendar::deleteCalendarContacts($conn, $param["id"]);
    if (!$result) {
        echo send_error_message("Error while making contact entry.");
        return;
    }
    $result = DBCalendar::saveCalendarContacts($conn, $param["id"], $param);
    if (!$result) {
        echo send_error_message("Error while making contact entry.");
        return;
    }

    $result = DBCalendar::deleteMeetingNoteProducts($conn, $param["id"]);
    if (!$result) {
        echo send_error_message("Error while deleting meeting note products.");
        return;
    }
    $result = DBCalendar::deleteMeetingNoteContacts($conn, $param["id"]);
    if (!$result) {
        echo send_error_message("Error while deleting meeting note contacts.");
        return;
    }
    $result = DBCalendar::deleteMeetingNotes($conn, $param["id"]);
    if (!$result) {
        echo send_error_message("Error while deleting meeting notes.");
        return;
    }
    foreach ($meetingNotes as $curNote) {
        if (!empty($curNote["final_startdate"])) {
            $curNote["final_startdate"] = date("Y-m-d H:i:s.000", strtotime($curNote["final_startdate"] . " " . $curNote["final_starttime"]));
        } else {
            $curNote["final_startdate"] = NULL;
        }

        if (!empty($curNote["final_enddate"])) {
            $curNote["final_enddate"] = date("Y-m-d H:i:s.000", strtotime($curNote["final_enddate"] . " " . $curNote["final_endtime"]));
        } else {
            $curNote["final_enddate"] = NULL;
        }
        $noteId = DBCalendar::saveMeetingNotes($conn, $param["id"], $curNote);
        if (!$noteId) {
            echo send_error_message("Error while making entry.");
            return;
        }
        if (count($curNote["selectedproducts"]) > 0) {
//            $result = DBCalendar::deleteMeetingNoteProducts($conn, $param["id"]);
//            if (!$result) {
//                echo send_error_message("Error while deleting meeting note products.");
//                return;
//            }
            $result = DBCalendar::saveMeetingNoteProducts($conn, $param["id"], $noteId, $curNote["selectedproducts"]);
            if (!$result) {
                echo send_error_message("Error while making note product entry.");
                return;
            }
        }
        if (!empty($curNote["contact"]) && strlen($curNote["contact"]) > 0) {
//            $result = DBCalendar::deleteMeetingNoteContacts($conn, $param["id"]);
//            if (!$result) {
//                echo send_error_message("Error while deleting meeting note contacts.");
//                return;
//            }
            $result = DBCalendar::saveMeetingNoteContacts($conn, $param["id"], $noteId, explode(",", $curNote["contact"]));
            if (!$result) {
                echo send_error_message("Error while making note contact entry.");
                return;
            }
        }
    }

    $result = DBCalendar::getCalendarEventById($conn, $param["id"]);
    if (!$result || $result == NULL) {
        echo send_error_message("Something's not right, try refreshing the page.");
        return;
    }

    MyConnection::closeConnection();
    $responseFinal["STATUS"] = 1;
    $responseFinal["MESSAGE"] = "Visit updated sucessfully.";
    $responseFinal["DATA"] = $result;
    echo json_encode($responseFinal);
}

function get_events() {
    foreach ($_REQUEST as $key => $value) {
        $param[$key] = $value;
    }
    $conn = MyConnection::getConnection();
    if (!$conn) {
        echo send_error_message("Something's not right, try refreshing the page.");
        return;
    }
    $result["events"] = DBCalendar::getCalendarEvents($conn);
//    $result["entities"] = DBCalendar::getAllEntities($conn);
//    $result["products"] = DBCalendar::getAllProducts($conn);
    MyConnection::closeConnection();

    $responseFinal["STATUS"] = 1;
    $responseFinal["MESSAGE"] = "Calendar events retrieved successfully";
    $responseFinal["DATA"] = $result;
    echo json_encode($responseFinal);
}

function move_visit() {
    foreach ($_REQUEST as $key => $value) {
        $param[$key] = $value;
    }
    $conn = MyConnection::getConnection();
    if (!$conn) {
        echo send_error_message("Something's not right, try refreshing the page.");
        return;
    }
    if (empty($param["id"]) || strlen($param["id"]) == 0) {
        echo send_error_message("Invalid visit selected.");
        return;
    }
    $result = DBCalendar::getCalendarEventById($conn, $param["id"]);
    if (!$result || $result == null) {
        echo send_error_message("Invalid visit selected.");
        return;
    }

    $param["starttime"] = date("Y-m-d H:i:s.000", strtotime($param["startdate"] . " " . $param["starttime"]));
    $param["endtime"] = date("Y-m-d H:i:s.000", strtotime($param["enddate"] . " " . $param["endtime"]));

//    if (!empty($param["final_startdate"])) {
//        $param["final_startdate"] = date("Y-m-d H:i:s.000", strtotime($param["final_startdate"] . " " . $param["final_starttime"]));
//    } else {
//        $param["final_startdate"] = NULL;
//    }
//
//    if (!empty($param["final_enddate"])) {
//        $param["final_enddate"] = date("Y-m-d H:i:s.000", strtotime($param["final_enddate"] . " " . $param["final_endtime"]));
//    } else {
//        $param["final_enddate"] = NULL;
//    }

    if (empty($param["final_notes"]) || strlen($param["final_notes"]) == 0) {
        $param["final_notes"] = NULL;
    }

    $result = DBCalendar::updateVisit($conn, $param, $param["id"]);
    if (!$result) {
        echo send_error_message("Visit move unsuccessful, try again.");
        return;
    }
    $result = DBCalendar::getCalendarEventById($conn, $param["id"]);
    if (!$result || $result == NULL) {
        echo send_error_message("Something's not right, try refreshing the page.");
        return;
    }
    MyConnection::closeConnection();

    $responseFinal["STATUS"] = 1;
    $responseFinal["MESSAGE"] = "Calendar events moved successfully.";
    $responseFinal["DATA"] = $result;
    echo json_encode($responseFinal);
}

function delete_visit() {
    foreach ($_REQUEST as $key => $value) {
        $param[$key] = $value;
    }
    $conn = MyConnection::getConnection();
    if (!$conn) {
        echo send_error_message("Something's not right, try refreshing the page.");
        return;
    }
    if (empty($param["id"]) || strlen($param["id"]) == 0) {
        echo send_error_message("Invalid visit selected.");
        return;
    }
    $result = DBCalendar::getCalendarEventById($conn, $param["id"]);
    if (!$result || $result == null) {
        echo send_error_message("Invalid visit selected.");
        return;
    }
    $result = DBCalendar::deleteCalendarProductsByCalendarID($conn, $param["id"]);
    if (!$result) {
        echo send_error_message("Error while deleting visit data.");
        return;
    }
    $result = DBCalendar::deleteVisitByCalendarId($conn, $param["id"]);
    if (!$result) {
        echo send_error_message("Error while deleting visit data.");
        return;
    }
    MyConnection::closeConnection();

    $responseFinal["STATUS"] = 1;
    $responseFinal["MESSAGE"] = "Calendar events retrieved successfully.";
    $responseFinal["DATA"] = $result;
    echo json_encode($responseFinal);
}

function get_contacts() {
    foreach ($_REQUEST as $key => $value) {
        $param[$key] = $value;
    }
    $conn = MyConnection::getConnection();
    if (!$conn) {
        echo send_error_message("Something's not right, try refreshing the page.");
        return;
    }
    $result = DBCalendar::getEntitiesByEntityType($conn, $param, true);
    MyConnection::closeConnection();

    $responseFinal["STATUS"] = 1;
    $responseFinal["MESSAGE"] = "Contacts retrieved successfully";
    $responseFinal["DATA"] = $result;
    echo json_encode($responseFinal);
}

function get_location() {
    foreach ($_REQUEST as $key => $value) {
        $param[$key] = $value;
    }
    $conn = MyConnection::getConnection();
    if (!$conn) {
        echo send_error_message("Something's not right, try refreshing the page.");
        return;
    }
    $result = DBCalendar::getEntitiesByEntityType($conn, $param, false);
    MyConnection::closeConnection();

    $responseFinal["STATUS"] = 1;
    $responseFinal["MESSAGE"] = "Locations retrieved successfully";
    $responseFinal["DATA"] = $result;
    echo json_encode($responseFinal);
}

function get_specialties() {
    foreach ($_REQUEST as $key => $value) {
        $param[$key] = $value;
    }
    $conn = MyConnection::getConnection();
    if (!$conn) {
        echo send_error_message("Something's not right, try refreshing the page.");
        return;
    }
    $result = DBCalendar::getSpecialties($conn, $param);
    MyConnection::closeConnection();

    $responseFinal["STATUS"] = 1;
    $responseFinal["MESSAGE"] = "Specialties retrieved successfully";
    $responseFinal["DATA"] = $result;
    echo json_encode($responseFinal);
}

function get_products() {
    foreach ($_REQUEST as $key => $value) {
        $param[$key] = $value;
    }
    $conn = MyConnection::getConnection();
    if (!$conn) {
        echo send_error_message("Something's not right, try refreshing the page.");
        return;
    }
    $result = DBCalendar::getAllProducts($conn, $param);
    MyConnection::closeConnection();

    $responseFinal["STATUS"] = 1;
    $responseFinal["MESSAGE"] = "Products retrieved successfully";
    $responseFinal["DATA"] = $result;
    echo json_encode($responseFinal);
}
