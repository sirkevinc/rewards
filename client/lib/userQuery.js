import { gql, useQuery } from '@apollo/client'

const MeQuery = gql`
    {
        me {
            id
            username
            email
            cards {
                bank
                name
            }
        }
    }
`
export const useMeQuery = () => useQuery(MeQuery);