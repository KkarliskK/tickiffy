<?php

namespace Stripe;

class StripeClient
{
    public $paymentIntents;

    /**
     * @param mixed $stripeSecretKey
     */
    public function __construct(mixed $stripeSecretKey)
    {
    }
}
