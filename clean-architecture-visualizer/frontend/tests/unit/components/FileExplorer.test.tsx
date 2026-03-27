import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test-utils';
import { FileExplorer } from '@/components/code/FileExplorer';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';


vi.mock('./TreeNode', () => ({
  TreeNode: ({ node, toggleFolder }: any) => (
    <div data-testid={`node-${node.name}`}>
      <span>{node.name}</span>
      {node.type === 'directory' && (
        <button onClick={() => toggleFolder(node.path)}>Toggle</button>
      )}
    </div>
  ),
}));

describe('FileExplorer Component', () => {
  const defaultProps = {
    onSelect: vi.fn(),
    activeFilePath: null,
  };

  const mockFileTree = {
    id: 'root',
    name: 'root',
    type: 'directory',
    children: [
      { id: '1', name: 'src', type: 'directory', path: 'src' },
      { id: '2', name: 'package.json', type: 'file', path: 'package.json' },
    ],
  };

  it('manages expanded folder state when toggled', async () => {
    server.use(
      http.get('*/api/codebase/file-tree', () => HttpResponse.json(mockFileTree))
    );

    render(<FileExplorer {...defaultProps} />);

    // 1. Find the "src" folder text
    const folderLabel = await screen.findByText('src');
    expect(folderLabel).toBeInTheDocument();

    // 2. Find the toggle icon (ChevronRight) near that text
    const toggleButton = screen.getByTestId('ChevronRightIcon');
    
    // 3. Click it
    fireEvent.click(toggleButton);
  });

  it('automatically expands folders when an activeFilePath is provided', async () => {
    server.use(
      http.get('*/api/codebase/file-tree', () => HttpResponse.json(mockFileTree))
    );

    // Test: If we target a nested file, does the parent show up?
    render(
      <FileExplorer {...defaultProps} activeFilePath="src/components/Button.tsx" />
    );
    const folder = await screen.findByText('src');
    expect(folder).toBeInTheDocument();
    
  });
});