<?php

namespace App\Http\Controllers;

use App\Helpers\Helpers;

abstract class Controller
{

    protected $helper;

    public function __construct()
    {
        $this->helper = new Helpers();
    }
}
