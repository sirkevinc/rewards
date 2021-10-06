import Card from '../card';
import { gql, useQuery } from '@apollo/client'
import { useContext } from 'react'
import { userContext } from '../../lib/user'

export default function CardList(props) {
    const { userInfo } = useContext(userContext);
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
                    }
                }
            }
        ` 
        useCardsQuery = () => useQuery(query, {
            variables: { id: 20 }
        });
    }

    const { loading, data, error } = useCardsQuery();
    let cards;
    if (data) {
        cards = data.allCards || data.user.cards;
    }
    if (loading) return <p>Loading...</p>
    return (
        <div className="cardList__container">
            {data?
            <ul>
                {cards.map((card) => {
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
