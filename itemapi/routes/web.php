<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemsController;
use App\models\Item;



Route::resource('api/item', ItemsController::class);
