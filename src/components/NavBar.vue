<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">首頁</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/DashBoard/ProductComponent" class="nav-link">產品管理</RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="cursor: pointer;" @click.prevent="LogOut">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import axios from 'axios';
import router from '@/router';
// import { useLoginStore } from '@/stores/loginStore';

// const store = useLoginStore();

function LogOut () {
    const api=`${import.meta.env.VITE_APP_API}logout`
    axios.post(api)
    .then((res)=>{
      if(res.data.success){
        router.push('/login')
      }
    })
  }
</script>