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
                    <router-link :to="{ name: 'Dashboard' }">My Agendas</router-link>
                    <button v-if="!isPending" @click="handleLogout">Logout</button>
                    <button v-else disabled>Logging out...</button>
                </div>
                <div v-else>
                    <router-link class="btn" :to="{ name: 'Auth' }">Login/Signup</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'

export default {
    setup() {
        const { logout, error } = useLogout()
        const { user } = getUser()

        const handleLogout = async () => {
            await logout()
            if(!error.value) {
                console.log('user logged out');
            }
        }

        return { handleLogout, user }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 30px;
    background: white;
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

        a, button {
            margin-left: 16px;
            font-size: 14px;
        }
    }
    .logo {
        max-height: 60px;
    }
}

</style>