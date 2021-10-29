export default function Filter ({ filter, type }) {
    const banks = ['Amex', 'Chase', 'Bank of America', 'Discover', 'Travel', 'Restaurants', 'Hotels', 'Misc']
    const categories = ['Travel', 'Restaurants', 'Misc', 'Hotels']
    let filterBy;
    if (type === 'banks') filterBy = banks;
    if (type === 'categories') filterBy = categories;
    return (
        <div className="filter__container">
            {filterBy.map((element) => {
                return (
                    <button key={element} onClick={() => filter('bank', element)}>
                        {element}
                    </button>
                )
            })}
            {/* {banks.map((bank) => {
                return (
                    <button key={bank} onClick={() => filter(bank)}>
                        {bank}
                    </button>
                )
            })} */}
        </div>
    )
}