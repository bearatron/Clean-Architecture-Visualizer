import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Divider, 
  IconButton, 
  Container 
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProjectStarter: React.FC = () => {
    const { t } = useTranslation("projectStarter");
    const [useCaseName, setUseCaseName] = useState('');
    const [loading, setLoading] = useState(false);

    // Handler 1: Start New Project
    const handleCreateProject = async () => {
        setLoading(true);
        try {
            console.log("Triggering project creation flow...");
            // Your logic here: e.g., window.electron.createProject()
        } catch (error) {
            console.error("Failed to create project", error);
        } finally {
            setLoading(false);
        }
    };

    // Handler 2: Add Use Case to Existing
    const handleAddUseCase = async () => {
        if (!useCaseName.trim()) {
            alert(t('projectStarter.errors.emptyUseCase'));
            return;
        }

        setLoading(true);
        try {
            console.log(`Adding use case: ${useCaseName}`);
            // Your logic here: e.g., axios.post('/generate', { name: useCaseName })
            setUseCaseName(''); // Clear input on success
        } catch (error) {
            console.error("Failed to add use case", error);
        } finally {
            setLoading(false);
        }
    };

    const primaryButtonStyle = {
        bgcolor: 'text.primary',
        color: 'background.paper',
        textTransform: 'none',
        borderRadius: 1.5,
        px: 4,
        py: 1.2,
        fontWeight: 600,
        '&:hover': {
            bgcolor: 'text.secondary',
        },
        '&:disabled': {
            bgcolor: 'action.disabledBackground',
            color: 'action.disabled'
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            {/* Outline Home Icon */}
            <Box sx={{ mb: 8 }}>
                <IconButton component={Link} to="/" sx={{ color: 'text.primary', p: 0 }}>
                    <HomeOutlinedIcon sx={{ fontSize: 48 }} />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                
                {/* Section 1: Start New Project */}
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
                        {t('projectStarter.startNew.title')}
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'text.primary', mb: 4, fontWeight: 400 }}>
                        {t('projectStarter.startNew.description')}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            variant="contained" 
                            disabled={loading}
                            onClick={handleCreateProject}
                            sx={primaryButtonStyle}
                        >
                            {t('projectStarter.startNew.button')}
                        </Button>
                    </Box>
                </Box>

                <Divider sx={{ borderBottomWidth: 1, borderColor: 'divider' }} />

                {/* Section 2: Add New Use Case */}
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
                        {t('projectStarter.addUseCase.title')}
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'text.primary', mb: 4, fontWeight: 400 }}>
                        {t('projectStarter.addUseCase.description')}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <Box sx={{ width: '100%', maxWidth: 450 }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                                {t('projectStarter.addUseCase.inputLabel')}
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={useCaseName}
                                onChange={(e) => setUseCaseName(e.target.value)}
                                placeholder={t('projectStarter.addUseCase.inputPlaceholder')}
                                disabled={loading}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        bgcolor: 'background.paper'
                                    }
                                }}
                            />
                        </Box>

                        <Button 
                            variant="contained" 
                            disabled={loading || !useCaseName.trim()}
                            onClick={handleAddUseCase}
                            sx={primaryButtonStyle}
                        >
                            {t('projectStarter.addUseCase.button')}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default ProjectStarter;