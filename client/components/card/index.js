import styles from '../../styles/Home.module.css'
import BenefitsList from '../benefitsList'
import { useState } from 'react'

export default function Card(props) {
    console.log('card component props', props)
    const [showBenefits, setShowBenefits] = useState(false);
    const toggleBenefits = () => setShowBenefits(!showBenefits);
    return (
        <div className="card__container" onClick={() => console.log(props.id)}>
            <div className="card__image">
                Card Image
            </div>
            <div className="card__info">
                <div className="card__info-main">
                    <h3>{props.name}</h3>
                    <h4>{props.bank}</h4>
                    <h4>Card Tagline</h4>

                </div>
                <div className="card__info-summary">
                    <p>Summary blah blah blah</p>
                </div>
                <button onClick={() => toggleBenefits()}>Toggle Benefits</button>
                {showBenefits && <BenefitsList benefits={props.benefits} />}
            </div>
        </div>
    )
}