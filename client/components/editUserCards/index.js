import { useState, useEffect, useContext } from 'react'
import { userContext } from '../../lib/user'
import { cardsContext } from '../../lib/cards'
import { gql, useQuery, useMutation } from '@apollo/client'
import { GET_MY_CARDS } from '../../lib/cardsQuery'

import styles from '../../styles/Component.module.css'

export default function EditUserCards({ show }) {
    const { userInfo } = useContext(userContext);
    const { allCards, myCards } = useContext(cardsContext);
    const [myCardIds, setMyCardIds] = useState({});
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const addUserCardMutation = gql`
        mutation addUserToCard($cardid: Int!, $userid: Int!) {
            addUserToCard(cardid: $cardid, userid: $userid) {
                success
                message
            }
        }    
    `

    const removeUserCardMutation = gql`
        mutation removeUserFromCard($cardid: Int!, $userid: Int!) {
            removeUserFromCard(cardid: $cardid, userid: $userid) {
                success
                message
            }
        }    
    `

    const addUserCard = useMutation(addUserCardMutation);
    const removeUserCard = useMutation(removeUserCardMutation);
    
    const initializeMyIds = () => {
        if (myCards) {
            for (let i = 0; i < myCards.length; i++) {
                const idObj = { ...myCardIds };
                const cardId = myCards[i].id;
                if (!idObj[cardId]) {
                    idObj[cardId] = true;
                    setMyCardIds(idObj)
                }
            }
        }
    }
    
    const addId = (cardid) => {
        const idObj = { ...myCardIds };
        idObj[cardid] = true;
        setMyCardIds(idObj);
    }
    
    const removeId = (cardid) => {
        const idObj = { ...myCardIds };
        delete idObj[cardid];
        setMyCardIds(idObj);
    }
    
    const editHandler = async (type, cardid, userid, cardData) => {
        if (type === 'add') {
            const addResult = await addUserCard[0]({ 
                variables: { cardid, userid },
                update: cache => {
                    const { me: { cards } } = cache.readQuery({ query: GET_MY_CARDS });
                    const addResult = [...cards, cardData];
                    cache.writeQuery({ 
                        query: GET_MY_CARDS,
                        data: {
                            me: {
                                __typename :"User",
                                cards: addResult
                            }
                        }
                    })
                }
            });
            const success = addResult.data.addUserToCard.success;
            const message = addResult.data.addUserToCard.message; 
            if (success) {
                console.log('success!')
                addId(cardid);
            } else {
                console.error(message)
            }
        }
        if (type === 'remove') {
            const removalResult = await removeUserCard[0]({
                variables: { cardid, userid },
                update: cache => {
                    const { me: { cards } } = cache.readQuery({ query: GET_MY_CARDS });
                    const removeResult = cards.filter(({ id }) => id !== cardid);
                    cache.writeQuery({
                        query: GET_MY_CARDS,
                        data: {
                            me: {
                                __typename :"User",
                                cards: removeResult
                            }
                        }
                    })
                }
            });
            const success = removalResult.data.removeUserFromCard.success;
            const message = removalResult.data.removeUserFromCard.message;
            if (success) {
                console.log(message)
                removeId(cardid);
            } else {
                console.error(message);
            }
        }
    }
    
    const error = addUserCard.error || removeUserCard.error;
    const loading = addUserCard.loading || removeUserCard.loading;
    
    if (loading) return <p>Loading</p>
    if (error) return console.log(error)

    useEffect(() => {
        initializeMyIds();
    }, [myCardIds])
    console.log(myCards, 'slkdjfklsdjfksldkfjkl')
    return (
        <div className={styles.editUserCards__container}>
            {error && <h3 style={{ color: 'red' }}>{error}</h3>}
            <div className="user__cards">
                <h3>My Cards</h3>
                {myCards.map(card => {
                    return (
                        <div key={card.id}>
                            <img src={`/images/${card.image}.png`}/>
                            <p><strong>{card.bank}</strong></p>
                            <p><strong>{card.name}</strong></p>
                            <p>{card.summary}</p>
                            <button className={styles.card__button}onClick={() => editHandler('remove', card.id, userInfo.id, card)}>Remove Card</button>
                        </div>
                    )
                })}
            </div>
            <div className="all__cards">
                <h3>Available Cards</h3>
                {allCards.map(card => {
                    if (myCardIds[card.id]) {
                        return;
                    } else {
                        return (
                            <div key={card.id}>
                                <img src={`/images/${card.image}.png`}/>
                                <p><strong>{card.bank}</strong></p>
                                <p><strong>{card.name}</strong></p>
                                <p>{card.summary}</p>
                                <button className={styles.card__button} onClick={() => editHandler('add', card.id, userInfo.id, card)}>Add Card</button>
                            </div>
                        )
                    }
                })}
            </div>
            {/* <div className="all__cards">
                <h3>Available Cards</h3>
                {allCards.map(card => {
                    if (userCardIds.includes(card.id)) {
                        return;
                    } else {
                        return (
                            <div key={card.id}>
                                <p>{card.id}</p>
                                <p>{card.bank}</p>
                                <p>{card.name}</p>
                                <p>{card.summary}</p>
                                <button onClick={() => editHandler('add', card.id, userInfo.id, card)}>Add Card</button>
                            </div>
                        )
                    }
                })}
            </div> */}
        </div>
    )
}

// 'Remove' button on my cards
// Filter available cards list to not include my cards
// Add button on available cards
// Update My Cards throughout app