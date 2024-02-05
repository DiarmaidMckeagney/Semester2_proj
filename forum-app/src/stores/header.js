import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', {
  state: () => ({ name: 'Home' }),
  getters: {},
  actions: {
    updateHeaderName(newName){
      console.log('Updating header name:', newName);
      this.name = newName;
    },
  },
})