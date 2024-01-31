<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\SUpport\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_category', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->timestamps();
        });

        DB::table('event_category')->insert([
            ['category' => 'Sport events'],
            ['category' => 'Festivals'],
            ['category' => 'Concerts'],
            // Add more categories as needed
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
