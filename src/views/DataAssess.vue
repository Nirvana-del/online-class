<template>
  <div>
    <div class="top-info">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="courses">
            <div class="items">
              <div class="left">
                <el-icon color="#fff" size="30px"><Message /></el-icon>
              </div>
              <div class="right">
                <div class="count">11</div>
                <span class="type">courses</span>
              </div>
            </div>
          </el-card></el-col
        >
        <el-col :span="6">
          <el-card class="classes">
            <div class="items">
              <div class="left">
                <el-icon color="#fff" size="30px"><Message /></el-icon>
              </div>
              <div class="right">
                <div class="count">11</div>
                <span class="type">classes</span>
              </div>
            </div>
          </el-card></el-col
        >
        <el-col :span="6">
          <el-card class="students">
            <div class="items">
              <div class="left">
                <el-icon color="#fff" size="30px"><Message /></el-icon>
              </div>
              <div class="right">
                <div class="count">11</div>
                <span class="type">students</span>
              </div>
            </div>
          </el-card></el-col
        >
        <el-col :span="6">
          <el-card class="teachers">
            <div class="items">
              <div class="left">
                <el-icon color="#fff" size="30px"><Message /></el-icon>
              </div>
              <div class="right">
                <div class="count">11</div>
                <span class="type">teachers</span>
              </div>
            </div>
          </el-card></el-col
        >
      </el-row>
    </div>
    <div class="content">
      <el-row :gutter="24" justify="space-between">
        <el-col :span="12">
          <div id="main" style="width: 500px; height: 500px"></div>
        </el-col>
        <el-col :span="12">
          <div id="maychar" style="width: 500px; height: 500px"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, inject } from "vue"; // 主要
onMounted(() => {
  change();
  changetype();
});
let echarts = inject("echarts"); // 主要
// 基本柱形图
const change = () => {
  const chartBox = echarts.init(document.getElementById("main") as HTMLElement); // 主要
  console.log(chartBox);

  const option = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        data: [23, 24, 18, 25, 27, 28, 25],
      },
    ],
  };
  chartBox.setOption(option);
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    chartBox.resize();
  });
};
// 折线图
const changetype = () => {
  // 获取组件实例
  const machart = echarts.init(document.getElementById("maychar"));
  // 设置配置项
  const option = {
    series: [
      {
        type: "pie",
        data: [
          {
            value: 335,
            name: "直接访问",
          },
          {
            value: 234,
            name: "联盟广告",
          },
          {
            value: 1548,
            name: "搜索引擎",
          },
        ],
      },
    ],
  };
  // 复制
  machart.setOption(option);
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    machart.resize();
  });
};
</script>

<style lang="scss" scoped>
.top-info {
  margin-top: 20px;
  .courses {
    background-color: #2b9ac8;
    .left {
      background-color: #54aed3;
    }
  }
  .classes {
    background-color: #7d56c1;
    .left {
      background-color: #9978ca;
    }
  }
  .students {
    background-color: #26ccca;
    .left {
      background-color: #50d6d5;
    }
  }
  .teachers {
    background-color: #2b3f48;
    .left {
      background-color: #55676b;
    }
  }
  .items {
    display: flex;
    justify-content: space-between;
    .left {
      width: 50px;
      height: 50px;
      border: 1px solid rgba(0, 0, 0, 0);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right {
      color: #fff;
      .count {
        font-weight: bold;
      }
    }
  }
}
</style>