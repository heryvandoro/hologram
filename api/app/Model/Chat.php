<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $table = "chats";
    protected $with = ["sender", "recv"];

    public static $rules = [
		"sender" => "required",
		"recv" => "required",
        "messages" => "required",
	];

    protected $fillable = [
        "sender", "recv", "messages"
    ];

    public function sender(){
        return $this->belongsTo("App\Model\User", "sender", "email");
    }

    public function recv(){
        return $this->belongsTo("App\Model\User", "recv", "email");
    }

    public function scopeChat($query, $param1, $param2){
        return $query->where("sender", $param1)->where("recv", $param2)->orWhere("sender", $param2)->where("recv", $param1);
    }
}
