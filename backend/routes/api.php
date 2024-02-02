<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TicketsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/user', [AuthController::class, 'create']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/status', [AuthController::class, 'status']);
Route::get('/categories', [CategoriesController::class, 'select']);
Route::post('/categories/create', [CategoriesController::class, 'create']);
Route::post('/event/create', [EventController::class, 'create']);
Route::get('/event/showbycat/{id}', [EventController::class, 'showByCategory']);
Route::delete('/event/delete/{id}', [EventController::class, 'delete']);
Route::get('/event/update/{id}', [EventController::class, 'getUpdate']);
Route::get('/home/random', [EventController::class, 'getRandom']);
Route::get('/event/single/{id}', [EventController::class, 'select']);
Route::post('/event/{eventId}/ticket/create', [TicketsController::class, 'create']);
Route::get('/event/ticket/{id}', [TicketsController::class, 'select']);
Route::put('/event/{eventId}/ticket/{id}', [TicketsController::class, 'change']);

