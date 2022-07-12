<template>
  <div>
    <div class="fz-22">123</div>
    <el-button>I am ElButton</el-button>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script setup>
import { getList } from '@/api/test'
getList()
</script>

<style lang="scss" scoped>
div{
  color: $red-color;
  font-size: 22px;
}
</style>
