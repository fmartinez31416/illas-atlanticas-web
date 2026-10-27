<?php
// Club Illas Atlánticas — alta de socio (19-oct-2026)
// Los datos llegan al buzón propio (info@). Sin terceros, sin cookies.
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://illasatlanticasatico.es');
header('Access-Control-Allow-Methods: POST, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['ok' => false, 'error' => 'metodo']); exit; }

$nombre   = trim($_POST['nombre'] ?? '');
$email    = trim($_POST['email'] ?? '');
$estancia = trim($_POST['estancia'] ?? '');
$web      = trim($_POST['web'] ?? ''); // honeypot: un humano nunca lo rellena
$consent  = ($_POST['consent'] ?? '') === 'si';

if ($web !== '' || $nombre === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || mb_strlen($nombre) > 80 || mb_strlen($estancia) > 60 || !$consent) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'validacion']);
  exit;
}

$socio = str_pad((string) random_int(0, 9999), 4, '0', STR_PAD_LEFT) . strtoupper(substr(md5(strtolower($email) . date('Ymd')), 0, 2));

$cabeceras = "From: Club Illas Atlánticas <no-reply@illasatlanticasatico.es>\r\n"
           . "Content-Type: text/plain; charset=UTF-8\r\n"
           . "X-Mailer: PHP/" . phpversion();

$asunto = "[CLUB] Alta: $nombre ($socio)";
$cuerpo = "Nombre: $nombre\nEmail: $email\nEstancia: $estancia\nSocio nº: $socio\n"
        . "Fecha alta: " . date('d-m-Y H:i') . " (servidor)\n"
        . "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'desconocida') . "\n"
        . "Origen: " . ($_SERVER['HTTP_REFERER'] ?? 'directo') . "\n";
mail('info@illasatlanticasatico.es', $asunto, $cuerpo, $cabeceras);

$asuntoB = 'Bienvenido al Club Illas Atlánticas';
$cuerpoB = "Hola $nombre,\n\n"
  . "Gracias por registrarte. El Club Illas Atlánticas está en preparación:\n"
  . "lo estamos terminando con mimo para que sea una ventaja de verdad.\n\n"
  . "En cuanto esté abierto, serás de los primeros en saberlo y tendrás\n"
  . "tu plaza reservada.\n\n"
  . "Mientras tanto, lo que sí está activo es el Pacto Directo: reserva en\n"
  . "illasatlanticasatico.es, sin intermediarios, con la atención personal\n"
  . "de Fernando.\n\n"
  . "Atentamente,\nFernando\nIllas Atlánticas Ático · Aguiño (Ribeira)";
mail($email, $asuntoB, $cuerpoB, $cabeceras);

echo json_encode(['ok' => true, 'socio' => $socio]);
