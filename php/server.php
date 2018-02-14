<?php
/* Основные настройки */
$host = 'localhost';
define('DB_LOGIN', "root");
define('DB_PASSWORD', "111");
$db_name = "portfolio";
$dbh = new PDO("mysql:host=$host;dbname=$db_name", DB_LOGIN, DB_PASSWORD);

switch ($_GET["section"]) {

  case "about":

    $data = [
      'images' => [],
      'about' => [],
    ];
    $sth = $dbh->query("SELECT src FROM images WHERE section=\"about\"");
    $data['images'] = $sth->fetchAll(PDO::FETCH_COLUMN, 0);

    $sth = $dbh->query("SELECT paragraph FROM about");
    $data['about'] = $sth->fetchAll(PDO::FETCH_COLUMN, 0);
    
    $sth = null;
    $dbh = null;
    echo json_encode($data);  
    break;

  case "career":

    $data = [
      'images' => [],
      'career' => [],
    ];
    $sth = $dbh->query("SELECT src FROM images WHERE section=\"career\"");
    $data['images'] = $sth->fetchAll(PDO::FETCH_COLUMN, 0);

    $sth = $dbh->query("SELECT company_name, position, time FROM career");
    $data['career'] = $sth->fetchAll(PDO::FETCH_ASSOC);

    $sth = null;
    $dbh = null;

    echo json_encode($data);
    break;
    
  case "portfolio":

    $sth = $dbh->query("SELECT p.link, i.src, p.name, p.about, p.type FROM portfolio p LEFT JOIN images i ON p.image_id = i.id");

    $data = $sth->fetchAll(PDO::FETCH_ASSOC);

    $sth = null;
    $dbh = null;
    echo json_encode($data);
    break;

  default:
    break;
}
