import BenefitsList from '../benefitsList'
import styles from '../../styles/Component.module.css'


export default function CardModal({ toggleModal, data: { bank, name, benefits, description, image } }) {
    // console.log('Card modal', props);
    return (
        <div className={styles.cardModal__container}>
            <div className={styles.cardModal__content}>
                <button onClick={() => toggleModal()}>X</button>
                <img src={`/images/${image}.png`} alt={image} />
                <h4>{bank} {name}</h4>
                <p>{description}</p>
                {/* <BenefitsList benefits={benefits} /> */}
            </div>
        </div>
    )
}