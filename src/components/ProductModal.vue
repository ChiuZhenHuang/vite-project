<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-secondary text-white">
          <h5 class="modal-title">新增產品</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row text-start">
            <div class="col-4">
              <label for="image">請輸入圖片網址</label>
              <input type="text" id="image" v-model="tempProduct.imageUrl" class="form-control" placeholder="請輸入圖片連結"/>
              <img src="" alt="">
            </div>
            <div class="col-8">
              <div>
                <label for="title" class="form-label">標題</label>
                <input type="text" class="form-control" v-model="tempProduct.title" >
              </div>
              <div class="row">
                <div class="col-6 mb-3">
                  <label for="category">分類</label>
                  <input type="text" id="category" class="form-control" v-model="tempProduct.category" >
                </div>
                <div class="col-6 mb-3">
                  <label for="unit">單位</label>
                  <input type="text" id="unit" class="form-control" v-model="tempProduct.unit">
                </div>
                <div class="col-6 mb-3">
                  <label for="origin_price">原價</label>
                  <input type="number" id="origin_price" class="form-control" v-model="tempProduct.origin_price">
                </div>
                <div class="col-6 mb-3">
                  <label for="price">售價</label>
                  <input type="number" id="price" class="form-control" v-model="tempProduct.price">
                </div>
                <hr/>
                <div>
                <label for="description" class="form-label">產品描述</label>
                <textarea type="text" id="description" class="form-control" v-model="tempProduct.description"></textarea>
                <label for="content" class="form-label">說明內容</label>
                <textarea type="text" id="content" class="form-control" v-model="tempProduct.content"></textarea>
                <input type="checkbox" id="is_enabled" v-model="tempProduct.is_enabled">
                <label for="is_enabled" class="form-check-label">是否啟用</label>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-secondary" @click="$emit('update-product',tempProduct)">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lan="ts">
  import Modal from 'bootstrap/js/dist/modal';
  import { ref, onMounted, watch } from 'vue';

  const modalRef = ref(null);

  function showModal () {
    modalRef.value.show();
  }
  function hideModal () {
    modalRef.value.hide();
  }
  onMounted(() => {
    modalRef.value = new Modal(document.querySelector('.modal'));
  })


  const props = defineProps({
    product:{
      type:Object,
      default () { return {} }
    }
  });

  watch(() => props.product, (newValue) => {
      tempProduct.value = newValue;
    });
  const tempProduct = ref ({});

  // 將組件方法提供給外部使用
  defineExpose({
    showModal,
    hideModal
  })
</script>