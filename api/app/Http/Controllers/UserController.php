<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\User;
use Illuminate\Contracts\Validation\Validator;

class UserController extends Controller {
    
    public function index(){
        return User::all();
    }

    public function show($id){
        return User::find($id);
    }

    public function store(Request $request){
        //$this->validate($request, User::$rules);
        $a = Validator::make($request->all(), User::$rules);
        if($a->fails()){
            return response()->json(["errors"=>$a->errors()]);
        }
        $data = User::create($request->all());
        return response()->json(['created'=> $data]);
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
}
