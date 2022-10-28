<template>
  <div class="container">
    <div class="top-info">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="courses">
            <div class="items">
              <div class="left">
                <el-icon color="#fff" size="30px"><Message /></el-icon>
              </div>
              <div class="right">
                <div class="count">{{ state.coursesTotal }}</div>
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
                <div class="count">{{ state.classesTotal }}</div>
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
                <div class="count">{{ state.usersTotal }}</div>
                <span class="type">users</span>
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
                <div class="count">{{ state.teachersTotal }}</div>
                <span class="type">teachers</span>
              </div>
            </div>
          </el-card></el-col
        >
      </el-row>
    </div>
    <div class="content">
      <el-row :gutter="24" justify="space-between" align="middle">
        <el-col :span="11">
          <div id="main" style="width: 830px; height: 500px"></div>
        </el-col>
        <el-col :span="8">
          <div id="maychar" style="width: 400px; height: 300px"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { number } from "echarts";
import { ElMessage } from "element-plus";
import { onMounted, inject, reactive, getCurrentInstance } from "vue"; // 主要
import { Course } from "./types/Course";
onMounted(() => {
  getCoursesTotal();
  getTeachersTotal();
  getUseresTotal();
  getClassesTotal();
  getCourseListByType(1);
  getCourseListByType(2);
  getCourseListByType(3);
});
const { proxy } = getCurrentInstance() as any;

const state = reactive({
  coursesTotal: 0,
  classesTotal: 0,
  usersTotal: 0,
  teachersTotal: 0,
  courseList: [] as Course[],
  publicTotal: 0,
  professionalTotal: 0,
  customizedTotal: 0,
});
const columnOption = {
  title: {
    text: "课程数据统计",
    top: "top",
    left: "center",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar"] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  xAxis: {
    data: [] as string[],
  },
  yAxis: [
    {
      type: "value",
      name: "观看人数",
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: "{value} 人",
      },
    },
    {
      type: "value",
      name: "课程时长",
      min: 0,
      max: 50,
      interval: 5,
      axisLabel: {
        formatter: "{value} h",
      },
    },
  ],
  legend: {
    left: "left",
    data: ["观看人数", "课程时长"],
  },
  series: [
    {
      name: "观看人数",
      type: "bar",
      data: [] as number[],
      tooltip: {
        valueFormatter: function (value: number) {
          return value + " 人";
        },
      },
    },
    {
      name: "课程时长",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value: number) {
          return value + " h";
        },
      },
      data: [] as number[],
    },
  ],
};
const pieOption = {
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  tooltip: {
    trigger: "item",
  },
  series: [
    {
      name: "课程人数",
      type: "pie",
      data: [
        {
          value: 0,
          name: "公开课",
        },
        {
          value: 0,
          name: "定制课",
        },
        {
          value: 0,
          name: "专家课",
        },
      ],
      tooltip: {
        valueFormatter: function (value: number) {
          return value + " 人";
        },
      },
    },
  ],
};
// 获取课程总数
const getCoursesTotal = () => {
  proxy.$API.default.course
    .getCourseList({ currentPage: 1, pageSize: 10 })
    .then(
      (res: any) => {
        console.log(res.data);
        state.courseList = res.data.data.courses;
        const xAxisArr = state.courseList.map((item) => item.name);
        const seriesArr = state.courseList.map((item) => item.view);
        const periodArr = state.courseList.map((item) => item.period);
        columnOption.xAxis.data = xAxisArr as string[];
        columnOption.series[0].data = seriesArr as number[];
        columnOption.series[1].data = periodArr as number[];

        change(columnOption);
        state.coursesTotal = res.data.data.totalItems;
      },
      (err: any) => {
        console.log(err);
        ElMessage.error(err.message);
      }
    );
};
// 获取班级总数
const getClassesTotal = () => {
  proxy.$API.default.classes.reqGetClassList().then(
    (res: any) => {
      console.log(res.data);
      state.classesTotal = res.data.data.totalItems;
    },
    (err: any) => {
      console.log(err);
      ElMessage.error(err.message);
    }
  );
};
// 获取用户总数
const getUseresTotal = () => {
  proxy.$API.default.user.reqGetUserList().then(
    (res: any) => {
      console.log(res.data);
      state.usersTotal = res.data.data.totalItems;
    },
    (err: any) => {
      console.log(err);
      ElMessage.error(err.message);
    }
  );
};
// 获取教师总数
const getTeachersTotal = () => {
  proxy.$API.default.teacher.getTeacherList().then(
    (res: any) => {
      console.log(res.data);
      state.teachersTotal = res.data.data.totalItems;
    },
    (err: any) => {
      console.log(err);
      ElMessage.error(err.message);
    }
  );
};
// 获取不同类型的课程列表的数量
const getCourseListByType = (typeId: number) => {
  proxy.$API.default.course.getCourseListByType({ typeId }).then(
    (res: any) => {
      console.log(res.data);
      switch (typeId) {
        case 1:
          pieOption.series[0].data[0].value = res.data.data.totalItems;
        case 2:
          pieOption.series[0].data[1].value = res.data.data.totalItems;
        case 3:
          pieOption.series[0].data[2].value = res.data.data.totalItems;
      }
      if (typeId == 3) {
        changetype(pieOption);
      }
    },
    (err: any) => {
      console.log(err);
      ElMessage.error(err.message);
    }
  );
};

let echarts = inject("echarts"); // 主要
// 基本柱形图
const change = (option: any) => {
  const chartBox = echarts.init(document.getElementById("main") as HTMLElement); // 主要
  chartBox.setOption(option);
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    chartBox.resize();
  });
};
// 饼图
const changetype = (option: any) => {
  console.log(state.publicTotal);
  console.log(state.professionalTotal);
  console.log(state.customizedTotal);

  // 获取组件实例
  const machart = echarts.init(document.getElementById("maychar"));
  // 设置配置项
  // 复制
  machart.setOption(option);
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    machart.resize();
  });
};
</script>

<style lang="scss" scoped>
.container{
overflow: hidden;
}
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
.content {
  margin-top: 50px;
}
</style>