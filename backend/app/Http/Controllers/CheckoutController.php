<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Validator;
use Stripe\StripeClient;



class CheckoutController extends Controller
{
    function create(){
        require_once '../vendor/autoload.php';

        $stripeSecretKey = env('STRIPE_SECRET');
        $stripe = new \Stripe\StripeClient($stripeSecretKey);



        function calculateOrderAmount(array $items): int {
            $totalPrice = 0;
            foreach ($items as $item) {
                $totalPrice += $item->ticket_price * $item->quantity;
            }
            // Stripe expects amounts in cents, so multiply by 100 and round
            return round($totalPrice * 100);
        }

        header('Content-Type: application/json');

        try {
            // retrieve JSON from POST body
            $jsonStr = file_get_contents('php://input');
            $jsonObj = json_decode($jsonStr);

            // Create a PaymentIntent with amount and currency
            $paymentIntent = $stripe->paymentIntents->create([
                'amount' => calculateOrderAmount($jsonObj->items),
                'currency' => 'eur',
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ]);

            $output = [
                'clientSecret' => $paymentIntent->client_secret,
            ];

            return response()->json($output);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
