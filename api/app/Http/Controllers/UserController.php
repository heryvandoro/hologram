<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\User;
use Validator;

class UserController extends Controller {
    
    public function index(){
        return User::all();
    }

    public function show($email){
        return User::find($email);
    }

    public function store(Request $request){
        $a = Validator::make($request->all(), User::$rules);
        if($a->fails()){
            return response()->json(["errors"=>$a->errors()]);
        }
        
        if(User::find($request->email)){
            $data = User::find($request->email);
            if($data->online){
                return response()->json(["errors"=>array("online" => ["User already logged."])]);
            }else{
                $data->user_id = $request->user_id;
                $data->fullname = $request->fullname;
                $data->initial = $request->initial;
                $data->online = 1;
                $data->save();
            }
        }else{
            $data = new User;
            $data->user_id = $request->user_id;
            $data->fullname = $request->fullname;
            $data->initial = $request->initial;
            $data->email = $request->email;
            $data->online = 1;
            $data->save();
        }

        return $this->show($data->email);
    }

    // public function put(Request $request, $id){
    //     $this->validate($request, User::$rules);
    //     $data = User::find($id);
    //     if(is_null($data)){
	// 		return response()->json(["status"=>"not found"]);
	// 	}
    //     $data->update($request->all());
    //     return response()->json(["updated"=>$data]);
    // }

    public function delete(){
        $data = User::find($id);
        if(is_null($data)){
			return response()->json(["status"=>"not found"]);
		}
        $data->delete();
        return response()->json(["status"=>"success"]);
    }

    public function makeOffline(Request $request){
        $data = User::where("user_id", $request->target)->first();
        if($data!=null){
            $data->online = 0;
            $data->save();
        }
    }
}
