import styles from '../../styles/Home.module.css'
import { useState, useContext } from 'react'
import { cardsContext } from '../../lib/cards'
import Recommendation from '../../components/recommendation'

import { recommendationFilter } from '../../lib/helpers'

export default function Recommendations() {
    const { myCards } = useContext(cardsContext);
    const [showRecs, setShowRecs] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();
    const [recommendations, setRecommendations] = useState([]);
    const categories = ['dining', 'entertainment', 'airlines', 'hotels', 'travel', 'groceries', 'shopping', 'general purchase'];
    console.log('Recommendation page', selectedCategory, myCards);

    const categoryClickHandler = (category) => {
        setShowRecs(true);
        setSelectedCategory(category);
        setRecommendations(recommendationFilter(myCards, category));
    }

    return (
        <div>
            <h1 className={styles.title}>
                Recommendations
            </h1>
            <p>What are you trying to use your credit card for?</p>
            {categories.map((category) => 
                <p 
                    key={category} 
                    onClick={() => categoryClickHandler(category)}
                >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                </p>
            )}
            {showRecs && <Recommendation category={selectedCategory} cards={recommendations} />}
        </div>
    )
}
