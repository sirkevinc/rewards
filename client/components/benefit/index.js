import { useState } from 'react'
import styles from '../../styles/Component.module.css'

export default function Benefit({ category, description, multiplier, summary, type }) {
    const [showDescription, setShowDescription] = useState(false);
    const toggleDescription = () => setShowDescription(!showDescription);

    const capitalize = (string) => {
        const firstChar = string[0].toUpperCase();
        const lastChars = string.slice(1, string.length);

        return firstChar+lastChars;
    }

    return (
        <div className="benefit__container">
            <div className='benefit__details'>
                <p><strong>Category:</strong> {capitalize(category)}</p>
                <p><strong>Summary:</strong> {summary}</p>
                <p><strong>Reward Multiplier:</strong> {multiplier}</p>
                <p><strong>Reward Type:</strong> {capitalize(type)}</p>
            </div>
                <button onClick={() => toggleDescription()}>{showDescription?'Hide details':'Show details'}</button>
            <div className='benefit__description'>
                {showDescription && <p><strong>Description:</strong> {description}</p>}
            </div>
        </div>
    )    
}