<template>
  <div class="container-fluid login">
    <div class="row">
      <div class="col-12">
        <form action="#" @submit.prevent="signIn">
          <label for="username">username</label>
          <input type="email" name="username" id="username" v-model="user.username">
          <label for="password">password</label>
          <input type="password" name="password" id="password" v-model="user.password">
          <button type="submit" class="btn btn-dark">登入</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useLoginStore } from '@/stores/loginStore';
import { storeToRefs } from 'pinia';

const store = useLoginStore();
const { user } = storeToRefs(store);
const { signIn } = store;

</script>

<style>
.login{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: antiquewhite;
}
</style>