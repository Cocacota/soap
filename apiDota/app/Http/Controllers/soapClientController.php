<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

class SoapClientController extends Controller
{
    public function showHistory($userId)
    {
        return Inertia::render('matchs/historyMatch', ['userId' => $userId]);
    }

    public function showHero($hero)
    {
        return Inertia::render('matchs/heroMatch', ['hero' => $hero]);
    }

    public function getMatchHistory($userId){

    
    $url = "http://localhost/soap/soap-server.php";

        // Crear el cuerpo de la solicitud SOAP en XML
        $xmlRequest = <<<XML
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:soap="http://localhost/soap">
   <soapenv:Header/>
   <soapenv:Body>
      <soap:getMatchHistory>
         <soap:userId>{$userId}</soap:userId>
      </soap:getMatchHistory>
   </soapenv:Body>
</soapenv:Envelope>
XML;

        // Inicializar cURL
        $ch = curl_init();

        // Configurar opciones de cURL para la solicitud
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: text/xml",           // Tipo de contenido XML
            "SOAPAction: http://localhost/soap#getMatchHistory" // Acción SOAP, debe coincidir con la definición en el WSDL
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlRequest);

        // Ejecutar la solicitud y obtener la respuesta
        $response = curl_exec($ch);

        // Manejar errores de cURL
        if (curl_errno($ch)) {
            $error_msg = curl_error($ch);
            curl_close($ch);
            return response()->json(['error' => $error_msg], 500);
        }

        curl_close($ch);

        // Devolver la respuesta como XML o procesarla como JSON
        return response($response, 200)->header('Content-Type', 'application/xml');}
        
        

    public function getMatchHero($hero){

    
    $url = "http://localhost/soap/soap-server.php";

        // Crear el cuerpo de la solicitud SOAP en XML
        $xmlRequest = <<<XML
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:soap="http://localhost/soap">
   <soapenv:Header/>
   <soapenv:Body>
      <soap:getMatchsWithHero>
         <soap:hero>{$hero}</soap:hero>
      </soap:getMatchsWithHero>
   </soapenv:Body>
</soapenv:Envelope>
XML;

        // Inicializar cURL
        $ch = curl_init();

        // Configurar opciones de cURL para la solicitud
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: text/xml",           // Tipo de contenido XML
            "SOAPAction: http://localhost/soap#getMatchsWithHero " // Acción SOAP, debe coincidir con la definición en el WSDL
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlRequest);

        // Ejecutar la solicitud y obtener la respuesta
        $response = curl_exec($ch);

        // Manejar errores de cURL
        if (curl_errno($ch)) {
            $error_msg = curl_error($ch);
            curl_close($ch);
            return response()->json(['error' => $error_msg], 500);
        }

        curl_close($ch);

        // Devolver la respuesta como XML o procesarla como JSON
        return response($response, 200)->header('Content-Type', 'application/xml');
}
}


