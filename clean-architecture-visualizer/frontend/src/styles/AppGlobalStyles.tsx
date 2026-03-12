import { GlobalStyles } from '@mui/material';
import { alpha } from '@mui/material/styles';

export const AppGlobalStyles = () => (
  <GlobalStyles styles={(theme) => ({
    // Target the specific Monaco view-line layer
    '.monaco-editor .violation-highlight': {
      backgroundColor: `${alpha(theme.palette.error.main, 0.2)} !important`,
      borderBottom: `2px dotted ${theme.palette.error.main} !important`,
    },
    '.monaco-editor .relation-highlight-enterprisebusinessrules': {
      backgroundColor: `${alpha(theme.palette.entities.main, 0.2)} !important`,
      borderLeft: `4px solid ${theme.palette.entities.main} !important`,
    },
    '.monaco-editor .relation-highlight-applicationbusinessrules': {
      backgroundColor: `${alpha(theme.palette.useCases.main, 0.2)} !important`,
      borderLeft: `4px solid ${theme.palette.useCases.main} !important`,
    },
    '.monaco-editor .relation-highlight-interfaceadapters': {
      backgroundColor: `${alpha(theme.palette.adapters.main, 0.2)} !important`,
      borderLeft: `4px solid ${theme.palette.adapters.main} !important`,
    },
    '.monaco-editor .relation-highlight-frameworksdrivers': {
      backgroundColor: `${alpha(theme.palette.drivers.main, 0.2)} !important`,
      borderLeft: `4px solid ${theme.palette.drivers.main} !important`,
    },
    '.monaco-editor .relation-highlight-default': {
      backgroundColor: `${alpha(theme.palette.primary.main, 0.1)} !important`,
      borderLeft: `4px solid ${theme.palette.primary.main} !important`,
    },
  })} />
);