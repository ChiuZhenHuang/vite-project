<template>
  <UserNavBar/>
  <div class="container">
    <div class="card mt-4 text-center" style="width: 100%;">
      <div class="row">
        <div class="card-body col-md-6 col-lg-4  col-xl-3" v-for="item in product" :key="item.id">
          <img style="height: 100px;width: 100px;" :src="item.imageUrl" class="card-img-top" alt="...">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.category }}</p>
          <p class="card-text">原價： NT${{ item.price }}</p>
          <p class="card-text">特價： NT${{ item.origin_price }}</p>
          <div class="d-flex flex-column">
            <a href="#" class="btn btn-primary">詳細介紹</a>
            <a href="#" class="btn btn-primary">加入購物車</a>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style>
table {
  width: 100%;
  table-layout: fixed;
}
td {
  width: auto;
}
.card-body {
  flex: none;
}
</style>

<script setup lang="ts">
import UserNavBar from '@/components/UserNavBar.vue';
import axios from 'axios';
import { ref } from 'vue'

interface item {
  id:string,
  category:string,
  title:string,
  origin_price:number,
  price:number,
  imageUrl:string
}

const product = ref<item[]>([])

const api=`${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`

axios.get(api).
  then((res)=>{
    console.log(res)
    product.value = res.data.products
  })
</script>