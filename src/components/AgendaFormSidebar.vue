<template>
  <div class="sidebar">
      <div v-if="isSidebarActiveLocal" @click="closeSidebar" class="sidebar-backdrop"></div>
      <transition name="slide">
          <div class="sidebar-panel" v-if="isSidebarActiveLocal">
              <h3 class="text-subject">Create new agenda</h3>
              <hr class="text-subject">
              <form @submit.prevent="handleSubmit">
                <label>Title</label>
                <input type="text" required v-model="title">
                <label>Date</label>
                <input type="datetime" required v-model="date">
                <label>Description</label>
                <textarea required v-model="description"></textarea>

                <button>Create</button>
              </form>
          </div>
      </transition>
  </div>
</template>

<script>
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
      return {
            title: '',
            date: '',
            description: '',
      }
  },
  watch: {
    isSidebarActive(val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.clear()
      } else {
        this.reset()
      }
    },
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar")
          this.clear()
        }
      },
    }
  },
  methods: {
    handleSubmit() {
        console.log('form submited');
    },
    clear() {
    },
    reset() {
    },

    closeSidebar() {
      if (this.isSidebarActiveLocal) this.isSidebarActiveLocal = false
    }
  }
}
</script>

<style lang="scss" scoped>

// .slide-enter {
// }
.slide-enter-active {
    animation: slide-in 0.3s ease-out forwards;
}
// .slide-leave {
// }
.slide-leave-active {
    animation: slide-out 0.3s ease-out forwards;
}

@keyframes slide-in {
    from { transform: translateX(-100%); }
    to { transform: translateX(0%); }
}
@keyframes slide-out {
    from { transform: translateX(0%); }
    to { transform: translateX(-100%); }
}

.sidebar-backdrop {
    background-color: rgba(0,0,0,.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
}

.sidebar-panel {
    overflow-y: auto;
    background-color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    height: calc(100vh - 60px);
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 300px;
}

form {
    margin-top: 20px;
}
</style>