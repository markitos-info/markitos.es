<?php

namespace App\Shared\Api;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\RequestOptions;
use Psr\Http\Message\ResponseInterface;

class Api
{
    private static function get(
        string $token,
        string $endpoint
    ): ResponseInterface {
        try {
            return (new Client())->get(self::getApiEndpoint($endpoint), [
                RequestOptions::HEADERS => [
                    'Authorization' => 'Bearer ' . $token,
                    'Accept' => 'application/json',
                ],
            ]);
        } catch (RequestException $th) {
            return $th->getResponse();
        }
    }

    private static function getApiEndpoint(string $uri): string
    {
        return $_ENV['API_URL'] . ltrim($uri, '/');
    }

    final public static function contentVideoAll(string $token): ResponseInterface
    {
        return self::get($token, '/videos');
    }

    final public static function contentFaqAll(string $token): ResponseInterface
    {
        return self::get($token, '/faqs');
    }

    final public static function contentBlogcontentAll(
        string $token,
        string $faqId
    ): ResponseInterface {
        return self::get($token, '/api/admin/content/faqs/' . $faqId . '/blogcontents');
    }

    final public static function contentTagAll(string $token): ResponseInterface
    {
        return self::get($token, '/api/admin/content/tags');
    }

    private static function post(string $token, string $enpoint, array $body)
    {
        try {
            return (new Client())->post(self::getApiEndpoint($enpoint), [
                RequestOptions::JSON => $body,
                RequestOptions::HEADERS => [
                    'Authorization' => 'Bearer ' . $token,
                    'Accept' => 'application/json',
                ],
            ]);
        } catch (RequestException $th) {
            return $th->getResponse();
        }
    }

    final public static function contentFortuneCreate(
        string $token,
        string $name
    ): ResponseInterface {
        return self::post($token, '/api/admin/content/fortunes', [
            'name' => $name,
        ]);
    }

    final public static function contentBlogcontentCreate(
        string $token,
        string $faqId,
        ?string $base64Image = null,
        ?string $html = null,
        ?string $youtube = null
    ): ResponseInterface {
        return self::post($token, '/api/admin/content/faqs/' . $faqId . '/blogcontents', [
            'html' => $html,
            'base64image' => $base64Image,
            'youtube' => $youtube,
        ]);
    }

    final public static function contentFaqCreate(
        string $token,
        string $title,
        string $html,
        string $tags,
    ): ResponseInterface {
        return self::post($token, '/faqs', [
            'title' => $title,
            'solution' => $html,
            'tags' => $tags,
        ]);
    }

    final public static function contentTagCreate(
        string $token,
        ?string $base64Image = null,
        ?string $name = null
    ): ResponseInterface {
        return self::post($token, '/api/admin/content/tags', [
            'name' => $name,
            'base64image' => $base64Image,
        ]);
    }

    final public static function login(string $username, string $password): ResponseInterface
    {
        try {
            return (new Client())->post(self::getApiEndpoint('/login'), [
                RequestOptions::JSON => [
                    'email' => $username,
                    'password' => $password,
                ],
            ]);
        } catch (RequestException $th) {
            return $th->getResponse();
        }
    }
}
