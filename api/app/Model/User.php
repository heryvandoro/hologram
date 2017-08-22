<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "users";
    protected $primaryKey = "email";
    public $incrementing = false;

    public static $rules = [
        "user_id" => "required",
		"fullname" => "required",
		"initial" => "required",
        "email" => "required|email",
    ];

    protected $hidden = ["updated_at", "created_at", "deleted_at"];

    public function scopeOnline($query){
        return $query->where("online", 1);
    }
}
