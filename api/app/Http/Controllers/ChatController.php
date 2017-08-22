<?php namespace App\Http\Controllers;

use App\Model\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller {

    public function get(Request $request){
        if($request->has("em1") && $request->has("em2")){
            return Chat::chat($request->em1, $request->em2)->get();
        }else{
            return response()->json(["status"=>"not found"]);
        }
    }

    public function add(Request $request){
        $this->validate($request, Chat::$rules);
        $data = Chat::create($request->all());
        return response()->json(['created'=> $data]);
    }
    
}
