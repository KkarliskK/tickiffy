<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Validator;


class CategoriesController extends Controller
{
    function select()
    {
        $categories = Categories::all();

        return response()->json(
            $categories
        );
    }

    function create(Request $request){
        $validator = Validator::make($request->all(), [
            'category' => 'required|string',
        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->errors()->toArray()
            ], 422);
        }
        $fullToken = $request->bearerToken();
        $request = (object) $validator->validated();

        $tokenId = explode("|", $fullToken);
        $token = PersonalAccessToken::where('id', $tokenId[0])->select('tokenable_id')->first();
        if(!$token){
            return response()->json(['error' => 'not logged in']);
        }

        $categories = new Categories;
        $categories->category = $request->category;

        if($categories->save()){
            return response()->json([
                'message' => 'Category created successfully',
                'data' => $categories
            ]);
        }else{
            return response()->json([
                'message' => 'Error creating category'
            ]);
        }

    }
}
