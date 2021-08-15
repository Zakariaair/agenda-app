<template>
    <div class="navbar">
        <nav>
            <img class="logo" src="@/assets/logo.png">
            <h1>
                <router-link :to="{ name: 'Dashboard' }">Agenda App</router-link>
                    <h6 v-if="user">{{ user.email }}</h6>
                </h1>
            <div class="links">
                <div v-if="user">
                    <button @click="handleLogout">Logout</button>
                </div>
                <div v-else>
                    <router-link class="btn" :to="{ name: 'Auth' }">Login/Signup</router-link>
                </div>
                <span class="material-icons-round theme-toggle" @click="changeTheme" v-if="darkmode">wb_sunny</span>
                <span class="material-icons-round theme-toggle" @click="changeTheme" v-else>bedtime</span>
            </div>
        </nav>
    </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

export default {
    props:['darkmode'],
    setup(props, context) {
        const { logout, error } = useLogout()
        const { user } = getUser()
        const router = useRouter()

        const handleLogout = async () => {
            await logout()
            if(!error.value) {
                router.push({ name: 'Auth' })
            }
        }

        const changeTheme = () => {
            context.emit('changeTheme')
        }

        return { handleLogout, user, changeTheme }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 40px;
    background: white;
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
}
nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;

    h1 {
        margin-left: 20px;
    }
    .links {
        margin-left: auto;
        display: flex;
        align-items: center;

        a, button {
            margin-left: 16px;
            font-size: 14px;
        }

        .theme-toggle {
            margin-left: 20px;
            cursor: pointer;
        }
    }
    .logo {
        max-height: 60px;
    }
}

</style>