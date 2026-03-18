import { Link, useParams } from 'react-router-dom';
import Header from '../components/common/Header';

export default function UseCaseInteractionCode() {
    const { useCaseId, interactionId } = useParams();
    return (
        <div className="use-case-interaction-code">
            <Header />
            <main className="page-content">
                <section>
                    <p>
                        {useCaseId && interactionId
                            ? `Code for Use Case ${useCaseId}, Interaction ${interactionId}`
                            : 'Explore the use case interactions and their code implementations.'}
                    </p>
                    <Link
                        to={useCaseId && interactionId
                            ? `/use-case/${useCaseId}/interaction/${interactionId}/diagram`
                            : '/use-case-interaction-diagram'}
                        className="btn btn-primary"
                    >
                        View Use Case Interaction Diagram
                    </Link>
                </section>
            </main>
        </div>
    );
};