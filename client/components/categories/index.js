export default function Category({ filter }) {
    const banks = ['Amex', 'Chase', 'Bank of America', 'Discover']
    return (
        <div>
            {banks.map((bank) => {
                return (
                    <button key={bank} onClick={() => filter(bank)}>
                        {bank}
                    </button>
                )
            })}
        </div>
    )
}