import { useState } from 'react'

export default function Benefit({ category, description, multiplier, summary, type }) {
    const [showDescription, setShowDescription] = useState(false);
    console.log('benny')
    const toggleDescription = () => setShowDescription(!showDescription);

    return (
        <div className="benefit__container">
            <p>Category: {category}</p>
            <p>Summary: {summary}</p>
            <p>Reward Multiplier: {multiplier}</p>
            <p>Reward Type: {type}</p>
            <div>
                <button onClick={() => toggleDescription()}>Toggle Description</button>
                {showDescription && <p>Description: {description}</p>}
            </div>
        </div>
    )    
}