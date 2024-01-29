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
    function create(Request $request, User $user)      //this is for registration
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'username' => 'required|string',
            'email' => 'required|string',                   //validator just validates the recieved data | backend validation system
            'password' => 'required|string',
        ]);
        if ($validator->fails()){
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->errors()->toArray()
            ], 422);
        }
        $request = (object) $validator->validated();


        $found = User::where('username', $request->name)->first();
            if ($found) {
            return response()->json([                                   // checking if the username already exists in database
                'error' => 'Username already in use.'
            ], 404);
        }


        $email = User::where('email', $request->email)->first();
        if ($email) {
            return response()->json([
                'error' => 'User with that email aleady exists.'
            ], 404);
        }


        $user->name = $request->name;
        $user->username = $request->username;                   //seting the data for each variable and hashing password before put in database
        $user->email = $request->email;
        $user->password = Hash::make($request->password);


        if ($user->save()){
            $token = $user->createToken('Personal Access Token');           // here the data has ben sent to database
            return ['token' => $token->plainTextToken];
        }
        else{
            return response()->json(['error' => 'Fill all fields!']);          // if some fields are left empty the backend sends this message
        }
    }

    
    function login(Request $request, User $user)      //this is for login
    {
        
    }
    
}

?>