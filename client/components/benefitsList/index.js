import Benefit from '../benefit';
import { gql, useQuery } from '@apollo/client'
import { useContext, useState, useEffect } from 'react'
import { userContext } from '../../lib/user'


export default function BenefitsList({ benefits }) {
    const { userInfo } = useContext(userContext);
    console.log(benefits)
    return (
        <div className="benefitsList__container">
            {benefits?'test':null}
        </div>
    )
}
