<template>
  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled':props.pages.has_next}">
        <a class="page-link" href="#" @click.prevent="prePage">Previous</a>
      </li>
      <li class="page-item" v-for="page in props.pages.total_pages" :key="page">
        <button class="page-link" type="button" 
          :class="{'active':page === props.pages.current_page }" 
          @click.prevent="changePage(page)">
          {{ page }}
        </button>
      </li>
      <li class="page-item" :class="{'disabled':props.pages.has_pre}">
        <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
// import Swal from 'sweetalert';

  const props = defineProps({
    pages:{
      type:Object,
      default () { return {} }
    }
  });
  const emit = defineEmits(['update-page']);


  // 點選頁數
  function changePage(page:number){
    emit('update-page', page)
    // Swal("切換頁面", "您成功切換頁面", "success");
  }
  // 上一頁
  function prePage () {
    let nowPage = props.pages.current_page;
    nowPage--;
    changePage(nowPage)
  }
  // 下一頁
  function nextPage () {
    let nowPage = props.pages.current_page;
    nowPage++;
    changePage(nowPage)
  }

</script>