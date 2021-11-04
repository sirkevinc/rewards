import { useEffect, useState, createContext } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_CARDS, GET_USER_CARDS, GET_MY_CARDS } from '../lib/cardsQuery'

export const cardsContext = createContext();

export function CardsContextProvider({ children }) {
    const [allCards, setAllCards] = useState([]);
    const [myCards, setMyCards] = useState([]);
    
    const useAllCardsQuery = () => useQuery(GET_ALL_CARDS);
    const useMyCardsQuery = () => useQuery(GET_MY_CARDS);
    
    const allCardsResult = useAllCardsQuery();
    const myCardsResult = useMyCardsQuery();

    const errors = allCardsResult.error || myCardsResult.error;
    const loading = allCardsResult.loading || myCardsResult.loading;

    useEffect(() => {
        console.log('allcards', allCardsResult)
        setAllCards(allCardsResult.data?.allCards)
    }, [allCardsResult]);

    useEffect(() => {
        setMyCards(myCardsResult.data?.me?.cards);
    }, [myCardsResult])

    console.log('Cards Context', allCards, myCards)

    return (
        <cardsContext.Provider value={{ allCards, myCards }}>
            {children}
        </cardsContext.Provider>
    )
}