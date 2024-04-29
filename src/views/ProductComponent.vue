<template>
  <div class="container">
    <div class="text-end">
      <button type="button" class="btn btn-outline-dark" @click.prevent="openModal(true)">新增一個產品</button>
    </div>
    <table class="table text-center mt-4">
      <thead class="table-dark">
        <tr>
          <td>名稱</td>
          <td>分類</td>
          <td>價格</td>
          <td>是否啟用</td>
          <td>編輯</td>
        </tr>
      </thead>
      <tbody v-for="item in data" :key="item.id" class="table-light">
        <tr>
          <td>{{ item.title }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.price }}</td>
          <td v-if="item.is_enabled === true" class="text-success">已啟用</td>
          <td v-else class="text-secondary">未啟用</td>
          <td>
            <button type="button" class="btn btn-outline-secondary" @click="openModal(false,item)">編輯</button>
            <button type="button" class="btn btn-outline-danger" @click="openDelModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal ref="productModal" :product="tempProduct" @update-product="updateProduct"></Modal>
    <delModal ref="delProductModal" :item="tempProduct" @del-product="delProduct"></delModal>
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
</style>

<script setup lang="ts">
  import Modal from '@/components/ProductModal.vue';
  import delModal from '@/components/DelModal.vue';
  import axios from 'axios';
  import { ref } from 'vue';

  interface Product {
    id: string;
    category: string;
    title: string;
    price: number | null;
    is_enabled: boolean;
  }
  const initialProduct: Product[] = [];
  
  const data = ref<Product[]>(initialProduct);
  //取得產品資料
  function getProduct() {
    const api = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/products/all`
    axios.get(api).then((res) => {
      data.value = res.data.products
      console.log(res)
    })
  }
  getProduct();

  // 取得新增/編輯子組件方法，打開及關閉
  const productModal = ref<any>(null);
  function showModal() {
    productModal.value.showModal();
  }
  function hideModal() {
    productModal.value.hideModal();
  }

  // 刪除modal
  const delProductModal = ref<any>(null);  
  // 打開刪除頁面
  function openDelModal(item:any) {
    tempProduct.value = { ...item }
    showDelModal();
  }
  function showDelModal(){
    delProductModal.value.showModal();
  }
  function hideDelModal(){
    delProductModal.value.hideModal();
  }

  // 供內部emit觸發實際刪除
  function delProduct(){
    const api=`${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${tempProduct.value.id}`;
    axios.delete(api)
    .then((res) => {
      if(res.data.success){
        hideDelModal();
        getProduct();
      }
    })
  }

  // 佔存產品資料
  const tempProduct = ref<Product>({
    id: '',
    category: '',
    title: '',
    price:null,
    is_enabled: false
  });
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
  // 確認為新增還編輯
  const isNewRef = ref(false);
  function openModal (isNew:boolean, item?:any) {
    if(isNew){
      tempProduct.value = {    
        id: '',
        category: '',
        title: '',
        price: null,
        is_enabled: false
      };
    }else{
      tempProduct.value = {...item};
    }
    isNewRef.value = isNew;
    showModal();
  }
</script>