import { useState, useEffect } from 'react'
import { getFirestore, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { app } from '../firebase'

const db = getFirestore(app)

export const useLatestResponse = () => {
  const [responses, setResponses] = useState([])

  useEffect(() => {
    const documentQuery = query(collection(db, 'files'), orderBy('uploaded_at', 'desc'))

    const unsubscribe = onSnapshot(documentQuery, (snapshot) => {
      const newResponses = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().parentMessageId,
        content: doc.data().response
      }))
      setResponses(newResponses)
    })

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []) // Empty dependency array means the effect runs once on mount

  return responses
}