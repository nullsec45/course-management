<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VideoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('/membership', [HomeController::class, 'membership'])->name('membership');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/membership/checkout/{id}', [HomeController::class, 'checkoutPage'])->name('membership.checkout');
    Route::post('/membership/process', [HomeController::class, 'processCheckout'])->name('membership.process');


    Route::prefix('dashboard')->name('dashboard.')->group(function () {


        Route::get('/', [DashboardController::class, 'index'])->name('index');

        Route::middleware('role:Admin')->controller(UserController::class)
            ->prefix('users')
            ->name('users.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/{id}/edit', 'edit')->name('edit');
                Route::get('/create', 'create')->name('create');
                Route::post('/store', 'store')->name('store');
                Route::put('/{id}', 'update')->name('update');
                Route::delete('/{id}', 'destroy')->name('destroy');
            });



        Route::middleware('role:Admin')->controller(MembershipController::class)
            ->prefix('memberships')
            ->name('memberships.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/create', 'create')->name('create');
                Route::get('/{id}/show', 'show')->name('show');
                Route::post('/store', 'store')->name('store');
                Route::get('/{id}/edit', 'edit')->name('edit');
                Route::put('/{id}', 'update')->name('update');
                Route::delete('/{id}', 'destroy')->name('destroy');
            });

        Route::middleware('role:Admin')->controller(CategoryController::class)
            ->prefix('categories')
            ->name('categories.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/{id}/show', 'show')->name('show');
                Route::get('/create', 'create')->name('create');
                Route::post('/store', 'store')->name('store');
                Route::get('/{id}/edit', 'edit')->name('edit');
                Route::put('/{id}', 'update')->name('update');
                Route::delete('/{id}', 'destroy')->name('destroy');
            });

        Route::controller(ArticleController::class)
            ->prefix('articles')
            ->name('articles.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/{id}/show', 'show')->name('show');

                Route::middleware('role:Admin,Author')->group(function () {
                    Route::get('/create', 'create')->name('create');
                    Route::post('/store', 'store')->name('store');
                    Route::get('/{id}/edit', 'edit')->name('edit');
                    Route::put('/{id}', 'update')->name('update');
                    Route::delete('/{id}', 'destroy')->name('destroy');
                });
            });

        Route::controller(VideoController::class)
            ->prefix('videos')
            ->name('videos.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/{id}/show', 'show')->name('show');

                Route::middleware('role:Admin,Author')->group(function () {
                    Route::get('/create', 'create')->name('create');
                    Route::post('/store', 'store')->name('store');
                    Route::get('/{id}/edit', 'edit')->name('edit');
                    Route::put('/{id}', 'update')->name('update');
                    Route::delete('/{id}', 'destroy')->name('destroy');
                });
            });
    });
});

require __DIR__ . '/auth.php';
