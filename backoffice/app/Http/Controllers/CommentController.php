<?php

namespace App\Http\Controllers;

use App\Comment;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class CommentController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function index()
    {
        return response()->json(Comment::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $author = $request->input('author');
        $text = $request->input('text');
        if (isset($text) && isset($author))
            return response()->json(Comment::create($request->all()));
        else
            return response()->json('error');
    }

    public function destroy($id)
    {
        return response()->json(Comment::destroy($id));
    }
}