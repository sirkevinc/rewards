import { useQuery, gql } from '@apollo/client'
import { useEffect, useState, useContext } from 'react'
import { userContext } from '../../lib/user'
import styles from '../../styles/Page.module.css'
import CardList from '../../components/cardList'


export default function Cards() {
    const { userInfo } = useContext(userContext);
    const [listType, setListType] = useState('AllCards');
    const [showEdit, setShowEdit] = useState(false); 
    
    useEffect(() => {
        if (userInfo) {
            setListType('MyCards');
        }
    }, [userInfo])
    
    const allSwitch = () => {
        if (listType === 'MyCards') {
            setListType('AllCards');
        } else {
            setListType('MyCards')
        }
    }

    console.log('Cards page');

    return (
        <div className={styles.content}>
            <h1 className={styles.cards__title}>Credit Cards</h1>
            {userInfo?
                <div>
                    <button onClick={allSwitch}>{listType==='MyCards'?<b>Show All</b>:<b>Show My Cards</b>}</button>
                    {listType === 'MyCards'? <h3>My Cards</h3>:<h3>All Cards</h3>}
                </div>:<div>Displaying All</div>}
                <CardList type={listType} />
        </div>
    )
}
