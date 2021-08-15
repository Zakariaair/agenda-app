import { ref } from 'vue'
import { appFirestore } from '@/firebase/config'

const useDocument = (collection, id) => {

  const error = ref(null)
  const isPending = ref(false)

  let docRef = appFirestore.collection(collection).doc(id)
  
  const updateDoc = async (updates) => {
    error.value = null
    isPending.value = true
    
    try {
      const res = await docRef.update(updates)
      isPending.value = false
      return res
    }
    catch(err) {
      console.log(err.message)
      error.value = 'Could not update the document'
      isPending.value = false
    }
  }

  const deleteDoc = async () => {
    error.value = null
    isPending.value = true

    try {
      const res = await docRef.delete()
      isPending.value = false
      return res
    }
    catch(err) {
      console.log(err.message)
      error.value = 'Could not delete the document'
      isPending.value = false
    }
  }
  
  return { error, deleteDoc, updateDoc, isPending }

}

export default useDocument