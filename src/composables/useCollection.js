import { ref } from 'vue'
import { appFirestore } from '@/firebase/config'

const useCollection = (collection) => {

  const error = ref(null)
  const isPending = ref(false)

  // add a new document
  const addDoc = async (doc) => {
    error.value = null
    isPending.value = true

    try {
      const res = await appFirestore.collection(collection).add(doc)
      isPending.value = false
      return res
    }
    catch(err) {
      console.log(err.message)
      error.value = 'Error on creating document'
      isPending.value = false
    }
  }

  return { error, addDoc, isPending }

}

export default useCollection