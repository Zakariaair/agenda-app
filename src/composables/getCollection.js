import { ref, watchEffect } from 'vue'
import { appFirestore } from '@/firebase/config'

const getCollection = (collection, query) => {

  const documents = ref(null)
  const error = ref(null)

  // set firestore collection reference
  let collectionRef = appFirestore.collection(collection)
    .orderBy('createdAt', 'desc')

  if(query) {
    collectionRef = collectionRef.where(...query)
  }

  const unsub = collectionRef.onSnapshot(snap => {
    let results = []
    snap.docs.forEach(doc => {
      // must wait for the server to create the timestamp & send it back
      // and must prevent adding local snap if createdAt == null
      doc.data().createdAt && results.push({...doc.data(), id: doc.id})
    });
    
    // update data
    documents.value = results
    error.value = null
  }, err => {
    console.log(err.message)
    documents.value = null
    error.value = 'Error on fetch data'
  })

  // invalidate onSnapshot to prevent double object creation
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents }
}

export default getCollection