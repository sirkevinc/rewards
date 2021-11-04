import Card from '../card';
// import { gql, useQuery } from '@apollo/client'
import { useContext, useState, useEffect } from 'react'
// import { userContext } from '../../lib/user'
import Filter from '../filter'
import EditUserCards from '../editUserCards'
import { cardsContext } from '../../lib/cards';

export default function CardList({ type }) {
    // const { userInfo } = useContext(userContext);
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

    const filterHandler = (type, query) => {
        if (type === 'bank') {
            setDisplayedCards(displayedCards => {
                return displayedCards.filter((card) => {
                    return card.bank === query;
                })
            });
        }
        if (type === 'categories') {
            const filterResults = displayedCards.filter((card) => {
                const benefits = card.benefits;
                for (let i = 0; i < benefits.length; i++) {
                    return benefits[0].category === query;
                }
            })
            setDisplayedCards(filterResults)
        }
    }
    const editToggle = () => {
        setShowEdit(!showEdit);
    }
    
    // if (loading) return <p>Loading...</p>
    // if (error) console.log(error)
    
    console.log('CardList Component', myCards)
    return (
        <div className="cardList__container">
            {/* <Filter filter={filterHandler} type={'banks'} />
            <button onClick={clear}>Clear</button> */}
            {type==='MyCards'&&<button onClick={editToggle}>{showEdit?<p>Finish Editing</p>:<p>Edit My Cards</p>}</button>}
            {showEdit && <EditUserCards show={showEdit} />}
            {displayedCards?
            <ul>
                {displayedCards.map((card) => {
                    const { id, bank, name, benefits } = card;
                    return (
                        <Card key={id} id={id} bank={bank} name={name} benefits={benefits} />
                    )
                })}
            </ul>
            :null}
        </div>
    )
}

// let query, useCardsQuery;
// if (props.type === 'AllCardsQuery') {
//     query = gql`
//     {
//         allCards {
//             id
//             bank
//             name
//             summary
//             description
//             rewardType
//             benefits {
//                 type
//                 category
//                 multiplier
//                 summary
//                 description
//             }
//         }
//     }
//     `
//     useCardsQuery = () => useQuery(query);
// } else if (props.type === 'UserCardsQuery') {
//     query = gql`
//     query($id: Int!) {
//         user(id: $id) {
//             cards {
//                 id
//                 bank
//                 name
//                 summary
//                 description
//                 rewardType
//                 benefits {
//                     type
//                     category
//                     multiplier
//                     summary
//                     description
//                 }
//             }
//         }
//     }
//     ` 
//     useCardsQuery = () => useQuery(query, {
//         variables: { id: userInfo.id }
//     });
// }
// const { loading, data, error } = useCardsQuery();

// useEffect(() => {
//     if (data) {
//         setDisplayedCards(cards);
//     }
// }, [data]);