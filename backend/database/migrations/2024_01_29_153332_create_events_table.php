<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Categories;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('event');
            $table->string('description');
            $table->foreignIdFor(Categories::class)->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->time('time');
            $table->string('location');
            $table->string('img_url');
            $table->timestamps();
        });

        DB::table('events')->insert([
            [
                'event' => 'Positivus Festival',
                'description' => 'A three-day summer music and arts festival in Latvia.',
                'categories_id' => '2',
                'date' => '2024-07-15',
                'time' => '10:00:00',
                'location' => 'Salacgrīva, Latvia',
                'img_url' => 'https://www.positivusfestival.com/uploads/pos_webshareimg_1200x630px_28-06.png'
            ],
            [
                'event' => 'Riga Marathon',
                'description' => 'An annual road marathon competition hosted by the city of Riga, the capital of Latvia.',
                'categories_id' => '1',
                'date' => '2024-05-19',
                'time' => '08:00:00',
                'location' => 'Riga, Latvia',
                'img_url' => 'https://rimirigamarathon.com/wp-content/uploads/2023/05/R2U8810_fotoMikusKlavins-scaled-aspect-ratio-1920-1011-1-1440x1080.jpg'
            ],
            [
                'event' => 'Staro Rīga',
                'description' => 'Festival of Light that transforms Riga into a venue for outdoor exhibitions, showcasing installations by Latvian and foreign artists.',
                'categories_id' => '2',
                'date' => '2024-04-21',
                'time' => '18:00:00',
                'location' => 'Riga, Latvia',
                'img_url' => 'https://www.latvia.travel/sites/default/files/styles/mobile_promo/public/media_image/events/staro-riga-latvia-travel.jpg?itok=bYLephX8'
            ],
            [
                'event' => 'Latvian Song and Dance Festival',
                'description' => 'One of the largest amateur choral and dancing events in the world and an important event in Latvian culture and social life.',
                'categories_id' => '2',
                'date' => '2024-07-01',
                'time' => '10:00:00',
                'location' => 'Riga, Latvia',
                'img_url' => 'https://static.lsm.lv/media/2023/06/large/1/l372.jpg'
            ],
            [
                'event' => 'Riga Food',
                'description' => 'The biggest food industry fair in the Baltic countries, bringing together the best Latvian and foreign industry players.',
                'categories_id' => '2',
                'date' => '2024-09-05',
                'time' => '10:00:00',
                'location' => 'Riga, Latvia',
                'img_url' => 'https://sveba-dahlen.ee/wp-content/uploads/2023/08/Riga_Food_2023-1024x576-2.jpg'
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
