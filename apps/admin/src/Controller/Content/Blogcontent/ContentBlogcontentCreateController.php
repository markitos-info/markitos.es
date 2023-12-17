<?php

declare(strict_types=1);

namespace App\Controller\Content\Blogcontent;

use App\Controller\Base\BaseWebActionController;
use App\Shared\Api\Api;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContentBlogcontentCreateController extends BaseWebActionController
{
    #[Route('/content/faq/{faq_id}/blogcontent/create', name: 'content_blogcontent_create', methods: ['GET', 'POST'])]
    public function execute(
        string $faq_id,
        Request $request
    ): Response {
        $responseFromSubmit = $this->analyzeSubmitAndRequestRedirectIfApplyt(
            $faq_id,
            $request
        );
        if (is_object($responseFromSubmit)) {
            return $responseFromSubmit;
        }

        return $this->getRender(
            '/content/blogcontent/create.html.twig',
            [
                'faq_id' => $faq_id,
            ],
            'content',
            'blogcontent'
        );
    }

    private function analyzeSubmitAndRequestRedirectIfApplyt(
        string $faq_id,
        Request $request
    ): ?Response {
        if ('do_submit' !== $request->get('do_submit')) {
            return null;
        }

        $base64Cover = null;
        $image = $request->files->get('imagen');
        if ($image instanceof \SplFileInfo) {
            $base64Cover = base64_encode(file_get_contents($image->getPathname()));
        }
        $response = Api::contentBlogcontentCreate(
            $this->getToken(),
            $faq_id,
            $base64Cover,
            $request->request->get('html'),
            $request->request->get('youtube')
        );
        if (Response::HTTP_CREATED !== $response->getStatusCode()) {
            $errors = $this->extractErrorsFromResponseIfApply($response);
            $this->addFlash(
                'error',
                'Error creando blog content!. detalles: '
                    .implode("\n", $errors)
            );

            return null;
        }

        $this->addFlash(
            'info',
            'Recurso creado!'
        );

        return $this->redirectToRoute('content_blogcontent_index', ['faq_id' => $faq_id]);
    }
}
