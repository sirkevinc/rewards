import { gql, useQuery } from '@apollo/client'

const GET_ALL_CARDS = gql`
    {
        allCards {
            id
            bank
            name
            summary
            description
            rewardType
        }
    }
`

const GET_USER_CARDS = gql`
    query($id: Int!) {
        user(id: $id) {
            cards {
                id
                bank
                name
                summary
                description
                rewardType
                benefits {
                    type
                    category
                    multiplier
                    summary
                    description
                }
            }
        }
    }
` 

const GET_MY_CARDS = gql`
    {
        me {
            cards {
                id
                bank
                name
                summary
                description
                rewardType
            }
        }
    }
`
// const useAllCardsQuery = () => useQuery(GET_ALL_CARDS);
// const useUserCardsQuery = () => useQuery(GET_USER_CARDS);
// const useMyCardsQuery = () => useQuery(GET_MY_CARDS);

export { GET_ALL_CARDS, GET_USER_CARDS, GET_MY_CARDS }