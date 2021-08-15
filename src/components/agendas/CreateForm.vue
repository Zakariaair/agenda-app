<template>
  <h3 class="text-subject">Create new agenda</h3>
  <hr class="text-subject">
  <form @submit.prevent="handleSubmit" >
    <label>Title</label>
    <input type="text" required v-model="title">
    <label>Date</label>
    <input type="date" required v-model="date">
    <label>Description</label>
    <textarea required v-model="description"></textarea>

    <div class="error">{{ error }}</div>

    <button v-if="!isPending">Create</button>
    <button v-else disabled>Sending...</button>
  </form>
</template>

<script>
import useCollection from "@/composables/useCollection"
import getUser from "@/composables/getUser"
import { timestamp, timestampFromDate } from "@/firebase/config"
import { ref } from 'vue'

export default {
  emits: ['onSave'],
  setup() {
    const { error, addDoc, isPending } = useCollection('agendas')
    const { user } = getUser()

    const title = ref('')
    const date = ref('')
    const description = ref('')

    return {
      title, date, description,
      error, addDoc, isPending, user
    }
  },
  methods: {
    async handleSubmit() {
      if(!this.validate()) {
        return
      }
      const agenda = {
        title: this.title,
        description: this.description,
        date: timestampFromDate(new Date(this.date)),
        status: false, // not completed
        userId: this.user.uid,
        createdAt: timestamp()
      }
      await this.addDoc(agenda)
      if(!this.error) {
        this.clear()
        this.$emit('onSave')
      }
    },
    validate() {
      this.error = ''
      if(this.title.length < 3) {
        this.error = 'title is too short'
        return false
      } else if(this.title.length > 100) {
        this.error = 'title is too long. allowable length is 100 char'
        return false
      }
      if(this.description.length < 3) {
        this.error = 'description is too short'
        return false
      } else if(this.description.length > 500) {
        this.error = 'description is too long. allowable length is 500 char'
        return false
      }
    },
    clear() {
      this.title = ''
      this.date = ''
      this.description = ''
    }
  }
}
</script>

<style scoped>
form {
    margin-top: 20px;
}
</style>