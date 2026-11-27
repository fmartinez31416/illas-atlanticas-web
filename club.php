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

$asuntoB = 'Bienvenido al Club Illas Atlánticas · tu código del 5 %';
$cuerpoB = "Hola $nombre,\n\n"
  . "Bienvenido al Club Illas Atlánticas. Ya eres socio.\n\n"
  . "TU CÓDIGO DEL 5 %: CLUB5\n"
  . "Úsalo en tu primera reserva directa: en illasatlanticasatico.es,\n"
  . "pega CLUB5 en el campo Voucher y el precio baja un 5 % al instante.\n"
  . "Es tuyo desde ya, sin más condiciones.\n\n"
  . "Y el club sigue trabajando para ti: por cada amigo que reserve por\n"
  . "recomendación tuya y complete su estancia, ganas el 10 % del valor\n"
  . "de su reserva en crédito para tus próximas estancias. Sin tope de\n"
  . "amigos ni de créditos. Los créditos caducan a los 24 meses y no se\n"
  . "combinan con el descuento de estancias largas.\n\n"
  . "Para recomendar a un amigo: que diga tu nombre al reservar en la\n"
  . "web, o escríbeme un correo con su nombre. Yo asigno tu crédito\n"
  . "cuando su estancia se completa.\n\n"
  . "Atentamente,\nFernando\n"
  . "Illas Atlánticas Ático · Aguiño (Ribeira)\n"
  . "Tus datos se tratan solo para gestionar tu participación en el club\n"
  . "(RGPD); puedes pedir su supresión respondiendo a este correo.";
mail($email, $asuntoB, $cuerpoB, $cabeceras);

echo json_encode(['ok' => true, 'socio' => $socio]);
