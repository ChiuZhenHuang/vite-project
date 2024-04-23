<template>
  <div class="container product">
    <div class="text-end">
      <button type="button" class="btn btn-dark" @click.prevent="openModal(true)">新增一個產品</button>
    </div>
    <table>
      <thead>
        <tr>
          <td>分類</td>
          <td>名稱</td>
          <td>價格</td>
          <td>是否啟用</td>
          <td>編輯</td>
        </tr>
      </thead>
      <tbody v-for="item in data" :key="item.id">
        <tr>
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.is_enabled}}</td>
          <td>
            <button type="button" class="btn btn-outline-secondary" @click="openModal(false,item)">編輯</button>
            <button type="button" class="btn btn-outline-danger">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal ref="productModal" :product="tempProduct" @update-product="updateProduct"></Modal>
  </div>
</template>

<style>
  .product{
    padding: 0;
    text-align: center;
    display: flex;
    flex-direction: column; 
  }
</style>

<script setup lang="ts">
  import Modal from '@/components/ProductModal.vue';
  import axios from 'axios';
  import { ref } from 'vue';

  interface Product {
    id: number;
    category: string;
    title: string;
    price: number;
    is_enabled: boolean;
  }
  const initialProduct: Product[] = [];

  const data = ref<Product[]>(initialProduct);

  //取得產品資料
  const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/products?page=1`
  function getProduct() {
    axios.get(api).then((res) => {
      console.log(res)
      data.value = res.data.products
    })
  }
  getProduct();

  // 取得子組件方法，打開及關閉
  const productModal = ref<any>(null);
  function showModal() {
    productModal.value.showModal();
  }
  function hideModal() {
    productModal.value.hideModal();
  }

  // props的地方
  const tempProduct = ref({});
  // 更新產品列表
  function updateProduct(item:any) {
    tempProduct.value = item;
    // 新增
    if(isNewRef.value){
      const api=`${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product`;
      axios.post(api,{data:tempProduct.value})
      .then((res)=>{
        if(res.data.success){
            getProduct();
            hideModal();
          }
        }
      )
    }else{ //編輯
      const api=`${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${item.id}`;
      axios.put(api,{data:tempProduct.value})
      .then((res)=>{
        if(res.data.success){
            getProduct();
            hideModal();
          }
        }
      )
    }
  }

  // 刪除  需增加 showModal
  // function openDelProductModal(item){

  // }

  //此方法提供給內層delModal使用
  // function delProduct(){
  //   let api=`${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/order/${item.id}`;
  //   axios.delete(api)
  //   .then((res) => {
  //     console.log(res)
  //     getProduct();
  //   })
  // }

  const isNewRef = ref(false);
  function openModal (isNew:any, item?:any) {
    if(isNew){
      tempProduct.value = {};
    }else{
      tempProduct.value = {...item};
    }
    isNewRef.value = isNew;
    showModal();
  }
</script>