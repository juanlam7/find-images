import { delay, http, HttpResponse } from 'msw';
import { mockImages } from './mock-data';

export const handlers = [
  http.get('https://api.unsplash.com/photos', async ({ request }) => {
    const url = new URL(request.url);
    console.log('MSW: Intercepted GET /photos request');

    await delay(5000);

    // return new HttpResponse(null, {
    //   status: 404,
    //   statusText: 'Image not found',
    // });

    return HttpResponse.json(mockImages, {
      headers: {
        'X-Total': '5',
      },
    });
  }),

  http.get('https://api.unsplash.com/photos/:id', async ({ params }) => {
    const { id } = params;
    console.log(`MSW: Intercepted GET /photos/${id} request`);

    const image = mockImages.find((img) => img.id === id);

    await delay(2000);

    if (image) {
      return HttpResponse.json(image);
    } else {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Image not found',
      });
    }
  }),
];
