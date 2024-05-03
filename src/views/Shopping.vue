<template>
  <div class="container">
    <div v-if="loading" style="display: flex; justify-content: center; align-items: center; height: 100vh;">
      <Loading/>
    </div>
    <div v-else class="card mt-4 text-center" style="width: 100%;">
      <div class="row">
        <div class="card-body col-md-6 col-lg-4  col-xl-3" v-for="item in product" :key="item.id">
          <img style="height: 100px;width: 100px;" :src="item.imageUrl" class="card-img-top" alt="...">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.category }}</p>
          <p class="card-text">原價： NT${{ item.origin_price }}</p>
          <p class="card-text">特價： NT${{ item.price }}</p>
          <div class="d-flex flex-column">
            <button type="button" class="btn btn-dark" @click="goProduct(item.id)">詳細介紹</button>
            <button type="button" class="btn btn-dark">加入購物車</button>
          </div>
        </div>
      </div>
      <page class="d-flex justify-content-center mt-3" :pages="pagination" @update-page="getProduct"></page>
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
  import axios from 'axios';
  import router from '@/router';
  import { ref } from 'vue'
  import page from '@/components/Pagination.vue';
  import Loading from '@/components/Loading.vue'

  interface item {
    id:string,
    category:string,
    title:string,
    origin_price:number,
    price:number,
    imageUrl:string
  }

  const product = ref<item[]>([])
  const pagination = ref({})
  let loading = ref(true);

  function getProduct( page = 1){
    const api=`${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products?page=${page}`
    axios.get(api).
      then((res)=>{
        console.log(res)
        product.value = res.data.products
        pagination.value = res.data.pagination
        loading.value = false;
      }).catch(e=>{
        console.log(e)
      })
  }
  getProduct();


  function goProduct(id:string){
    router.push(`/user/product/${id}`)
  }
</script>