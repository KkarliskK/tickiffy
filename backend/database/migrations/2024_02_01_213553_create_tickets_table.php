<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Event;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Event::class)->constrained()->cascadeOnDelete();
            $table->string('ticket');
            $table->decimal('ticket_price', 6, 2);
            $table->integer('quantity');
            $table->timestamps();
        });

        DB::table('tickets')->insert([
            [
                'event_id' => '1',
                'ticket' => '2 day ticket',
                'ticket_price' => '69.99',
                'quantity' => '100',
            ],
            [
                'event_id' => '2',
                'ticket' => 'Entry ticket.',
                'ticket_price' => '15',
                'quantity' => '1000',
            ],
            [
                'event_id' => '3',
                'ticket' => 'VIP ticket.',
                'ticket_price' => '20',
                'quantity' => '1500',
            ],
            [
                'event_id' => '4',
                'ticket' => 'Seat ticket.',
                'ticket_price' => '25',
                'quantity' => '150',
            ],
            [
                'event_id' => '5',
                'ticket' => 'Standart ticket.',
                'ticket_price' => '29.99',
                'quantity' => '250',
            ],
            [
                'event_id' => '6',
                'ticket' => 'Standart ticket.',
                'ticket_price' => '29.99',
                'quantity' => '250',
            ],
            [
                'event_id' => '6',
                'ticket' => 'VIP ticket.',
                'ticket_price' => '59.99',
                'quantity' => '50',
            ],
            [
                'event_id' => '7',
                'ticket' => 'Standart ticket.',
                'ticket_price' => '29.99',
                'quantity' => '250',
            ],
            [
                'event_id' => '8',
                'ticket' => 'Standart ticket.',
                'ticket_price' => '19.99',
                'quantity' => '250',
            ],
            [
                'event_id' => '9',
                'ticket' => 'Standart ticket.',
                'ticket_price' => '49.99',
                'quantity' => '250',
            ],
            [
                'event_id' => '10',
                'ticket' => 'Standart ticket.',
                'ticket_price' => '69.99',
                'quantity' => '250',
            ]

        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
