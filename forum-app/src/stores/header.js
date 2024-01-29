import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', {
  state: () => ({ count: 0, name: 'Home' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
    updateHeaderName(newName){
      console.log('Updating header name:', newName);
      this.name = newName;
    },
  },
})