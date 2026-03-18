import { Link } from 'react-router-dom';
import { CADiagram } from '../components/diagram';

export default function LearningMode() {
    return (
        <div style={{ padding: '20px' }}>
              <CADiagram />;
            
            <Link to="/">Back to Home</Link>
        </div>
    );
}