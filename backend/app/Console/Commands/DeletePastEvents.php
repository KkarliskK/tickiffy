<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DeletePastEvents extends Command
{
    protected $signature = 'events:delete-past';

    protected $description = 'Delete events that are past their date';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        DB::table('events')
            ->where('date', '<', Carbon::today())
            ->delete();

        $this->info('Past events deleted successfully.');
    }
}
