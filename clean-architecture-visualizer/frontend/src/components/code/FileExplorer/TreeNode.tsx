import { styled } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import { FileNode } from '../../../lib';

interface NodeContainerProps {
  isActive?: boolean;
  depth: number;
}

interface TreeNodeProps {
  node: FileNode;
  onSelect: (path: string) => void;
  activeFilePath: string | null;
  expandedFolders: Set<string>;
  toggleFolder: (path: string) => void;
  depth: number;
}

const NodeContainer = styled('div')<NodeContainerProps>(({ isActive, depth, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: 6,
  paddingBottom: 6,
  paddingLeft: depth * 16 + 12,
  paddingRight: 12,
  marginRight: 8,
  borderRadius: '0 20px 20px 0',
  fontWeight: isActive ? 600 : 400,
  cursor: 'pointer',
  backgroundColor: isActive ? theme.palette.primary.light : 'transparent',
  color: isActive ? theme.palette.primary.dark : theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  transition: 'all 0.15s ease-in-out',
}));

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  onSelect,
  activeFilePath,
  expandedFolders,
  toggleFolder,
  depth,
}) => {
  const isDir = node.type === 'directory';
  const isExpanded = expandedFolders.has(node.path);
  const isActive = node.path === activeFilePath;

  return (
    <>
      <NodeContainer isActive={isActive} depth={depth} onClick={() => (isDir ? toggleFolder(node.path) : onSelect(node.path))}>
        <span style={{ display: 'flex', alignItems: 'center', width: 20 }}>
          {isDir ? (
            isExpanded ? <ExpandMoreIcon sx={{ fontSize: 18 }} /> : <ChevronRightIcon sx={{ fontSize: 18 }} />
          ) : null}
        </span>
        
        <span style={{ marginLeft: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
          {isDir ? (
            isExpanded ? (
              // Fix: Changed color="primary.dark" to sx={{ color: 'primary.dark' }}
              <FolderOpenIcon sx={{ fontSize: 18, color: 'primary.dark' }} /> 
            ) : (
              <FolderIcon sx={{ fontSize: 18 }} color="action" />
            )
          ) : (
            // Fix: Use sx for conditional color paths
            <InsertDriveFileIcon 
              sx={{ 
                fontSize: 18, 
                color: isActive ? 'primary.dark' : 'action.active' 
              }} 
            />
          )} 
          
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: '0.85rem',
              // Typography color prop often works with paths, but sx is most consistent
              color: isActive ? 'primary.dark' : 'text.primary',
            }}
          >
            {node.name}
          </Typography>
        </span>
      </NodeContainer>

      {isDir &&
        isExpanded &&
        node.children?.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            onSelect={onSelect}
            activeFilePath={activeFilePath}
            expandedFolders={expandedFolders}
            toggleFolder={toggleFolder}
            depth={depth + 1}
          />
        ))}
    </>
  );
};