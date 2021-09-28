import { useQuery, gql } from '@apollo/client'
import styles from '../../styles/Page.module.css'

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
    const { loading, error, data } = useQuery(AllCardsQuery);

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;

    return (
        <div>
            <h1 className={styles.title}>Test</h1>
            <ul>
            {data.allCards.map((card) => {
                return (
                    <li key={card.id}>{card.name}</li>
                )
            })}
            </ul>
        </div>
    )
}

// import styles from '../../styles/Home.module.css'

// export default function Cards() {
//     return (
//             <h1 className={styles.title}>
//                 This is really just a test Cards 
//             </h1>
//     )
// }