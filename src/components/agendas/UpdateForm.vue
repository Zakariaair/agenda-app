<template>
  <h3 class="text-subject">Update agenda</h3>
  <hr class="text-subject">
  <form @submit.prevent="handleSubmit" >
    <label>Title</label>
    <input type="text" required v-model="title">
    <label>Date</label>
    <input type="date" required v-model="date">
    <label>Description</label>
    <textarea required v-model="description"></textarea>

    <div class="error">{{ error }}</div>

    <button v-if="!isPending">Update</button>
    <button v-else disabled>Sending...</button>
  </form>
</template>

<script>
import useDocument from "@/composables/useDocument"
import { twoDigitsDate } from "@/composables/filters"
import { timestampFromDate } from "@/firebase/config"
import { ref } from 'vue'

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    }
  },
  emits: ['onSave'],
  setup(props) {
    console.log(props.data);
    const { error, updateDoc, isPending } = useDocument('agendas', props.data.id)
      
    const title = ref('')
    const date = ref('')
    const description = ref('')

    title.value = props.data.title
    description.value = props.data.description
    date.value = twoDigitsDate(props.data.date.toDate())

    return {
      title, date, description,
      error, updateDoc, isPending
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
        date: timestampFromDate(new Date(this.date))
      }
      await this.updateDoc(agenda)
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
      return true
    },
    clear() {
      this.title = ''
      this.date = ''
      this.description = ''
    },
  }
}
</script>

<style scoped>
form {
    margin-top: 20px;
}
</style>