<?php

declare(strict_types=1);

namespace App\Controller\Content\Faq;

use App\Controller\Base\BaseWebActionController;
use App\Shared\Api\Api;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContentFaqIndexController extends BaseWebActionController
{
    #[Route('/content/faq', name: 'content_faq_index', methods: ['GET'])]
    public function execute(): Response
    {
        return $this->getRender(
            'content/faq/index.html.twig',
            [
                'faqs' => array_map(function ($faq) {
                    $faq->title = base64_decode($faq->title);
                    $faq->solution = base64_decode($faq->solution);

                    return $faq;
                }, $this->getCollection()),
            ],
            'content',
            'faq'
        );
    }

    private function getCollection(): array
    {
        $response = Api::contentFaqAll($this->getToken());
        if (Response::HTTP_OK !== $response->getStatusCode()) {
            $errors = $this->extractErrorsFromResponseIfApply($response);
            $this->addFlash(
                'error',
                'Error recuperando faqs: '
                    . ' !. detalles: '
                    . implode('<br/>', $errors)
            );

            return [];
        }

        return json_decode($response->getBody()->getContents());
    }
}
