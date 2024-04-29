<template>
  <div class="modal" tabindex="-1" ref="delModalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">刪除</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>確定刪除『{{ props.item.title }}』?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-secondary" @click="saveDel">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
  import Modal from 'bootstrap/js/dist/modal';
  import { ref, onMounted } from 'vue';

  const delModalRef = ref<any>(null);
  const modal = ref<any>(null);

  onMounted(() => {
    modal.value = new Modal(delModalRef.value);
  })

  function showModal () {
    modal.value.show();
  }
  function hideModal () {
    modal.value.hide();
  }

  const props = defineProps({
    item:{
      type:Object,
      default () { return {} }
    }
  });

  // 儲存資料觸發外部事件
  const emit = defineEmits(['del-product']);
  function saveDel (){
    emit('del-product')
  }

  defineExpose({
    showModal,
    hideModal
  })
</script>