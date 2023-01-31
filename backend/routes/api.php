<?php

use App\Http\Controllers\API\AddressController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(UserController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::get('details/{id}', 'show');
    Route::post('details/{id}', 'update');
    Route::get('preferences/{id}', 'get_preferences');
    Route::post('preferences/{id}', 'update_preferences');
});

Route::group(['middleware' => 'api_validate'], function () {
    Route::resource('addresses', AddressController::class);
});
