import { createStore } from 'vuex'
import router from '@/router';

export default createStore({
  state: {
    userName: localStorage.getItem("userName"),
  },
  getters: {

  },
  mutations: {
    setUserInfo(state,userInfo){
      console.log(userInfo);
      
      const { userName } = userInfo
      localStorage.setItem('userName',userName)
      state.userName = localStorage.getItem("userName")!
      console.log(state);

      console.log(localStorage.getItem("userName"));
      
      setTimeout(() => {
        router.push('/home')
      },1000)

    },
     clearUserInfo(state,userInfo){
      localStorage.clear()
      state.userName = ''
      setTimeout(() => {
        router.push('/userlogin')
      },1000)
    },
  },
  actions: {
  },
  modules: {
  }
})
