import { useQuery, gql } from '@apollo/client'
import { useContext } from 'react'
import { userContext } from '../../lib/user'
import styles from '../../styles/Page.module.css'
import CardList from '../../components/cardList'

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
    const { userInfo, userLoading } = useContext(userContext)
    console.log('Cards page', userInfo);

    return (
        <div>
            <h1 className={styles.title}>Test</h1>
            {userInfo?<CardList type={'UserCardsQuery'}/>:<CardList type={'AllCardsQuery'}/>}
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
