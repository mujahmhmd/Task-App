<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function AddComment(Request $request, string $taskid){
        $validator = Validator::make($request->all(), [
            'comment' => 'required | string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed' ,
                'errors' => $validator->errors()
            ], 422);
        }
        $user = Auth()->user();
        $task = Task::find($taskid);
        $comment = Comment::create([
            'userid' => $user->id,
            'taskid' => $task->id,
            'comment' => $request->comment
            
        ]);
        return response()->json([
            'message' => 'Comment Successfully Added' ,
            'data' => $comment
        ], 200);
    }

    public function ListComment(Request $request, string $taskid){
        $comment = Comment::where('taskid',$taskid)->first();
        if ($comment) {
            $list = Comment::where('taskid',$taskid)->get();
            return response()->json([
                'message' => 'Comment Successfully Fetched' ,
                'data' => $list
            ], 200);
        }else {
            return response()->json([
                'message' => 'No task found' ,
            ], 400);
        }
    }
}
