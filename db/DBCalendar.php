<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DBCalendar
 *
 * @author Chirag Khichadiya
 */
class DBCalendar {

    static function saveVisit($conn, $visit) {
        if (!$conn) {
            return false;
        }
        $sql = "INSERT INTO calendar (title,startdate,enddate,allDay,state,location_ent_id,notes,final_notes,seg_id) values(?,?,?,?,?,?,?,?,?); SELECT SCOPE_IDENTITY()";
        $result = sqlsrv_query($conn, $sql, array(&$visit["title"], &$visit["starttime"], &$visit["endtime"], &$visit["allday"], &$visit["state"], &$visit["location"], &$visit["notes"], &$visit["final_notes"], &$visit["specialty"]));
        sqlsrv_next_result($result);
        sqlsrv_fetch($result);
        return sqlsrv_get_field($result, 0);
    }

    static function updateVisit($conn, $visit, $id) {
        if (!$conn) {
            return false;
        }
        $sql = "UPDATE calendar SET title=?,startdate= ?,enddate=?,allDay=?,state=?,location_ent_id=?,notes=?,final_notes=?,seg_id=? WHERE cal_id=?";
        if (sqlsrv_query($conn, $sql, array(&$visit["title"], &$visit["starttime"], &$visit["endtime"], &$visit["allday"], &$visit["state"], &$visit["location"], &$visit["notes"], &$visit["final_notes"], &$visit["specialty"], $id))) {
            return true;
        }
        return false;
    }

    static function deleteVisitByCalendarId($conn, $calId) {
        if (!$conn) {
            return false;
        }
        $sql = "DELETE FROM calendar WHERE cal_id=?";
        if (sqlsrv_query($conn, $sql, array(&$calId))) {
            return true;
        }
        return false;
    }

    static function getCalendarEventById($conn, $id) {
        if (!$conn) {
            return false;
        }
        $sql = "SELECT cal_id, title, startdate, enddate, allDay, state,
            CASE when state = 1 THEN 'OPEN'
                when state = 2 THEN 'VISITED'
                when state = 3 THEN 'CLOSED' 
                when state = 4 THEN 'CANCELLED'
            END STATE_DESC 
            , location_ent_id, location.name AS 'location_name', calendar.notes, final_notes, calendar.seg_id, specialty.descr AS 'specialty_name'
            FROM calendar, Entity location, SegmentoEntidade specialty
            WHERE calendar.cal_id = " . $id . " AND location.ent_id = calendar.location_ent_id AND specialty.seg_id = calendar.seg_id";
        $stmt = sqlsrv_query($conn, $sql);
        if ($stmt === false) {
            return;
        }
        $result = null;
        while ($row = sqlsrv_fetch_array($stmt)) {
            $result["id"] = $row["cal_id"];
            $result["title"] = $row["title"];
            $result["startdate"] = $row["startdate"];
            $result["enddate"] = $row["enddate"];
            $result["allDay"] = $row["allDay"];
            $result["state"] = $row["state"];
            $result["stateDesc"] = $row["STATE_DESC"];
            $result["contacts"] = DBCalendar::getVisitContacts($conn, $row["cal_id"]);
            $result["location_ent_id"] = $row["location_ent_id"];
            $result["location_name"] = $row["location_name"];
            $result["specialty_id"] = $row["seg_id"];
            $result["specialty_name"] = $row["specialty_name"];
            $result["notes"] = $row["notes"];
            $result["final_notes"] = $row["final_notes"];
            $result["noteparam"] = DBCalendar::getMeetingNotes($conn, $row["cal_id"]);
        }
        sqlsrv_free_stmt($stmt);
        return $result;
    }

    static function getCalendarEvents($conn) {
        if (!$conn) {
            return false;
        }
        $sql = "SELECT cal_id, title, startdate, enddate, allDay, state,
            CASE when state = 1 THEN 'OPEN'
                when state = 2 THEN 'VISITED'
                when state = 3 THEN 'CLOSED' 
                when state = 4 THEN 'CANCELLED'
            END STATE_DESC 
            , location_ent_id, location.name AS 'location_name', calendar.notes, final_notes, calendar.seg_id, specialty.descr AS 'specialty_name'
            FROM calendar, Entity location, SegmentoEntidade specialty
            WHERE location.ent_id = calendar.location_ent_id AND specialty.seg_id = calendar.seg_id";
        $stmt = sqlsrv_query($conn, $sql);
        if ($stmt === false) {
            return;
        }
        $result = array();
        $index = 0;
        while ($row = sqlsrv_fetch_array($stmt)) {
            $obj["id"] = $row["cal_id"];
            $obj["title"] = $row["title"];
            $obj["startdate"] = $row["startdate"];
            $obj["enddate"] = $row["enddate"];
            $obj["allDay"] = $row["allDay"];
            $obj["state"] = $row["state"];
            $obj["stateDesc"] = $row["STATE_DESC"];
            $obj["contacts"] = DBCalendar::getVisitContacts($conn, $row["cal_id"]);
            $obj["location_ent_id"] = $row["location_ent_id"];
            $obj["location_name"] = $row["location_name"];
            $obj["specialty_id"] = $row["seg_id"];
            $obj["specialty_name"] = $row["specialty_name"];
            $obj["notes"] = $row["notes"];
            $obj["final_notes"] = $row["final_notes"];
            $obj["noteparam"] = DBCalendar::getMeetingNotes($conn, $row["cal_id"]);
            $result[$index++] = $obj;
        }
        sqlsrv_free_stmt($stmt);
        return $result;
    }

    static function getMeetingNoteProducts($conn, $cal_id, $note_id) {
        if (!$conn) {
            return false;
        }
        $sql = "SELECT product.prod_id, product.prod_name, calendar_note_products.notes FROM calendar_note_products, product 
                WHERE calendar_note_products.note_id = " . $note_id . " AND calendar_note_products.cal_id = " . $cal_id . " AND product.prod_id = calendar_note_products.prod_id";
        $stmt = sqlsrv_query($conn, $sql);
        if ($stmt === false) {
            return;
        }
        $result = array();
        $index = 0;
        while ($row = sqlsrv_fetch_array($stmt)) {
            $obj["id"] = $row["prod_id"];
            $obj["name"] = $row["prod_name"];
            $obj["notes"] = $row["notes"];
            $result[$index++] = $obj;
        }
        sqlsrv_free_stmt($stmt);
        return $result;
    }

    static function getMeetingNotes($conn, $cal_id) {
        if (!$conn) {
            return false;
        }
        $sql = "SELECT note_id,final_startdate, final_enddate, final_notes FROM calendar_note WHERE cal_id = " . $cal_id . "";
        $stmt = sqlsrv_query($conn, $sql);
        if ($stmt === false) {
            return;
        }
        $result = array();
        $index = 0;
        while ($row = sqlsrv_fetch_array($stmt)) {
            $obj["final_startdate"] = $row["final_startdate"];
            $obj["final_enddate"] = $row["final_enddate"];
            $obj["final_notes"] = $row["final_notes"];
            $obj["products"] = DBCalendar::getMeetingNoteProducts($conn, $cal_id, $row["note_id"]);
            $obj["contacts"] = DBCalendar::getMeetingNoteContacts($conn, $cal_id, $row["note_id"]);
            $result[$index++] = $obj;
        }
        sqlsrv_free_stmt($stmt);
        return $result;
    }

    static function getEntitiesByEntityType($conn, $param, $isContact) {
        if (!$conn) {
            return false;
        }
        $sql = "SELECT ent_id, name, nif FROM Entity WHERE active = 1";
        if (!empty($param["q"]) && strlen($param["q"]) > 0) {
            $sql .= " AND name LIKE '%" . $param["q"] . "%'";
        }
        if (!empty($param["id"]) && strlen($param["id"]) > 0) {
            $sql .= " AND ent_id IN (" . $param["id"] . ")";
        }
        if ($isContact) {
            $sql .= " AND enttype_id = 'HP'";
        } else {
            $sql .= " AND enttype_id <> 'HP'";
        }
        $sql .=" order by ent_id asc";
        if (!empty($param["page"]) && strlen($param["page"]) > 0 && is_numeric($param["page"])) {
            $sql .=" OFFSET " . (intval($param["page"]) - 1) * 10 . " ROWS FETCH NEXT 10 ROWS ONLY";
        }
        $stmt = sqlsrv_query($conn, $sql);
        if ($stmt === false) {
            return;
        }
        $result = array();
        $index = 0;
        while ($row = sqlsrv_fetch_array($stmt)) {
            $obj["id"] = $row["ent_id"];
            $obj["name"] = $row["name"];
            $obj["nif"] = $row["nif"];
            $result[$index++] = $obj;
        }
        sqlsrv_free_stmt($stmt);
        return $result;
    }

    static function getAllProducts($conn, $param) {
        if (!$conn) {
            return false;
        }
        $sql = "SELECT prod_id,prod_name FROM product WHERE 1=1";
        if (!empty($param["q"]) && strlen($param["q"]) > 0) {
            $sql .= " AND prod_name LIKE '%" . $param["q"] . "%'";
        }
        $sql .=" order by prod_id asc";
        if (!empty($param["page"]) && strlen($param["page"]) > 0 && is_numeric($param["page"])) {
            $sql .=" OFFSET " . (intval($param["page"]) - 1) * 10 . " ROWS FETCH NEXT 10 ROWS ONLY";
        }
        $stmt = sqlsrv_query($conn, $sql);
        if ($stmt === false) {
            return;
        }
        $result = array();
        $index = 0;
        while ($row = sqlsrv_fetch_array($stmt)) {
            $obj["id"] = $row["prod_id"];
            $obj["name"] = $row["prod_name"];
            $result[$index++] = $obj;
        }
        sqlsrv_free_stmt($stmt);
        return $result;
    }

    static function saveMeetingNotes($conn, $cal_id, $param) {
        if (!$conn) {
            return false;
        }
        $sql = "INSERT INTO calendar_note (cal_id,final_startdate,final_enddate,final_notes) values(?,?,?,?); SELECT SCOPE_IDENTITY()";
        $result = sqlsrv_query($conn, $sql, array(&$cal_id, &$param["final_startdate"], &$param["final_enddate"], &$param["final_notes"]));
        sqlsrv_next_result($result);
        sqlsrv_fetch($result);
        return sqlsrv_get_field($result, 0);
    }

    static function deleteMeetingNotes($conn, $cal_id) {
        if (!$conn) {
            return false;
        }
        $sql = "DELETE FROM calendar_note WHERE cal_id=?";
        if (sqlsrv_query($conn, $sql, array(&$cal_id))) {
            return true;
        }
        return false;
    }

    static function saveMeetingNoteProducts($conn, $cal_id, $note_id, $prodList) {
        if (!$conn) {
            return false;
        }
        $sql = null;
        foreach ($prodList as $product) {
            foreach ($product as $key => $value) {
                $param[$key] = $value;
            }
            $sql .= "INSERT INTO calendar_note_products (cal_id,note_id,prod_id,notes) values('" . $cal_id . "','" . $note_id . "','" . $param["id"] . "','" . $param["notes"] . "');";
        }
        if (sqlsrv_query($conn, $sql)) {
            return true;
        }
        return false;
    }

    static function deleteMeetingNoteProducts($conn, $cal_id) {
        if (!$conn) {
            return false;
        }
        $sql = "DELETE FROM calendar_note_products WHERE cal_id=?";
        if (sqlsrv_query($conn, $sql, array(&$cal_id))) {
            return true;
        }
        return false;
    }

    static function deleteCalendarProductsByCalendarID($conn, $calId) {
        if (!$conn) {
            return false;
        }
        $sql = "DELETE FROM calendar_products WHERE cal_id=?";
        if (sqlsrv_query($conn, $sql, array(&$calId))) {
            return true;
        }
        return false;
    }

    static function saveMeetingNoteContacts($conn, $cal_id, $note_id, $contactList) {
        if (!$conn) {
            return false;
        }
        $sql = null;
        foreach ($contactList as $id) {
            $sql .= "INSERT INTO calendar_note_contacts (cal_id,note_id,ent_id) values('" . $cal_id . "','" . $note_id . "','" . $id . "');";
        }
        if (sqlsrv_query($conn, $sql)) {
            return true;
        }
        return false;
    }

    static function deleteMeetingNoteContacts($conn, $cal_id) {
        if (!$conn) {
            return false;
        }
        $sql = "DELETE FROM calendar_note_contacts WHERE cal_id=?";
        if (sqlsrv_query($conn, $sql, array(&$cal_id))) {
            return true;
        }
        return false;
    }

    static function getMeetingNoteContacts($conn, $cal_id, $note_id) {
        if (!$conn) {
            return false;
        }
        $sql = "SELECT contact.ent_id, contact.name FROM calendar_note_contacts, Entity contact 
                WHERE contact.ent_id = calendar_note_contacts.ent_id AND calendar_note_contacts.note_id = " . $note_id . " AND calendar_note_contacts.cal_id = " . $cal_id;
        $stmt = sqlsrv_query($conn, $sql);
        if ($stmt === false) {
            return;
        }
        $result = array();
        $index = 0;
        while ($row = sqlsrv_fetch_array($stmt)) {
            $obj["id"] = $row["ent_id"];
            $obj["name"] = $row["name"];
            $result[$index++] = $obj;
        }
        sqlsrv_free_stmt($stmt);
        return $result;
    }

    static function saveCalendarContacts($conn, $calId, $param) {
        if (!$conn) {
            return false;
        }
        $sql = null;
        foreach (explode(",", $param["contact"]) as $id) {
            $sql .= "INSERT INTO calendar_contacts (cal_id,ent_id) values('" . $calId . "','" . $id . "');";
        }
        if (sqlsrv_query($conn, $sql)) {
            return true;
        }
        return false;
    }

    static function deleteCalendarContacts($conn, $calId) {
        if (!$conn) {
            return false;
        }
        $sql = "DELETE FROM calendar_contacts WHERE cal_id=?";
        if (sqlsrv_query($conn, $sql, array(&$calId))) {
            return true;
        }
        return false;
    }

    static function getVisitContacts($conn, $cal_id) {
        if (!$conn) {
            return false;
        }
        $sql = "SELECT contact.ent_id, contact.name FROM calendar_contacts, Entity contact 
                WHERE contact.ent_id = calendar_contacts.ent_id AND calendar_contacts.cal_id = " . $cal_id;
        $stmt = sqlsrv_query($conn, $sql);
        if ($stmt === false) {
            return;
        }
        $result = array();
        $index = 0;
        while ($row = sqlsrv_fetch_array($stmt)) {
            $obj["id"] = $row["ent_id"];
            $obj["name"] = $row["name"];
            $result[$index++] = $obj;
        }
        sqlsrv_free_stmt($stmt);
        return $result;
    }

    static function getSpecialties($conn, $param) {
        if (!$conn) {
            return false;
        }
        $sql = "SELECT seg_id,descr FROM SegmentoEntidade WHERE ativo=1";
        if (!empty($param["q"]) && strlen($param["q"]) > 0) {
            $sql .= " AND prod_name LIKE '%" . $param["q"] . "%'";
        }
        $sql .=" order by indice asc";
        if (!empty($param["page"]) && strlen($param["page"]) > 0 && is_numeric($param["page"])) {
            $sql .=" OFFSET " . (intval($param["page"]) - 1) * 10 . " ROWS FETCH NEXT 10 ROWS ONLY";
        }
        $stmt = sqlsrv_query($conn, $sql);
        if ($stmt === false) {
            return;
        }
        $result = array();
        $index = 0;
        while ($row = sqlsrv_fetch_array($stmt)) {
            $obj["id"] = $row["seg_id"];
            $obj["name"] = $row["descr"];
            $result[$index++] = $obj;
        }
        sqlsrv_free_stmt($stmt);
        return $result;
    }

}
