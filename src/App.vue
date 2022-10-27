<template>
  <router-view/>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { provide } from "vue";
provide("echarts", echarts);
</script>
<style>

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
