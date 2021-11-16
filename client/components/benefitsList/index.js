import Benefit from '../benefit';
import { gql, useQuery } from '@apollo/client'
import { useContext, useState, useEffect } from 'react'
import { userContext } from '../../lib/user'

import styles from '../../styles/Component.module.css'


export default function BenefitsList({ benefits }) {
    // const { userInfo } = useContext(userContext);
    console.log('BenefitsList Component', benefits)
    return (
        <div className="benefitsList__container">
            <h4>Benefits/Rewards:</h4>
            {benefits?benefits.map((benefit) => {
                const { category, description, multiplier, summary, type } = benefit;
                return (
                    <Benefit
                        key={summary}
                        category={category}
                        description={description}
                        multiplier={multiplier}
                        summary={summary}
                        type={type}
                    />
                )
            }):null}
        </div>
    )
}
