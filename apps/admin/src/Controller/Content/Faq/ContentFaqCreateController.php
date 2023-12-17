<?php

declare(strict_types=1);

namespace App\Controller\Content\Faq;

use App\Controller\Base\BaseWebActionController;
use App\Shared\Api\Api;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContentFaqCreateController extends BaseWebActionController
{
    #[Route('/content/faq/create', name: 'content_faq_create', methods: ['GET', 'POST'])]
    public function execute(Request $request): Response
    {
        $responseFromSubmit = $this->analyzeSubmitAndRequestRedirectIfApplyt($request);
        if (is_object($responseFromSubmit)) {
            return $responseFromSubmit;
        }

        return $this->getRender('/content/faq/create.html.twig', [
            'tags' => [],
            'css_files' => [
                '/lib/bootstrap-tagsinput/css/bootstrap-tagsinput.css'
            ],
            'js_files' => [
                '/lib/bootstrap-tagsinput/js/bootstrap-tagsinput.js'
            ]
        ], 'tag');
    }

    private function analyzeSubmitAndRequestRedirectIfApplyt(Request $request): ?Response
    {
        if ('do_submit' !== $request->get('do_submit')) {
            return null;
        }

        $title = base64_encode($request->request->get('title'));
        $solution = base64_encode($request->request->get('solution'));
        $tags = $request->get('tags');
        $response = Api::contentFaqCreate(
            $this->getToken(),
            $title,
            $solution,
            $tags
        );
        if (Response::HTTP_CREATED !== $response->getStatusCode()) {
            $errors = $this->extractErrorsFromResponseIfApply($response);
            $this->addFlash(
                'error',
                'Error creando blog post!. detalles: '
                    . implode("\n", $errors)
            );

            return null;
        }

        $this->addFlash(
            'info',
            'Recurso creado!'
        );

        return $this->redirectToRoute('content_faq_index');
    }
}
