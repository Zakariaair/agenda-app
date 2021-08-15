<template>
  <div class="sidebar">
      <div v-if="isSidebarActiveLocal" @click="closeSidebar" class="sidebar-backdrop"></div>
      <transition name="slide">
          <div class="sidebar-panel" v-if="isSidebarActiveLocal">
            <CreateForm v-if="!isEditMode" @onSave="closeSidebar" />
            <UpdateForm v-else :data="data" @onSave="closeSidebar" />
          </div>
      </transition>
  </div>
</template>

<script>
import CreateForm from './CreateForm.vue'
import UpdateForm from './UpdateForm.vue'

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
  components: { CreateForm, UpdateForm },
  watch: {
    isSidebarActive(val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        // this.clear()
      } else {
        // this.reset()
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
          // this.clear()
        }
      },
    },
    isEditMode() {
      return (this.data.id !== undefined)
    },
  },
  methods: {
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
</style>