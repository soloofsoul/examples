<?php
require_once('twitter_proxy.php');
// Twitter OAuth Config options
$oauth_access_token = '311645317-4DzWHTuIin0xgBxFWAlRYB7IYqUEVgJnHsKX4kjJ';
$oauth_access_token_secret = 'r19QDAEoKJdDrNR7KTYjW6aC5FXhtnFXjXcAzc3ftgV7k';
$consumer_key = 'DAloWCea5hP9nmfzceGris3TO';
$consumer_secret = 'FNEbr9ttV9VFGrvvkZEhxTQn3Ka7K96GZwSFHaOI8rPakyEKQv';
$user_id = '484759433';
$screen_name = 'morozovych';
$count = 5;
$twitter_url = 'statuses/user_timeline.json';
$twitter_url .= '?user_id=' . $user_id;
$twitter_url .= '&screen_name=' . $screen_name;
$twitter_url .= '&count=' . $count;
// Create a Twitter Proxy object from our twitter_proxy.php class
$twitter_proxy = new TwitterProxy(
    $oauth_access_token,			// 'Access token' on https://apps.twitter.com
    $oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
    $consumer_key,					// 'API key' on https://apps.twitter.com
    $consumer_secret,				// 'API secret' on https://apps.twitter.com
    $user_id,						// User id (http://gettwitterid.com/)
    $screen_name,					// Twitter handle
    $count							// The number of tweets to pull out
);
// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy->get($twitter_url);
echo $tweets;
?>