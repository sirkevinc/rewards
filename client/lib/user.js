import { useEffect, useState, createContext } from 'react'
import { useAuth } from '../lib/auth'
import { CardsContextProvider } from '../lib/cards'

export const userContext = createContext();

export function UserContextProvider({ children }) {
    const { isSignedIn } = useAuth();
    const [userInfo, setUserInfo] = useState();
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async() => {
            const currentUser = await isSignedIn();
            if (currentUser) {
                console.log('User Context', currentUser, userLoading);
                setUserInfo(currentUser);
                setUserLoading(false);
            }
        }
        fetchUser().catch(console.error);
    }, []);

    return (
        <userContext.Provider value={{ userInfo, setUserInfo, userLoading, setUserLoading }}>
            <CardsContextProvider>
                {children}
            </CardsContextProvider>
        </userContext.Provider>
    )
}