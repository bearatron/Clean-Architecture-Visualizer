import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '../../test-utils'; 
import { useFileTree, useFileViewer } from '../../../src/actions/useCodebase';
import { server } from '../../../src/mocks/server';
import { http, HttpResponse } from 'msw';

describe('useCodebase Hook', () => {
  it('successfully fetches the file tree', async () => {
    server.use(
      http.get('*/api/codebase/file-tree', () => {
        return HttpResponse.json([{ name: 'src', type: 'directory' }]);
      })
    );
    const { result } = renderHook(() => useFileTree());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data[0].name).toBe('src');
  });

  it('remains disabled if interactionId is missing (useFileViewer)', async () => {
    const { result } = renderHook(() => useFileViewer('', null));

    // verify it stays 'idle' because 'enabled' is false
    expect(result.current.fetchStatus).toBe('idle');
  });
});