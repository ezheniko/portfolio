<?php
/* Основные настройки */
$host = 'localhost';
define('DB_LOGIN', "root");
define('DB_PASSWORD', "111");
$db_name = "portfolio";
$dbh = new PDO("mysql:host=$host;dbname=$db_name", DB_LOGIN, DB_PASSWORD);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $clientParam = json_decode(file_get_contents('php://input'), true);
  // print_r($clientParam);
  // echo isset($clientParam['startPosition']);
  // if (empty($clientParam['amount']) || isset($clientParam['startPosition'])) {
  //   echo 'invalid data';
  //   return;
  // }

  $data = [
    'data' => [],
    'amount' => []
  ];

  $sth = $dbh->query("select COUNT(*) from comments");
  $data['amount'] = $sth->fetchAll(PDO::FETCH_COLUMN, 0);
  $data['amount'][0] = (int)$data['amount'][0];

  $amount = $clientParam['amount'];
  $current = $data['amount'][0] - $clientParam['startPosition'] - $amount;
  if ($current < 0) {
    $amount += $current;
    $current = 0;
  }

  $amount = abs($amount);
  $sth = $dbh->query("SELECT c.text, c.time, c.autor FROM comments c LIMIT {$current}, {$amount}");
  $data['data'] = $sth->fetchAll(PDO::FETCH_ASSOC);
  $data['data'] = array_reverse($data['data']);
  //время сделать int

  $sth = null;
  $dbh = null;

  echo json_encode($data);
  return;
}
