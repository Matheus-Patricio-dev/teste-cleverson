<?php

$file = 'users.json';
$data = json_decode(file_get_contents($file), true);

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  if (isset($_GET['id'])) {
    foreach ($data as $user) {
      if ($user['id'] == $_GET['id']) {
        echo json_encode($user);
        exit;
      }
    }
  }
  echo json_encode($data);
}

if ($method === 'POST') {
  $input = json_decode(file_get_contents('php://input'), true);

  if ($input['id']) {
    foreach ($data as &$user) {
      if ($user['id'] == $input['id']) {
        $user = $input;
        break;
      }
    }
  } else {
    $input['id'] = time();
    $data[] = $input;
  }

  file_put_contents($file, json_encode($data));
}

if ($method === 'DELETE') {
  $input = json_decode(file_get_contents('php://input'), true);

  $data = array_filter($data, fn($u) => $u['id'] != $input['id']);

  file_put_contents($file, json_encode(array_values($data)));
}
