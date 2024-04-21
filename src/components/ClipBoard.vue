<script setup lang="ts">
import { message } from 'ant-design-vue';
import { copyContent } from '../utils/utils';
import { useHistory } from '../hooks/useHistory';

const columns = [
  {
    title: '内容',
    dataIndex: 'text',
    key: 'text',
    ellipsis: true,
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
  <div class="container">
    <div class="input-box">
      <a-input-search v-model:value="searchText" placeholder="搜索" enter-button @search="onSearch" />
    </div>
    <div class="table-box">
      <a-table :dataSource="historyData" :showHeader="false" :columns="columns" :customRow="customRow" />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
}

.input-box {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-box {
  flex: 1;
  overflow: hidden;
}
</style>
