import { useState, useEffect } from 'react'
import { getFirestore, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { app } from '../firebase'
import useStore from '../store'

const db = getFirestore(app)

export const useLatestResponses = () => {
    const [latestResponses, setLatestResponses] = useState([])
    const { areResponsesFetched, setAreResponsesFetched } = useStore()


    useEffect(() => {
        if (!areResponsesFetched) {
            const documentQuery = query(collection(db, 'files'), orderBy('uploaded_at', 'desc'))

            const unsubscribe = onSnapshot(documentQuery, (snapshot) => {
                try {
                    const newResponses = snapshot.docs.map(doc => ({
                        id: doc.id,
                        title: doc.data().parentMessageId,
                        content: doc.data().response
                    }))
                    setLatestResponses(newResponses)
                    setAreResponsesFetched(true)
                    console.log(newResponses)
                } catch (error) {
                    console.error("Error processing snapshot: ", error);
                }
            })

            // Cleanup function to unsubscribe from the listener when the component unmounts
            return () => unsubscribe();
        }
    }, []) // Dependency array is empty as there are no dependencies

    return latestResponses
}