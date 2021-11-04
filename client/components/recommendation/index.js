import { useState } from 'react'

export default function Recommendation(props) {
    const [recommendations, setRecommendations] = useState([]);
    console.log('recommendation component', props);
    return (
        <div>
            The best cards to use for this type of purchase (in order) are:

            {recommendations?.map((card) => {
                const { id, bank, name, benefits} = card;
                return (
                    <Card key={id} id={id} bank={bank} name={name} benefits={benefits} />
                )
            })}
        </div>
    )
}
