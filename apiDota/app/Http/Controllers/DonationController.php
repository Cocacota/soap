<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use MercadoPago\Preference;
use MercadoPago\Item;
use MercadoPago\Payer;
use MercadoPago\SDK;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\Exceptions\MPApiException;

class DonationController extends Controller
{
    /**
     * Configura el token de acceso de Mercado Pago y el entorno de prueba
     */
    protected function authenticate()
    {
        $mpAccessToken = config('services.mercadopago.access_token');
        MercadoPagoConfig::setAccessToken($mpAccessToken);

        // Opcional: Configura el entorno a LOCAL para pruebas
//        MercadoPagoConfig::setRuntimeEnvironment(MercadoPagoConfig::LOCAL);
    }

    /**
     * Crea la solicitud de preferencia para el cliente
     */
    private function createPreferenceRequest(array $items, array $payer): array
    {
        $paymentMethods = [
            'excluded_payment_methods' => [],
            'installments' => 12,
            'default_installments' => 1,
        ];

        $backUrls = [
            'success' => route('mercadopago.success'),
            'failure' => route('mercadopago.failure'),
        ];

        return [
            'items' => $items,
            'payer' => $payer,
            'payment_methods' => $paymentMethods,
            'back_urls' => $backUrls,
            'statement_descriptor' => 'DONACION ORGANIZACION',
            'external_reference' => uniqid(), // Referencia única
            'expires' => false,
            'auto_return' => 'approved',
        ];
    }

    public function showForm()
    {
        return Inertia::render('donation/DonationForm');
    }

    /**
     * Crea una nueva preferencia de pago en Mercado Pago
     */
    public function createDonationPreference(Request $request)
    {
        // Autentica Mercado Pago
        $this->authenticate();

        // Validar monto ingresado
        $request->validate(['amount' => 'required|numeric|min:1']);

        // Crear el ítem de la donación con el monto ingresado
        $donationItem = [
            'title' => 'Donación',
            'quantity' => 1,
            'currency_id' => 'USD',
            'unit_price' => (float)$request->input('amount'),
        ];

        // Configurar datos del donante
        $payer = [
            'name' => 'Donante',
            'surname' => '',
            'email' => 'donante@ejemplo.com', // Usa un correo de prueba o del usuario logueado
        ];

        // Crear el objeto de solicitud para la preferencia de pago
        $preferenceRequest = $this->createPreferenceRequest([$donationItem], $payer);

        // Crear el cliente de preferencias y enviar la solicitud
        $client = new PreferenceClient();
        try {
            $preference = $client->create($preferenceRequest);
    
            // Redirigir a la URL de pago de Mercado Pago desde el backend
            return redirect()->away($preference->init_point); // Cambiado a redirección desde el backend
        } catch (MPApiException $error) {
            // Manejar el error según tus necesidades
            return back()->withErrors(['error' => 'Hubo un problema al procesar la donación.']);
        }
    }

    /**
     * Página de éxito de la donación
     */
    public function success()
    {
        return Inertia::render('donation/DonationSuccess');
    }

    /**
     * Página de fallo de la donación
     */
    public function failure()
    {
        return Inertia::render('donation/DonationFailure');
    }
}
