import { gql, useQuery } from '@apollo/client'

const MeQuery = gql`
    {
        me {
            id
            username
            email
        }
    }
`
export const useMeQuery = () => useQuery(MeQuery);