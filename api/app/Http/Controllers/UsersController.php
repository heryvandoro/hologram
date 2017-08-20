<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\User;

class UsersController extends Controller {
    
    public function all(){
        return User::all();
    }

    public function get($id){
        return User::find($id);
    }

    public function add(Request $request){
        $this->validate($request, User::$rules);
        $data = User::create($request->all());
        return response()->json(['created'=> $data]);
    }

    public function put(Request $request, $id){
        $this->validate($request, User::$rules);
        $data = User::find($id);
        if(is_null($data)){
			return response()->json(["status"=>"not found"]);
		}
        $data->update($request->all());
        return response()->json(["updated"=>$data]);
    }

    public function remove(){
        $data = User::find($id);
        if(is_null($data)){
			return response()->json(["status"=>"not found"]);
		}
        $data->delete();
        return response()->json(["status"=>"success"]);
    }
}
