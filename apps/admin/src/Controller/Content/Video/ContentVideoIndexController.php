<?php

declare(strict_types=1);

namespace App\Controller\Content\Video;

use App\Controller\Base\BaseWebActionController;
use App\Shared\Api\Api;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContentVideoIndexController extends BaseWebActionController
{
    #[Route('/content/video', name: 'content_video_index', methods: ['GET'])]
    public function execute(): Response
    {
        $playlists = [];
        $videos = array_map(function ($video) use (&$playlists) {
            $video->title_decoded = base64_decode($video->title);
            $video->playlistTitle_decoded = base64_decode($video->playlistTitle);
            $playlists[$video->playlist] = $video->playlistTitle_decoded;

            return $video;
        }, $this->getCollection());
        usort($videos, function ($a, $b) {
            return strnatcmp($a->playlist, $b->playlist);
        });

        return $this->getRender(
            'content/video/index.html.twig',
            [
                'videos' => $videos,
                'playlists' => $playlists,
                'js_files' => [
                    '/lib/markdown-it.min.js'
                ]
            ],
            'content',
            'video'
        );
    }

    private function getCollection(): array
    {
        $response = Api::contentVideoAll($this->getToken());
        if (Response::HTTP_OK !== $response->getStatusCode()) {
            $errors = $this->extractErrorsFromResponseIfApply($response);
            $this->addFlash(
                'error',
                'Error recuperando videos: '
                    . ' !. detalles: '
                    . implode('<br/>', $errors)
            );

            return [];
        }

        return json_decode($response->getBody()->getContents())->result;
    }
}
