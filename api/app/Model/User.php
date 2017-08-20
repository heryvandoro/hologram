<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "users";
    protected $primaryKey = "user_id";

    public static $rules = [
        "user_id" => "required",
		"fullname" => "required",
		"initial" => "required",
        "email" => "required|email",
	];

    protected $fillable = [
        "user_id", "fullname", "initial", "email"
    ];
}
