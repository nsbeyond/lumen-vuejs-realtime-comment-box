<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', ['uses' => 'MainController@index', 'as' => 'index']);

$app->get('api/comment', 'CommentController@index');
$app->post('api/comment', 'CommentController@store');
$app->delete('api/comment/{id}', 'CommentController@destroy');