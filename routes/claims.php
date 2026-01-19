<?php

use App\Http\Controllers\ClaimController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Claims routes
    Route::prefix('claims')->group(function () {
        Route::get('/', [ClaimController::class, 'index'])->name('claims.index');
        Route::get('/create', [ClaimController::class, 'create'])->name('claims.create');
        Route::post('/', [ClaimController::class, 'store'])->name('claims.store');
        Route::get('/{claim}', [ClaimController::class, 'show'])->name('claims.show');
        Route::post('/{claim}/approve', [ClaimController::class, 'approve'])->name('claims.approve');
        Route::post('/{claim}/reject', [ClaimController::class, 'reject'])->name('claims.reject');
    });
});
