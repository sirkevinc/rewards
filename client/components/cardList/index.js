import Card from '../card';
import { gql, useQuery } from '@apollo/client'
import { useContext, useState, useEffect } from 'react'
import { userContext } from '../../lib/user'
import Categories from '../categories'

export default function CardList(props) {
    const { userInfo } = useContext(userContext);
    const [displayedCards, setDisplayedCards] = useState([]);
    let query, useCardsQuery;
    if (props.type === 'AllCardsQuery') {
        query = gql`
        {
            allCards {
                id
                bank
                name
            }
        }
        `
        useCardsQuery = () => useQuery(query);
    } else if (props.type === 'UserCardsQuery') {
        query = gql`
        query($id: Int!) {
            user(id: $id) {
                cards {
                    id
                    bank
                    name
                }
            }
        }
        ` 
        useCardsQuery = () => useQuery(query, {
            variables: { id: userInfo.id }
        });
    }
    const { loading, data, error } = useCardsQuery();
    useEffect(() => {
        if (data) {
            setDisplayedCards(cards);
        }
    }, [data]);
    let cards;
    if (data) {
        cards = data.allCards || data.user.cards;
    }
    const clear = () => {
        setDisplayedCards(cards);
    }

    const filterHandler = (bank) => {
        // clear();
        const filterResults = cards.filter((card) => {
            return card.bank === bank;
        })
        setDisplayedCards(filterResults);
    }
    if (loading) return <p>Loading...</p>
    if (error) console.log(error)
    return (
        <div className="cardList__container">
            <Categories filter={filterHandler} />
            <button onClick={clear}>Clear</button>
            {displayedCards?
            <ul>
                {displayedCards.map((card) => {
                    const { id, bank, name } = card;
                    return (
                        <Card key={id} id={id} bank={bank} name={name} />
                    )
                })}
            </ul>
            :null}
        </div>
    )
}
