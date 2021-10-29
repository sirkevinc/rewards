import { useEffect, useState, useContext, createContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import { userContext } from './user'
import { GET_ALL_CARDS, GET_USER_CARDS, GET_MY_CARDS } from '../lib/cardsQuery'

export const cardsContext = createContext();

export function CardsContextProvider({ children }) {
    // const { userInfo }  = useContext(userContext);
    const [allCards, setAllCards] = useState([]);
    const [myCards, setMyCards] = useState([]);

    // const useUserCardsQuery = () => useQuery(GET_USER_CARDS, {
    //     variables: { id: userInfo?.id || 0 }
    // });
    const useAllCardsQuery = () => useQuery(GET_ALL_CARDS);
    const useMyCardsQuery = () => useQuery(GET_MY_CARDS);
    
    // const user = useUserCardsQuery();
    const allCardsResult = useAllCardsQuery();
    const myCardsResult = useMyCardsQuery();

    useEffect(() => {
        setAllCards(allCards => allCardsResult.data?.allCards);
        setMyCards(userCards => myCardsResult.data?.me?.cards);
    }, [allCardsResult, myCardsResult]);

    console.log('Cards Context', allCards, myCards)

    return (
        <cardsContext.Provider value={{ allCards, setAllCards, myCards, setMyCards }}>
            {children}
        </cardsContext.Provider>
    )
}