<template>
  <div>
    <div class="fz-22">123</div>
    <el-button>I am ElButton</el-button>
    <van-button type="primary">主要按钮</van-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="物料编码" />
      <el-table-column prop="name" label="物料名称" />
      <el-table-column prop="address" label="欠量" />
    </el-table>
  </div>
</template>

<script setup>
import { getList } from '@/api/test';
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
const data = reactive({
  a: 1,
});
console.log(data);
getList();
</script>

<style lang="scss" scoped>
div {
  //color: $red-color;
  //font-size: 22px;
}
</style>
