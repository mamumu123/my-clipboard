<script setup lang="ts">
import { message } from 'ant-design-vue';
import { copyContent } from '../utils/utils';
import { useHistory } from '../hooks/useHistory';
import { ref } from 'vue';

const columns = [
  {
    title: '内容',
    dataIndex: 'text',
    key: 'text',
  }
]
const {
  historyData,
  setHistory,
  onSearch,
  searchText,
} = useHistory();


const customRow = () => ({
  onClick: (data: any) => {
    const text = data?.target?.innerText;
    if (text) {
      copyContent(text);
    } else {
      message.error('复制失败');
    }
  },
})

window.ipcRenderer.on('clipboard-change', (_event, value) => {
  setHistory(value)
});

</script>

<template>
  <div>
    <div>
      <a-input-search v-model:value="searchText" placeholder="搜索" enter-button @search="onSearch" />
    </div>
    <div>
      <a-table :dataSource="historyData" :columns="columns" :customRow="customRow" />
    </div>
  </div>
</template>

<style scoped></style>
