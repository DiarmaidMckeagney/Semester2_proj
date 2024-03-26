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

export const useUserId = defineStore('userId', {
  state: () => {
    return {
      userId: "profile"
    }
  },
  getters: {
    getUserId(){
      return this.userId
    }
  },
  actions: {
    changeName(newUid){
      this.userId = newUid
    }
  },
})

export const useCommunityName = defineStore('nameOfRoom', {
  state: () => {
    return {
      name: 'Community 1'
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

export const useFriendId = defineStore('friendId', {
  state: () => {
    return {
      friendId: "id"
    }
  },
  getters: {
    getFriendId(){
      return this.friendId;
    }
  },
  actions: {
    changeFriendId(newFriendId){
      this.friendId = newFriendId;
    }
  }
})
