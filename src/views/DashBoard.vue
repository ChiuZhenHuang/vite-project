<template>
  <NavBar/>
  <router-view/>
</template>

<script setup>
  import axios from 'axios';
  import router from '@/router';
  import NavBar from '@/components/NavBar.vue';

  // 取得存在cookie內 Token中的token
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
  // 將token資料帶入http標頭(headers)中驗證
  axios.defaults.headers.common['Authorization'] = token;

  const api = `${import.meta.env.VITE_APP_API}api/user/check`
    axios.post(api)
      .then((res) => {
        if (!res.data.success) {
          router.push('/login')
        }
      })
      
</script>
