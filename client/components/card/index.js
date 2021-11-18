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
        <div className={styles.card__container}>
            <div className={`${showModal && styles.cardModal__background}`}>
                {showModal && <CardModal data={props} toggleModal={() => toggleModal()} />}
            </div>
            <div onClick={() => toggleModal()}>
                <img className={styles.card__image} src={`/images/${props.image}.png`} alt={props.image} />
            </div>
            <div className={styles.card__info}>
                <div className={styles.card__info['-main']}>
                    <h3>{props.name}</h3>
                    <h4>{props.bank}</h4>
                </div>
                <div className={styles.card__info['-summary']}>
                    <p>{props.summary}</p>
                </div>
                <button className={styles.card__button} onClick={() => toggleBenefits()}>{showBenefits?'Hide Benefits':'Show All Benefits'}</button>
                {showBenefits && <BenefitsList benefits={props.benefits} />}
            </div>
        </div>
    )
}