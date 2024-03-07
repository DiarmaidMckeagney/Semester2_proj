import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useChatroomName = defineStore('nameOfRoom', {
  state: () => {
    return {
      name: 'Chatroom 1'
    }
  },
  getters: {
    nameOfRoom(){
      return this.name
    }
  },
  actions: {
    changeName(newName){
      this.name = newName
    }
  },

})
