<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

*/

Route::post('auth/login', [AuthController::class, 'login'])->name('auth.login');
Route::post('auth/register', [AuthController::class, 'register'])->name('auth.register');
Route::post('auth/subscribe', [AuthController::class, 'subscribe'])->name('auth.subscribe');
Route::post('auth/desubscribe', [AuthController::class, 'desubscribe'])->name('auth.desubscribe');
Route::post('auth/update', [AuthController::class, 'update'])->name('auth.update');
Route::get('auth/info/{id}/{user}', [AuthController::class, 'info'])->name('auth.info');

Route::get('video/index', [VideoController::class, 'index'])->name('video.index');
Route::get('video/subscriptions/{id}', [VideoController::class, 'subscriptions'])->name('video.subscriptions');
Route::get('video/watch/{id}/{user}', [VideoController::class, 'watch'])->name('video.watch');
Route::get('video/stream/{id}', [VideoController::class, 'stream'])->name('video.stream');
Route::post('video/upload', [VideoController::class, 'upload'])->name('video.upload');
Route::post('video/query', [VideoController::class, 'query'])->name('video.query');
Route::post('video/like', [VideoController::class, 'like'])->name('video.like');
Route::post('video/dislike', [VideoController::class, 'dislike'])->name('video.dislike');
Route::post('video/update', [VideoController::class, 'update'])->name('video.update');
Route::post('video/delete', [VideoController::class, 'delete'])->name('video.delete');

Route::post('comment/publish', [CommentController::class, 'publish'])->name('comment.publish');
Route::post('comment/like', [CommentController::class, 'like'])->name('comment.like');
Route::post('comment/dislike', [CommentController::class, 'dislike'])->name('comment.dislike');
Route::post('comment/delete', [CommentController::class, 'delete'])->name('comment.delete');
