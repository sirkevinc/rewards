import Card from '../card';
import { useContext, useState, useEffect } from 'react'
import Filter from '../filter'
import EditUserCards from '../editUserCards'
import { cardsContext } from '../../lib/cards';

import styles from '../../styles/Component.module.css'

export default function CardList({ type }) {
    const { allCards, myCards } = useContext(cardsContext);
    const [displayedCards, setDisplayedCards] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    
    useEffect(() => {
        if (type === 'MyCards') {
            setDisplayedCards(myCards);
        } else {
            setDisplayedCards(allCards);
        }
    }, [myCards, allCards, type])

    // const filterHandler = (type, query) => {
    //     if (type === 'bank') {
    //         setDisplayedCards(displayedCards => {
    //             return displayedCards.filter((card) => {
    //                 return card.bank === query;
    //             })
    //         });
    //     }
    //     if (type === 'categories') {
    //         const filterResults = displayedCards.filter((card) => {
    //             const benefits = card.benefits;
    //             for (let i = 0; i < benefits.length; i++) {
    //                 return benefits[0].category === query;
    //             }
    //         })
    //         setDisplayedCards(filterResults)
    //     }
    // }
    const editToggle = () => {
        setShowEdit(!showEdit);
    }
    
    // if (loading) return <p>Loading...</p>
    // if (error) console.log(error)
    
    console.log('CardList Component', myCards)
    return (
        <div className={styles.cardList__container}>
            {type==='MyCards'&& <button className={styles.edit__button}onClick={editToggle}>{showEdit?'Finish Editing':'Edit'}</button>}
            {showEdit && <EditUserCards show={showEdit} />}
            {displayedCards?
            <div>
                {displayedCards.map((card) => {
                    const { id, bank, name, benefits, summary, description, image } = card;
                    return (
                        <Card 
                            key={id} 
                            id={id}
                            image={image}
                            bank={bank} 
                            name={name} 
                            benefits={benefits} 
                            summary={summary} 
                            description={description} 
                        />
                    )
                })}
            </div>
            :null}
        </div>
    )
}
