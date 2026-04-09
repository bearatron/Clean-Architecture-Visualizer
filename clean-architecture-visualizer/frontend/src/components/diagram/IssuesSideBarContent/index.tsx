import { CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useInteractionViolations } from '../../../actions/useAnalysis';
import type { Violation } from '../../../lib/types';
import {
    IssueContainer,
    IssuesRoot,
    ViolationField,
    ViolationFieldLabel,
    ViolationFileContext,
    ViolationType,
    ViolationValue,
    ViolationsList,
    ViolationsTitle,
} from './styles';

type IssuesSideBarContentProps = {
    interactionId?: string;
};

const extractViolations = (data: unknown): Violation[] => {
    if (Array.isArray(data)) {
        return data as Violation[];
    }

    if (data && typeof data === 'object' && 'violations' in data) {
        const wrapped = data as { violations?: unknown };
        if (Array.isArray(wrapped.violations)) {
            return wrapped.violations as Violation[];
        }
    }

    return [];
};

function IssuesSideBarContent({ interactionId }: IssuesSideBarContentProps) {
    const { t } = useTranslation('issuesSideBarContent');
    const { data, isLoading, isError } = useInteractionViolations(interactionId ?? '');
    const violations = extractViolations(data);

    if (!interactionId) {
        return <Typography variant="body2">{t('selectInteraction')}</Typography>;
    }

    if (isLoading) {
        return <CircularProgress size={20} aria-label={t('loading')} />;
    }

    if (isError) {
        return <Typography variant="body2">{t('error')}</Typography>;
    }

    if (!violations.length) {
        return <Typography variant="body2">{t('emptyState')}</Typography>;
    }

    return (
        <IssuesRoot>
            <ViolationsTitle variant="h6">
                {t('title')}
            </ViolationsTitle>
            <ViolationsList>
                {violations.map((violation) => (
                    <IssueContainer key={violation.id}>
                        <ViolationField>
                            <ViolationFieldLabel variant="caption">{t('fields.type')}</ViolationFieldLabel>
                            <ViolationType variant="subtitle2">
                                {t(`types.${violation.type}`, violation.type)}
                            </ViolationType>
                        </ViolationField>

                        <ViolationField>
                            <ViolationFieldLabel variant="caption">{t('fields.message')}</ViolationFieldLabel>
                            <ViolationValue variant="body2">
                                {violation.message}
                            </ViolationValue>
                        </ViolationField>

                        {violation.suggestion ? (
                            <ViolationField>
                                <ViolationFieldLabel variant="caption">{t('fields.suggestion')}</ViolationFieldLabel>
                                <ViolationValue variant="body2">
                                    {violation.suggestion}
                                </ViolationValue>
                            </ViolationField>
                        ) : null}

                        {violation.file_context ? (
                            <ViolationField>
                                <ViolationFieldLabel variant="caption">{t('fields.fileContext')}</ViolationFieldLabel>
                                <ViolationFileContext variant="caption" color="text.secondary">
                                    {`${violation.file_context.file}:${violation.file_context.line_number}`}
                                </ViolationFileContext>
                            </ViolationField>
                        ) : null}
                    </IssueContainer>
                ))}
            </ViolationsList>
        </IssuesRoot>
    );
}

export default IssuesSideBarContent;