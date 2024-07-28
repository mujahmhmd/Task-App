<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function Registration(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required | string',
            'email' => 'required | string | email | unique:users',
            'password' => 'required | string | min:4',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation Failed' ,
                'errors' => $validator->errors()
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Registration Successfull' ,
            'data' => $user
        ]);
       
    }


    public function Login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required | string | email',
            'password' => 'required | string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation error' ,
                'errors' => $validator->errors()
            ]);
        }

        $user = User::where('email', $request->email)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('myapptoken')->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'message' => 'Login Successfull' ,
                    'token' => $token,
                    'user' => $user
                ]);
            }else {
                return response()->json([
                    'status' => 400,
                    'message' => 'Incorrect Password' ,
                ]);
            }
        }else {
            return response()->json([
                'status' => 400,
                'message' => 'Username or Password incorrect' ,
            ]);
        }
    }

    public function Logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Successfully Logout ' ,
        ]);
    }


    public function Index(Request $request){
        return response()->json([
            'message' => 'Welcome to Dashboard' ,
            'data' => $request->user()
        ], 200);
    }


    public function UpdateProfile(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'name' => 'required | string',
            'email' => 'required | string | email',
            'old_password' => 'required | string',
            'password' => 'required | string | min:4',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation Failed' ,
                'errors' => $validator->errors()
            ]);
        }

        $user = $request->user();
        if (Hash::check($request->old_password, $user->password)) {
            $user =User::find($id);
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Profile Successfully Updated' ,
                'data' => $user
            ]);
        }else {
            return response()->json([
                'status' => 400,
                'message' => 'Old Password does not match' ,
            ]);
        }
    }

    public function CreateTask(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required | string',
            'description' => 'required | string',
            'level' => 'required | string',
            'duedate' => 'required | date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation Failed' ,
                'errors' => $validator->errors()
            ]);
        }
        $user = Auth()->user();
        $task = Task::create([
            'title' => $request->title,
            'userid' => $user->id,
            'description' => $request->description,
            'level' => $request->level,
            'duedate' => $request->duedate
        ]);
        return response()->json([
            'status' => 200,
            'message' => 'Task Successfully Created' ,
            'task' => $task
        ]);
    }


    public function ListTask(Request $request, $id){
        $task = Task::where('userid',$id)->first();
        if ($task) {
            $list = Task::where('userid',$id)->get();
            return response()->json([
                'status' => 200,
                'message' => 'Task Successfully Fetched' ,
                'data' => $list
            ]);
        }else {
            return response()->json([
                'status' =>400,
                'message' => 'Task Not found' ,
            ]);
        }
        
    }


    public function Task(Request $request, $id){
        $task = Task::find($id);
        if ($task) {
            return response()->json([
                'status' => 200,
                'message' => 'Success' ,
                'task' => $task
            ]);
        }else {
            return response()->json([
                'status' =>400,
                'message' => 'error' ,
            ]);
        }
    }


    public function UpdateTask(Request $request, string $id){
        $validator = Validator::make($request->all(), [
            'title' => 'required | string',
            'description' => 'required | string',
            'level' => 'required | string',
            'duedate' => 'required | date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation Failed' ,
                'errors' => $validator->errors()
            ]);
        }
        if(Carbon::parse($request->duedate)){
        $task = Task::find($id);
        $task->update($request->all());
        return response()->json([
            'status' =>200,
            'message' => 'Task Successfully Updated' ,
            'data' => $task
        ]);
    }else {
        return response()->json([
            'status' => 403,
            'message' => 'No Records Found' ,
        ]);
    }
    }

    public function DeleteTask(Request $request, string $id){
        $task = Task::where('id',$id)->first();
        if ($task) {
            
                $task -> delete ();
            return response()->json([
                'status' => 200,
                'message' => 'success' ,
            ]);
            
           
        
    }
}

    public function TaskStatus($id){
        $task = Task::find($id);
        $task->complete =!$task->complete;
        $task->save();
        return response()->json([
            'status' => 200,
            'message' => 'success' ,
        ]);

    }




    public function ViewStatus($id){
        $task = Task::find($id);
        $task->visible = !$task->visible;
        $task->save();
        return response()->json([
            'message' => 'Visible Success' ,
        ], 200);
    }


    public function FilterTask(Request $request,$option){
        $user = Auth()->user();
        if ($option == 'all') {
            $task = Task::where('userid',$user->id)->orderBy('duedate','asc')->get();
        }elseif ($option == 'completed') {
            $task = Task::where('userid',$user->id)->where('complete',true)->orderBy('complete','asc')->get();
        }elseif ($option == 'duedate') {
            $duedate = Carbon::parse($request->filter_dudedate);
            $task = Task::where('userid',$user->id)->where('duedate',$duedate)->orderBy('duedate','asc')->get();
        }
        return response()->json([
            'status' =>200,
            'message' => 'success' ,
            'task' => $task
        ]);
    }
    
}
