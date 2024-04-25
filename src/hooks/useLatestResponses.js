import { useState, useEffect } from 'react'
import { getFirestore, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { app } from '../firebase'
import useStore from '../store'

const db = getFirestore(app)

export const useLatestResponses = () => {
    const [latestResponses, setLatestResponses] = useState([])


    useEffect(() => {
        const documentQuery = query(collection(db, 'files'), orderBy('uploaded_at', 'desc'))

        const unsubscribe = onSnapshot(documentQuery, (snapshot) => {
            const newResponses = snapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().parentMessageId,
                content: doc.data().response
            }))
            setLatestResponses(newResponses)

        })

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, []) // Dependency array is empty as there are no dependencies

    return latestResponses
}