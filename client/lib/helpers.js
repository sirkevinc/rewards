// category ranking function
// go through card list
// check that benefit fits category
// if none match, default to alternative or apply to another
// keep track of cardids with match and make record of point value
// maybe create a 'tuple' with result. ex: [{card}, 5]
// display best point matches
// if there are other benefits in category, display those as well

const recommendationSort = (recommendations) => {
    let pointMatches = recommendations['pointMatches'];
    pointMatches = pointMatches.sort((a, b) => b[2] - a[2]);
    recommendations['pointMatches'] = pointMatches;
    return recommendations;
}

export const recommendationFilter = (cards, category) => {
    const recommendationResult = {};
    const pointMatches = [];
    const otherMatches = [];
    for (let i = 0; i < cards.length; i++) {
        for (let j = 0; j < cards[i]['benefits'].length; j++) {
            if (cards[i]['benefits'][j]['category'] === category) {
                if (cards[i]['benefits'][j]['type'] === 'points' || cards[i]['benefits'][j]['type'] === 'cashback') {
                    const currentBenefit = cards[i]['benefits'][j];
                    const totalPoints = cards[i]['benefits'][j]['multiplier'];
                    const pointMatch = [cards[i], currentBenefit, totalPoints];
                    pointMatches.push(pointMatch);
                } else {
                    const currentBenefit = cards[i]['benefits'][j];
                    const otherMatch = [cards[i], currentBenefit];
                    otherMatches.push(otherMatch);
                }
            }
        }
    }
    recommendationResult['pointMatches'] = pointMatches;
    recommendationResult['otherMatches'] = otherMatches;

    const sortedResult = recommendationSort(recommendationResult);
    console.log('brrrr', sortedResult)
    return sortedResult;
}