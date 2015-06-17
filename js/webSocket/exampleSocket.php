<?php
/*
To start webSocket Server:
1. type in command window "php exampleSocket.php"
2. Load html file in browser
*/

require_once('websockets.php');

class echo_server extends WebSocketServer
{
    private $_connecting = 'Connecting to server...';
    private $_welcome = 'Hello, welcome to echo server!';

    protected function connected ($user)
    {
        //Send welcome message to user
        $this->send($user, $this->_welcome);
    }

    protected function process ($user, $message)
    {
        //Upper case user message and send back to user
        $response = 'Upper case -> ' . strtoupper($message);
        $this->send($user, $response);
    }

    protected function closed ($user)
    {
        echo 'User ' . $user->id . ' closed connection' . PHP_EOL;
    }
}

$host = 'localhost';
$port = 2207;

$server = new echo_server($host , $port );
$server->run();