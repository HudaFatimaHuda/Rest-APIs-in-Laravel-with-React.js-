<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIController;
use App\Http\Controllers\ApiAuthController;
// use App\Http\Controllers\ProfileController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('auth:api')->group(function(){
    Route::get('users', [APIController::class, 'index']);
    Route::get('users/{id}', [APIController::class, 'show']);
    Route::post('users', [APIController::class, 'store']);
    Route::put('users/{id}', [APIController::class, 'update']);
    Route::delete('users/{id}', [APIController::class, 'destroy']);
    Route::post('logout', [ApiAuthController::class, 'logout']);
// });


// Route::get('/profile', [ProfileController::class, 'edit']);
Route::post('register', [ApiAuthController::class, 'register']);
Route::post('login', [ApiAuthController::class, 'login']);
