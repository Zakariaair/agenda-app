<template>
  <nav v-if="user">
      <div>
          <p>Hi there {{ user.displayName }}</p>
      </div>
      <button @click="handleLogout">Logout</button>
  </nav>
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

<style>

</style>