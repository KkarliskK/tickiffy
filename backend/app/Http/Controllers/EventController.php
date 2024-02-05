<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class EventController extends Controller
{
    public function select(Request $request, Event $event, $id)     //select single event by its id
    {
        $eventId = Event::find($id);

        return response()->json($eventId);
    }

    public function create(Request $request, Event $event)       //create event
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
            'category' => 'required|integer',
            'date' => 'required|date',
            'time' => 'required',
            'location' => 'required|string',
            'img_url' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $request = (object)$validator->validated();

        $event->event = $request->event;
        $event->description = $request->description;
        $event->categories_id = $request->category;
        $event->date = $request->date;
        $event->time = $request->time;
        $event->location = $request->location;
        $event->img_url = $request->img_url;

        if ($event->save()) {
            return response()->json([
                'success' => 'Event created successfully!',
                'event_id' => $event->id
            ]);
        } else {
            return response()->json(['error' => 'Fill all fields!']);
        }

    }

    public function show(Request $request, Event $event)       //get all events
    {
        $events = Event::all();

        return response()->json([
            'success' => 'Data retrieved successfully',
            'data' => $events,
        ]);
    }

    public function showByCategory(Request $request, $categoryId)      //get event by its category
    {
        $events = Event::where('categories_id', $categoryId)->get();

        return response()->json([
            'success' => 'Data retrieved successfully',
            'data' => $events,
        ]);
    }

    public function delete(Request $request, $id)
    {
        $event = Event::find($id);

        if ($event) {
            $event->delete();
            return response()->json([
                'success' => 'Event deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'error' => 'Event not found'
            ], 404);
        }
    }

    public function getUpdate(Request $request, Event $event, $id)     //select single event by its id
    {
        $eventId = Event::find($id);

        return response()->json([
            'success' => 'Data retrieved successfully',
            'data' => $eventId,
        ]);
    }

    public function getRandom(Request $request, Event $event)
    {
        $events = Event::inRandomOrder()->limit(5)->get();
        return response()->json($events);
    }
    public function getRandomEvent(Request $request, Event $event, $id)
    {
        $events = Event::where('categories_id', $id)->inRandomOrder()->limit(5)->get();
        return response()->json($events);
    }


}
