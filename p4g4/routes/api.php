<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// CATEGORY
Route::post('/category', [\App\Http\Controllers\categoriesController::class, 'createCategory']);
Route::get('/category', [\App\Http\Controllers\categoriesController::class, 'getAllCategory']);
Route::get('/category/{id}', [\App\Http\Controllers\categoriesController::class, 'getCategory']);
Route::put('/category/{id}', [\App\Http\Controllers\categoriesController::class, 'updateCategory']);
Route::delete('/category/{id}', [\App\Http\Controllers\categoriesController::class, 'deleteCategory']);

// SHOP
Route::post('/shop', [\App\Http\Controllers\shopsController::class, 'createShop']);
Route::get('/shop', [\App\Http\Controllers\shopsController::class, 'getAllShop']);
Route::get('/shop/{id}', [\App\Http\Controllers\shopsController::class, 'getShop']);
Route::put('/shop/{id}', [\App\Http\Controllers\shopsController::class, 'updateShop']);
Route::delete('/shop/{id}', [\App\Http\Controllers\shopsController::class, 'deleteShop']);



// PRODUCT
Route::post('/product', [\App\Http\Controllers\productsController::class, 'createProduct']);
Route::get('/product', [\App\Http\Controllers\productsController::class, 'getAllProduct']);
Route::get('/product/{id}', [\App\Http\Controllers\productsController::class, 'getProduct']);
Route::post('/product/{id}', [\App\Http\Controllers\productsController::class, 'updateProduct']);
Route::delete('/product/{id}', [\App\Http\Controllers\productsController::class, 'deleteProduct']);

Route::post('/prod-shop-cat', [\App\Http\Controllers\productsController::class, 'getByCat']);
Route::get('/prod-shop/{id}', [\App\Http\Controllers\productsController::class, 'getByShop']);
Route::get('/prod-shop-cat-join', [\App\Http\Controllers\productsController::class, 'getShopCat']);

// ADMIN
Route::post('/admin', [\App\Http\Controllers\adminsController::class, 'createAdmin']);
Route::get('/admin', [\App\Http\Controllers\adminsController::class, 'getAdmin']);
Route::put('/admin/{id}', [\App\Http\Controllers\adminsController::class, 'updateAdmin']);
Route::delete('/admin/{id}', [\App\Http\Controllers\adminsController::class, 'deleteAdmin']);
Route::get('/admin/{id}',[\App\Http\Controllers\adminsController::class,'getadminId']);

//Authentication
Route::post('/register', 'App\Http\Controllers\AuthController@register');
Route::post('/login','App\Http\Controllers\AuthController@login');
Route::post('/logout', 'App\Http\Controllers\AuthController@logout');
