<?php
/* Основные настройки */
$host = 'localhost';
define('DB_LOGIN', "root");
define('DB_PASSWORD', "111");
$db_name = "portfolio";
$dbh = new PDO("mysql:host=$host;dbname=$db_name", DB_LOGIN, DB_PASSWORD);

switch ($_GET["section"]) {

  case "about":

    $sth = $dbh->query("SELECT i.src FROM images i WHERE section = \"about\" UNION SELECT a.paragraph FROM about a");
    
    $data = $sth->fetchAll(PDO::FETCH_COLUMN, 0);
    
    $sth = null;
    $dbh = null;
    echo json_encode($data);  
    break;

  case "career":

    $sth = $dbh->query("SELECT c.company_name, c.position, c.time FROM career c UNION SELECT i.src, i.section, i.name FROM images i WHERE section=\"career\"");
      
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    
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
