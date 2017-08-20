<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $table = "chats";
    protected $with = ["sender", "recv"];

    public static $rules = [
		"sender_id" => "required",
		"recv_id" => "required",
        "messages" => "required",
	];

    protected $fillable = [
        "sender_id", "recv_id", "messages"
    ];

    public function sender(){
        return $this->belongsTo("App\Model\User", "sender_id", "user_id");
    }

    public function recv(){
        return $this->belongsTo("App\Model\User", "recv_id", "user_id");
    }

    public function scopeChat($query, $param1, $param2){
        return $query->where("sender_id", $param1)->where("recv_id", $param2)->orWhere("sender_id", $param2)->where("recv_id", $param1);
    }
}
