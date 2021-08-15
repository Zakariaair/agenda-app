import { ref } from "vue";
import { appAuth } from "@/firebase/config";

const error = ref(null)

const signup = async (email, password, displayName) => {
    error.value = null

    try {
        const res = await appAuth.createUserWithEmailAndPassword(email, password)
        if (!res) {
            throw new Error('It is not possible to signup. Please try again.')
        }
        await res.user.updateProfile({ displayName })

        return res
    } catch (err) {
        console.log(err.message)
        error.value = err.message
    }
}

const useSignup = () => {
    return { error, signup }
}

export default useSignup