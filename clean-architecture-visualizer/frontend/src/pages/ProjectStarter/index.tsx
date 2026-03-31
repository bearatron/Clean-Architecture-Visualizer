import { useState } from 'react';
import { Box, Divider, IconButton } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGenerateProject, useCreateUseCase } from '../../actions/useTemplate';
import {
  PageWrapper,
  Section,
  Title,
  Description,
  ActionCenter,
  DarkButton,
  InputContainer,
  FieldLabel,
  StyledTextField,
} from './layout';

const ProjectStarter = () => {
    const { t } = useTranslation("projectStarter");
    const [useCaseName, setUseCaseName] = useState('');
    
    const { mutate: triggerGenerate, isPending: isGenerating } = useGenerateProject();
    const { mutate: triggerCreateUseCase, isPending: isCreating } = useCreateUseCase();

    const isWorking = isGenerating || isCreating;

    const handleCreateProject = () => {
        triggerGenerate(undefined, {
            onSuccess: (data) => console.log(data.message),
            onError: (err) => console.error("Failed to create project", err)
        });
    };

    const handleAddUseCase = () => {
        if (!useCaseName.trim()) return;
        triggerCreateUseCase(useCaseName, {
            onSuccess: () => setUseCaseName(''),
            onError: (err) => console.error("Failed to add use case", err)
        });
    };

    return (
        <PageWrapper maxWidth="md">
            <Box sx={{ mb: 8 }}>
                <IconButton component={Link} to="/" sx={{ color: 'text.primary', p: 0 }}>
                    <HomeOutlinedIcon sx={{ fontSize: 48 }} />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* Section 1: Start New Project */}
                <Section>
                    <Title variant="h4">{t('startNew.title')}</Title>
                    <Description variant="h5">{t('startNew.description')}</Description>
                    <ActionCenter>
                        <DarkButton 
                            variant="contained" 
                            disabled={isWorking}
                            onClick={handleCreateProject}
                        >
                            {isGenerating ? t('startNew.loading') : t('startNew.button')}
                        </DarkButton>
                    </ActionCenter>
                </Section>

                <Divider />

                {/* Section 2: Add New Use Case */}
                <Section>
                    <Title variant="h4">{t('addUseCase.title')}</Title>
                    <Description variant="h5">{t('addUseCase.description')}</Description>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <InputContainer>
                            <FieldLabel variant="body2">
                                {t('addUseCase.inputLabel')}
                            </FieldLabel>
                            <StyledTextField
                                fullWidth
                                size="small"
                                value={useCaseName}
                                onChange={(e) => setUseCaseName(e.target.value)}
                                placeholder={t('addUseCase.inputPlaceholder')}
                                disabled={isWorking}
                            />
                        </InputContainer>

                        <DarkButton 
                            variant="contained" 
                            disabled={isWorking || !useCaseName.trim()}
                            onClick={handleAddUseCase}
                        >
                            {isCreating ? t('addUseCase.loading') : t('addUseCase.button')}
                        </DarkButton>
                    </Box>
                </Section>
            </Box>
        </PageWrapper>
    );
}

export default ProjectStarter;