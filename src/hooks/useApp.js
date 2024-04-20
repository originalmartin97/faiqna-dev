import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, orderBy, query, limit } from 'firebase/firestore';
import { app } from '../config/firebase';

const db = getFirestore(app);

export const useLatestResponse = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const documentQuery = query(collection(db, 'files'), orderBy('uploaded_at', 'desc'), limit(1));

    const unsubscribe = onSnapshot(documentQuery, (snapshot) => {
      // Update the response state with the data from the first document in the snapshot
      const docData = snapshot.docs[0]?.data();
      if (docData) {
        setResponse(docData.response);
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array means the effect runs once on mount

  return response;
};