import { useState } from 'react'
import { recommendationFilter } from '../../lib/helpers'
import Card from '../card'

export default function Recommendation({ category, cards }) {
    const { pointMatches, otherMatches } = cards;
    console.log('Recommendation component', otherMatches, pointMatches)
    return (
        <div>
            The best cards to use for {category} purchases (in order) are:

            <h3>Best for points/cashback:</h3>

            <ul>
                {pointMatches.map((match) => {
                    const { id, bank, name, benefits} = match[0];
                    const benefit = match[1];
                    const reward = match[2];
                    return (
                        <li key={id}>
                            <Card id={id} bank={bank} name={name} benefits={benefits} />
                            <h3>{reward}x points per dollar spent</h3>
                            <p>{benefit.summary}</p>
                            <p>{benefit.description}</p>
                        </li>
                    )
                })}
            </ul>

            <h3>Other {category} benefits you might enjoy:</h3>
                {otherMatches.map((match) => {
                    const { id, bank, name, benefits} = match[0];
                    const benefit = match[1];
                    return (
                        <li key={id}>
                            <Card id={id} bank={bank} name={name} benefits={benefits} />
                            <p>{benefit.summary}</p>
                            <p>{benefit.description}</p>
                        </li>
                    )
                })}
        </div>
    )
}
