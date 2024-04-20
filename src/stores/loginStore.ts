import router from '@/router';
import axios from 'axios';
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('Login', () => {

    interface User {
    username:string,
    password:number | null
    }
    
    const user = ref<User>({
      username:'',
      password:null
    })

    const isLogin = ref(false);

    function signIn():void{
      const api=`${import.meta.env.VITE_APP_API}admin/signin`
      axios.post(api, user.value)
        .then((res)=>{
          if(res.data.success){
            const { expired , token } = res.data
            document.cookie=`token=${token}; expires=${new Date(expired)}`
            isLogin.value = true;
            router.push('/dashboard/productcomponent')
          }else{
            console.log('登入失敗')
          }
        })
    }

    return { user, signIn, isLogin };
})
