import { useState, useEffect } from 'react'
import { getFirestore, collection, onSnapshot, orderBy, query, limit as firestoreLimit } from 'firebase/firestore'
import { app } from '../firebase'

const db = getFirestore(app)

export const useLatestResponses = (limit = 1) => {
    const [latestResponses, setLatestResponses] = useState([])

    useEffect(() => {
        const documentQuery = query(collection(db, 'files'), orderBy('uploaded_at', 'desc'), firestoreLimit(limit))

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
    }, [limit]) // Dependency array includes limit to rerun effect when limit changes

    return latestResponses
}