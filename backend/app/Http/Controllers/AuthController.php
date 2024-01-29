<?php 

namespace App\Http\Controllers;

use App\Mail\PasswordEmail;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function create(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'username' => 'required|string',
            'email' => 'required|string',
        ]);
        if ($validator->fails()){
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->errors()->toArray()
            ], 422);
        }
        $request = (object) $validator->validated();


        $found = User::where('name', $request->name)->first();
            if ($found) {
            return response()->json([
                'error' => 'User already in database.'
            ], 404);
        }


        $email = User::where('email', $request->email)->first();
        if ($email) {
            return response()->json([
                'error' => 'User with that email aleady exists.'
            ], 404);
        }


        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);


        if ($user->save()){
            $token = $user->createToken('Personal Access Token');
            return ['token' => $token->plainTextToken];
        }
        else{
            return response()->json(['error' => 'Fill all fields!']);
        }
    }
}

?>