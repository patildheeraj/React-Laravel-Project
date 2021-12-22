<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function register(Request $req)
    {
        $user = new User();
        $user->name=$req->input('name');
        $user->password= Hash::make($req->input('password'));
        $user->email = $req->input('email');
        $user->save();
        return $user;
    }
    function login(Request $req)
    {
        $user = User::where('email', $req->email)->first();
        if(!$user || !Hash::check($req->password,$user->password))
        {
            return response([
                "errors"=>["Email or Password does not matched."]
            ]);
        }

        return $user;
    }
}
