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
  . "Bienvenido al Club Illas Atlánticas. Tu tarjeta de socio es el nivel Básico, "
  . "que se obtiene solo con registrarse: 5 % GARANTIZADO en tu primera reserva directa. "
  . "Para aplicarlo, introduce tu código de socio en el campo Voucher del motor de reservas.\n\n"
  . "Tu código de socio: CLUB5\n"
  . "Tu número de tarjeta: $socio\n\n"
  . "Además: acceso anticipado a las fechas de verano y contenido exclusivo de la casa.\n\n"
  . "Y el motor del club: por cada amigo que reserve por recomendación tuya y complete "
  . "su estancia, ganas un 10 % (acumulable hasta el 30 %) en tu próxima reserva directa.\n\n"
  . "Todo en illasatlanticasatico.es/club\n\n"
  . "Atentamente,\nFernando\nIllas Atlánticas Ático · Aguiño (Ribeira)";
mail($email, $asuntoB, $cuerpoB, $cabeceras);

echo json_encode(['ok' => true, 'socio' => $socio]);
