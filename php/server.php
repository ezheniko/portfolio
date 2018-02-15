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
      'images' => [
        'army' => [],
        'company' => [],
        'pmr' => [],
        'artel' => [],
        'bighome' => [],
      ],
      'career' => [],
    ];
    $sth = $dbh->query("SELECT src FROM images WHERE subsection=\"artel\"");
    $data['images']['artel'] = $sth->fetchAll(PDO::FETCH_COLUMN, 0);
    $sth = $dbh->query("SELECT src FROM images WHERE subsection=\"army\"");
    $data['images']['army'] = $sth->fetchAll(PDO::FETCH_COLUMN, 0);
    $sth = $dbh->query("SELECT src FROM images WHERE subsection=\"pmr\"");
    $data['images']['pmr'] = $sth->fetchAll(PDO::FETCH_COLUMN, 0);
    $sth = $dbh->query("SELECT src FROM images WHERE subsection=\"bighome\"");
    $data['images']['bighome'] = $sth->fetchAll(PDO::FETCH_COLUMN, 0);
    $sth = $dbh->query("SELECT src FROM images WHERE subsection=\"company\"");
    $data['images']['company'] = $sth->fetchAll(PDO::FETCH_COLUMN, 0);

    $sth = $dbh->query("SELECT company_name, position, time, dataset FROM career");
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
