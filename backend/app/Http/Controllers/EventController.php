<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class EventController extends Controller
{
    public function select(Request $request, Event $event, $id)
    {
        $eventId = Event::find($id);

        return response()->json([
            'success' => 'Data retrieved successfully',
            'data' => $eventId,
        ]);
    }

    public function create(Request $request, Event $event)
    {
        $fullToken = $request->bearerToken();
        $tokenId = explode("|", $fullToken);
        $token = PersonalAccessToken::where('id', $tokenId[0])->select('tokenable_id')->first();

        if (!$token) {
            return response()->json(['error' => 'not logged in'], 500);
        }

        $validator = Validator::make($request->all(), [
            'event' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'date' => 'required|date',
            'ticket_price' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $request = (object)$validator->validated();

        $event->event = $request->event;
        $event->description = $request->description;
        $event->category = $request->category;
        $event->date = $request->date;
        $event->ticket_price = $request->ticket_price;

        if ($event->save()) {
            return response()->json(['success' => 'Event created successfully!']);
        } else {
            return response()->json(['error' => 'Fill all fields!']);
        }
    }
}
