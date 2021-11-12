import styles from '../../styles/Component.module.css'
import BenefitsList from '../benefitsList'
import CardModal from '../cardModal'
import { useState } from 'react'

export default function Card(props) {
    console.log('card component props', props)
    const [showBenefits, setShowBenefits] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);
    const toggleBenefits = () => setShowBenefits(!showBenefits);
    return (
        <div className={styles.card__container} onClick={() => toggleModal()}>
            {showModal && <CardModal data={props} />}
            <div>
                <img className={styles.card__image} src={`/images/${props.image}.png`} alt={props.image} />
            </div>
            <div className="card__info">
                <div className="card__info-main">
                    <h3>{props.name}</h3>
                    <h4>{props.bank}</h4>
                </div>
                <div className="card__info-summary">
                    <p>{props.summary}</p>
                </div>
                <button onClick={() => toggleBenefits()}>Toggle Benefits</button>
                {showBenefits && <BenefitsList benefits={props.benefits} />}
            </div>
        </div>
    )
}