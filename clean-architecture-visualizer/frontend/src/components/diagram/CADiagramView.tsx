// This file is responsible for rendering the Clean Architecture Diagram based on the data passed in as props. 
// It is a pure presentational component that does not contain any logic for fetching data or handling loading/error states.

import { CANodeView, Edge } from './index';
import { CANode, CAEdge } from './../../lib/types';
import { Container, Box, Typography } from '@mui/material';

type CADiagramViewProps = {
    controller: CANode;
    presenter: CANode;
    viewModel: CANode;
    entities: CANode;
    inputData: CANode;
    inputBoundary: CANode;
    interactor: CANode;
    outputBoundary: CANode;
    outputData: CANode;
    dataAccessInterface: CANode;
    view: CANode;
    dataAccess: CANode;
    database: CANode;
    edges: CAEdge[];
};

export function CADiagramView({
    controller,
    presenter,
    viewModel,
    entities,
    inputData,
    inputBoundary,
    interactor,
    outputBoundary,
    outputData,
    dataAccessInterface,
    view,
    dataAccess,
    database,
    edges,
}: CADiagramViewProps) {
    return (
        <><Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4" gutterBottom>
                Clean Architecture Diagram
            </Typography>
            <Container sx={{ border: 2, borderColor: 'grey.600', borderRadius: 8, bgcolor: 'grey.100', py: 3, overflowX: 'auto' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1.1fr 2.1fr 1.1fr', gap: 2, minWidth: 900 }}>
                    <Box sx={{ border: 2, borderColor: 'adapters.contrastText', bgcolor: 'adapters.light', borderRadius: 2, p: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                            Interface Adapters
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%' }}>
                            <CANodeView {...controller} />
                            <CANodeView {...presenter} />
                            <CANodeView {...viewModel} />
                        </Box>
                    </Box>

                    <Box sx={{ border: 2, borderColor: 'useCases.contrastText', bgcolor: 'useCases.light', borderRadius: 2, p: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                            Application Business Rules
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                            <CANodeView {...inputData} />
                            <Box />
                            <CANodeView {...inputBoundary} />
                            <CANodeView {...interactor} />
                            <CANodeView {...outputBoundary} />
                            <Box />
                            <CANodeView {...outputData} />
                            <Box />
                            <Box />
                            <CANodeView {...dataAccessInterface} />
                        </Box>
                    </Box>

                    <Box sx={{ border: 2, borderColor: 'entities.contrastText', bgcolor: 'entities.light', borderRadius: 2, p: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                            Enterprise Business Rules
                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flex: 1,
                                alignItems: 'center',
                                '& > *': {
                                    width: '100%',
                                    flex: 1,
                                },
                            }}
                        >
                            <CANodeView {...entities} />
                        </Box>
                    </Box>
                </Box>

                <Typography variant="subtitle2" sx={{ mt: 2, pt: 2, borderTop: 2, borderColor: 'grey.600', fontWeight: 700 }}>
                    Frameworks and Drivers
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1.5, minWidth: 900 }}>
                    <CANodeView {...view} />
                    <CANodeView {...dataAccess} />
                    <CANodeView {...database} />
                </Box>
            </Container>

            {edges.map((edge) => (
                <Edge key={edge.id} {...edge} />
            ))}
        </Container>
        </>
    );
}