<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function create(Request $request, User $user)
    {
        $messages = [
            'username.unique' => 'The username has already been taken.',
            'email.unique' => 'The email has already been registered.',
            'mobile.unique' => 'The phone number has already been registered.',
        ];

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'username' => 'required|string|unique:users,username',
            'email' => 'required|string|unique:users,email',
            'mobile' => 'required|string|unique:users,mobile',
            'password' => 'required|string',
        ], $messages);

        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $request = (object) $validator->validated();

        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->mobile = $request->mobile;
        $user->password = Hash::make($request->password);

        if ($user->save()){
            $token = $user->createToken('Personal Access Token');
            return ['token' => $token->plainTextToken];
        }
        else{
            return response()->json(['error' => 'Fill all fields!']);
        }
    }



    function status(Request $request)
    {
        if (Auth::check()) {
            return response()->json([
                'message' => 'Logged in.'
            ], 200);
        } else {
            return response()->json([
                'error' => 'User not logged in'
            ], 200);
        }
    }


    function login(Request $request, User $user)      //this is for login
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Invalid username or password'
            ], 404);
        }

        $token = $user->createToken('Personal Access Token');
        return ['token' => $token->plainTextToken];
    }

}

?>
