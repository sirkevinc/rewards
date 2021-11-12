import { useState } from 'react'

export default function Benefit({ category, description, multiplier, summary, type }) {
    const [showDescription, setShowDescription] = useState(false);
    const toggleDescription = () => setShowDescription(!showDescription);

    return (
        <div className="benefit__container">
            <div className='benefit__details'>
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Summary:</strong> {summary}</p>
                <p><strong>Reward Multiplier:</strong> {multiplier}</p>
                <p><strong>Reward Type:</strong> {type}</p>
            </div>
                <button onClick={() => toggleDescription()}>{showDescription?'Hide details':'Show details'}</button>
            <div className='benefit__description'>
                {showDescription && <p><strong>Description:</strong> {description}</p>}
            </div>
        </div>
    )    
}