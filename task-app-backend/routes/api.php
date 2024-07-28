<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\TaskController;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/register', [TaskController::class, 'Registration']);
Route::post('/login', [TaskController::class, 'Login']);
// Route::get('/index', [TaskController::class, 'Index'])->middleware('auth:sanctum');


Route::middleware(['auth:sanctum'])->group(function (){
    //All secure URL's here
    Route::post('/logout', [TaskController::class, 'Logout']);
    Route::get('/index', [TaskController::class, 'Index']);
    Route::post('/update-profile/{id}', [TaskController::class, 'UpdateProfile']);
    Route::get('/view-task/{id}', [TaskController::class, 'ListTask']);
    Route::post('/create-task', [TaskController::class, 'CreateTask']);
    Route::post('/update-task/{id}', [TaskController::class, 'UpdateTask']);
    Route::delete('/delete-task/{id}', [TaskController::class, 'DeleteTask']);
    Route::get('/task-status/{id}', [TaskController::class, 'TaskStatus']);
    Route::get('/view-task-status/{id}', [TaskController::class, 'ViewStatus']);
    Route::post('/filter-task/{option}', [TaskController::class, 'FilterTask']);
    Route::get('/task/{id}', [TaskController::class, 'Task']);


    Route::post('/add-comment/{taskid}', [CommentController::class, 'AddComment']);
    Route::post('/list-comment/{taskid}', [CommentController::class, 'ListComment']);

    
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
