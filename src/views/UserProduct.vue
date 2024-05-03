<template>
  <div>
    <h2>{{ product.title }}</h2>
    <img :src="product.imageUrl" alt="" style="width: 200px; height: 200px;">
    <h5>原價{{ product.origin_price }}</h5>
    <h5>特價{{ product.price }}</h5>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';

  const route = useRoute(); 
  const id = route.params.product;
  
  interface item {
    id:string,
    category:string,
    title:string,
    origin_price:number,
    price:number,
    imageUrl:string
  }

    const product = ref<item>({
    id: '',
    category: '',
    title: '',
    origin_price: 0,
    price: 0,
    imageUrl: ''
  });

  function getProduct () {
    const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/product/${id}`;
    axios.get(api)
      .then((res)=>{
        product.value = res.data.product
        console.log(product)
      })
  }
  getProduct();

</script>