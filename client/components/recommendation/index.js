import { useState } from 'react'
import { recommendationFilter } from '../../lib/helpers'
import Card from '../card'

import styles from '../../styles/Component.module.css'

export default function Recommendation({ category, cards }) {
    const { pointMatches, otherMatches } = cards;
    console.log('Recommendation component', otherMatches, pointMatches)
    return (
        <div className={styles.recommendation__container}>
            The best cards to use for {category} purchases (in order) are:
            {pointMatches.length !== 0 ? <div>
            
            <h3>Best for points/cashback:</h3>
                {pointMatches.map((match) => {
                    const { id, bank, name, benefits, image} = match[0];
                    const benefit = match[1];
                    const reward = match[2];
                    return (
                        <div key={id}>
                            <Card id={id} bank={bank} name={name} benefits={benefits} image={image} />
                            <h3>{reward}x per dollar spent on {category}</h3>
                            <p>{benefit.summary}</p>
                            <p>{benefit.description}</p>
                        </div>
                    )
                })}
            </div>: <h3>No cards found that offer bonus rewards for {category} purchases</h3>
            }
            {otherMatches.length !== 0 &&
                <div>
                    <h3>Other {category} benefits you might enjoy:</h3>
                        {otherMatches.map((match) => {
                            const { id, bank, name, benefits, image} = match[0];
                            const benefit = match[1];
                            return (
                                <li key={id}>
                                    <Card id={id} bank={bank} name={name} benefits={benefits} image={image} />
                                    <p>{benefit.summary}</p>
                                    <p>{benefit.description}</p>
                                </li>
                            )
                        })}
                </div>
            }
        </div>
    )
}
