<?php

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

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

Route::get("/todo", function () {
    return Todo::all();
});

Route::post("/todo", function () {
    request()->validate(["description" => "required"]);

    return Todo::create(['description' => request('description')]);
});

Route::put("/todo/{todo}", function (Todo $todo) {
    request()->validate(["description" => "required"]);

    $todo->update([
        "description" => request("description"),
    ]);
});

Route::delete("/todo/{todo}", function (Todo $todo) {
    $todo->delete();

    DB::statement("SELECT SETVAL('todos_id_seq', (SELECT COALESCE(MAX(id),1) FROM todos));"); //reset id_autoincrement after a delete
});
