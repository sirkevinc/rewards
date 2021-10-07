import { useQuery, gql } from '@apollo/client'
import { useEffect, useState, useContext } from 'react'
import { userContext } from '../../lib/user'
import styles from '../../styles/Page.module.css'
import CardList from '../../components/cardList'
import Categories from '../../components/categories'

const AllCardsQuery = gql`
    {
        allCards {
            id
            bank
            name
        }
    }
`

export default function Cards() {
    const { userInfo, userLoading } = useContext(userContext);
    const [queryType, setQueryType] = useState('AllCardsQuery');
    console.log('Cards page', userInfo);

    // if (userInfo && !userLoading && queryType !== 'UserCardsQuery') {
    //     setQueryType('UserCardsQuery');
    // }
    useEffect(() => {
        if (userInfo) {
            setQueryType('UserCardsQuery');
        }
    }, [userInfo])

    const allSwitch = () => {
        if(queryType === 'UserCardsQuery') {
            setQueryType('AllCardsQuery');
        } else {
            setQueryType('UserCardsQuery')
        }
    }

    const filterHandler = () => {
    }
    console.log(queryType)
    return (
        <div>
            <h1 className={styles.title}>Test</h1>
            {userInfo?
                <div>
                    <button onClick={allSwitch}>{queryType==='UserCardsQuery' ? <b>Show All</b>: <b>Show My Cards</b>}</button>
                    {queryType === 'UserCardsQuery'? <h3>My Cards</h3>:<h3>All Cards</h3>}
                    
                </div>:<div>All Cards</div>}
                {/* <Categories /> */}
                <CardList type={queryType} />
                {/* {userInfo?<CardList type={'UserCardsQuery'}/>:<CardList type={'AllCardsQuery'}/>} */}
            {/* <ul>
            {data.allCards.map((card) => {
                return (
                    <li key={card.id}>{card.name}</li>
                )
            })}
            </ul> */}
        </div>
    )
}
