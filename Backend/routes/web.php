<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\DB;


Route::get('/', function () {
    return view('welcome');
});

// Route for displaying the dashboard view with users data
Route::get('/dashboard',  [UserController::class, 'index'] )->middleware(['auth', 'verified'])->name('dashboard');

// Resource routes for the UserController
Route::resource('/users', UserController::class)->middleware(['auth', 'verified']);



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
