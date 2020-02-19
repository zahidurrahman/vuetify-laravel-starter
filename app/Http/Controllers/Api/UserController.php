<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Auth;
use Illuminate\Support\Facades\Hash;
use Psy\Util\Str;

class UserController extends Controller
{
    //
    public function login(Request $request)
    {
        // echo json_encode($request->all());
       $credentials=$request->only('email','password');
       if(Auth::attempt($credentials)){
           //return response()->json(['token'=>"Email or Password is COrrect"],200);
//           $token=Str::random(80);
//           Auth:user()->api_token = $token;
//           Auth::user()->save();
           $token=bcrypt($request->input('password'));
           return response()->json(['token'=>$token],200);

       }
//        $email=$request->input('email');
//       $password=bcrypt($request->input('password'));
//       $user = User::where('email',$email)->where('password',$password)->first();
//       if($user){
//           $token=Hash::make($request->password);
//           $user->api_token = $token;
//           $user->save();
//           //return response()->json(['token'=>$token],200);
//           return response()->json(['status'=>"Email or Password is COrrect"],403);
//       }
        //$text=$request->input('password');//"Email or Password is Wrong 666"

        return response()->json(['status'=>"Email or Password is Wrong 666"],403);

    }
}
