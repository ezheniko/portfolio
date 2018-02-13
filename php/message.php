<?php
/* Основные настройки */
$host = 'localhost';
define('DB_LOGIN', "root");
define('DB_PASSWORD', "111");
$db_name = "portfolio";
$dbh = new PDO("mysql:host=$host;dbname=$db_name", DB_LOGIN, DB_PASSWORD);


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  if (empty($data['autor']) || empty($data['time']) || empty($data['text'])) {
    echo 'invalid data';
    return;
  }

  $autor = trim($data['autor']);
  $text = trim($data['text']);
  $time = trim($data['time']);

  $sth = $dbh->prepare("INSERT INTO comments(text, time, autor) VALUES(:text, :time, :autor)");
  $sth->bindParam(':text', $text, PDO::PARAM_STR);
  $sth->bindParam(':time', $time, PDO::PARAM_INT, 13);
  $sth->bindParam(':autor', $autor, PDO::PARAM_STR);
  $result = $sth->execute() ? 'true' : 'false';

  $sth = null;
  $dbh = null;
  echo $result;
  return;
}