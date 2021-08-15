<template>
    <div class="auth">
        <div v-if="showLogin">
            <h2>Login to panel</h2>
            <LoginForm @login="goPanel" />
            <p>Don't have an account? <span @click="showLogin = false">Signup</span></p>
        </div>
        <div v-else>
            <h2>Sign up</h2>
            <SignupForm @signup="goPanel" />
            <p>Already signed up? <span @click="showLogin = true">Go to login</span></p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import LoginForm from '@/components/auth/LoginForm.vue'
import SignupForm from '@/components/auth/SignupForm.vue'

export default {
    name: 'Auth',
    components: { LoginForm, SignupForm },
    setup() {
        const showLogin = ref(true)
        const router = useRouter()

        const goPanel = () => {
            router.push({ name: 'Dashboard' })
        }

        return { showLogin, goPanel }
    }
}
</script>

<style lang="scss">
.auth {
    text-align: center;
    padding: 20px 0;

    form {
        width: 300px;
        margin: 20px auto;
    }
    label {
        display: block;
        margin: 20px 0 10px;
    }
    input {
        width: 100%;
        padding: 10px;
        border-radius: 20px;
        border: 1px solid #eee;
        outline: none;
        color: #999;
        margin: 10px auto;
    }
    span {
        font-weight: bold;
        text-decoration: underline;
        cursor: pointer;
    }
    button {
        margin: 20px auto;
    }
}
</style>