import styles from '../../styles/Home.module.css'
import { useState, useContext } from 'react'
import { cardsContext } from '../../lib/cards'
import Recommendation from '../../components/recommendation'

export default function Recommendations() {
    const { myCards } = useContext(cardsContext);
    const [showRecs, setShowRecs] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();
    const categories = ['Dining', 'Entertainment', 'Airlines', 'Hotels', 'Other Travel', 'Groceries', 'General Purchase'];
    console.log('Recommendation page', myCards);
    return (
        <div>
            <h1 className={styles.title}>
                Recommendations
            </h1>
            <button onClick={() => setShowRecs(!showRecs)}>Show Recs</button>
            <p>What are you trying to use your credit card for?</p>
            {categories.map((category) => <p key={category }onClick={() => setSelectedCategory(category)}>{category}</p>)}
            {showRecs && <Recommendation category={selectedCategory}/>}
        </div>
    )
}
