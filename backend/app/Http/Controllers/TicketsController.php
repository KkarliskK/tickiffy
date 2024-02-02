<?php

namespace App\Http\Controllers;

use App\Models\Tickets;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Validator;

class TicketsController extends Controller
{
    public function create(Request $request, $eventId)
    {

        print_r($eventId);
        // Validate the request data
        $request->validate([
            'ticket' => 'required|string',
            'ticket_price' => 'required|numeric',
            'quantity' => 'required|integer',
        ]);

        // Create a new ticket
        $ticket = new Tickets;
        $ticket->event_id = $eventId;
        $ticket->ticket = $request->ticket;
        $ticket->ticket_price = $request->ticket_price;
        $ticket->quantity = $request->quantity;
        $ticket->save();

        // Return a response
        return response()->json([
            'message' => 'Ticket created successfully',
            'ticket' => $ticket
        ], 201);
    }

    public function select(Request $request, $eventId)
    {
        // Retrieve tickets for the specific event
        $tickets = Tickets::where('event_id', $eventId)->get();

        // Check if tickets exist for the event
        if ($tickets->isEmpty()) {
            return response()->json([
                'message' => 'No tickets found for this event',
            ], 404);
        }

        // Return the tickets in the response
        return response()->json($tickets, 200);
    }

    public function change(Request $request, $eventId, $ticketId)
    {
        // Find the ticket by its id
        $ticket = Tickets::where('event_id', $eventId)->where('id', $ticketId)->first();

        // If the ticket doesn't exist, return an error response
        if (!$ticket) {
            return response()->json([
                'message' => 'Ticket not found',
            ], 404);
        }

        // Update the quantity
        $ticket->quantity = $request->quantity;
        $ticket->save();

        // Return a success response
        return response()->json([
            'message' => 'Ticket quantity updated successfully',
            'ticket' => $ticket
        ], 200);
    }



}
