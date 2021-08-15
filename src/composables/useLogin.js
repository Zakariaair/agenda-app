import { ref } from "vue";
import { appAuth } from "@/firebase/config";

const error = ref(null)

const login = async (email, password) => {
    error.value = null

    try {
        const res = await appAuth.signInWithEmailAndPassword(email, password)
        if (!res) {
            throw new Error('Unable to login. Please try again.')
        }
        return res
    } catch (err) {
        console.log(err.message)
        error.value = 'Credentials is incorrect'
    }
}

const useLogin = () => {
    return { error, login }
}

export default useLogin