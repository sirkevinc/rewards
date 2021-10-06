import styles from '../../styles/Home.module.css'

export default function Card(props) {
    console.log('card component props', props)
    return (
        <div className="card__container">
            <div className="card__image">
                Card Image
            </div>
            <div className="card__info">
                <div className="card__info-main">
                    <h3>{props.name}</h3>
                    <h4>{props.bank}</h4>
                    <h4>Card Tagline</h4>
                </div>
                <div className="card__info-description">
                    <p>Description blah blah blah</p>
                </div>
            </div>
        </div>
    )
}