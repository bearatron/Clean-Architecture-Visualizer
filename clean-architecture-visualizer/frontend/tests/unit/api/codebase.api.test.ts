import { describe, it, expect } from 'vitest';
import { getFileTree, getFileContent } from '@/api/codebase.api';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

describe('Codebase API', () => {
  it('getFileTree calls the correct endpoint', async () => {
    server.use(
      http.get('*/api/codebase/file-tree', () => {
        return HttpResponse.json({ name: 'root', children: [] });
      })
    );

    const data = await getFileTree();
    expect(data.name).toBe('root');
  });

  it('getFileContent encodes the file path correctly', async () => {
    const interactionId = 'int-1';
    const filePath = 'src/User.ts';

    server.use(
      http.get('*/api/codebase/interactions/:id/files/:path', ({ params }) => {
        if (params.id === interactionId && params.path === filePath) {
          return HttpResponse.json({ content: 'test code' });
        }
        return new HttpResponse(null, { status: 404 });
      })
    );

    const data = await getFileContent(interactionId, filePath);
    expect(data.content).toBe('test code');
  });
});