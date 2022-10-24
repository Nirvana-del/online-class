<template>
  <div class="course-list">
    <div class="bread-crumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/courseList">课程</el-breadcrumb-item>
        <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="top-info">
      <div class="operation">
        <el-button type="default" icon="Plus" @click="toAddCourse"
          >添加课程</el-button
        >
        <el-button type="default" icon="DeleteFilled">批量删除</el-button>
      </div>
      <div class="search">
        <el-input v-model="state.keyWord" placeholder="请输入内容" />
        <el-button type="default" icon="Search"></el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        ref="multipleTableRef"
        :data="state.tableData"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" header-align="center" />
        <el-table-column label="封面" align="center" 
        width="150"
        header-align="center">
          <template #default="props">
            <img
              :src="props.row.imageUrl == '' ? empty : props.row.imageUrl"
              style="width: 120px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column
          property="teacher.teacherName"
          label="讲师"
          width="150"
          header-align="center"
          align="center"
        />
        <el-table-column
          property="name"
          label="课程名称"
          header-align="center"
          width="250"
          align="center"
        />
        <el-table-column
          property="type"
          label="课程类型"
          align="center"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          property="period"
          label="课时"
          header-align="center"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column header-align="center" align="center" 
        label="操作">
          <template #default="props">
            <el-button
              type="default"
              size="default"
              icon="Operation"
              @click="gotoChapter(props.row.id)"
              >章节</el-button
            >
            <!-- <el-button
              type="default"
              size="large"
              icon="FolderOpened"
            ></el-button> -->
            <el-button
              type="default"
              size="default"
              icon="EditPen"
              @click="toEditCourse(props.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="你确定要删除该课程吗？"
              @confirm="deleteCourse(props.row)"
            >
              <template #reference>
                <el-button type="danger" size="default" icon="DeleteFilled"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:currentPage="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[5, 10, 20, 30]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="dialogVisible" title="课程信息" width="30%">
      <el-form
        label-width="100px"
        :model="state.courseInfo"
        style="max-width: 460px"
      >
        <el-form-item label="封面">
            <el-upload
              class="avatar-uploader"
              action="/api/common/uploadImage"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="state.courseInfo.imageUrl !== ''" :src="state.courseInfo.imageUrl" 
              class="avatar" style=" width:200px; height:200px"/>
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="state.courseInfo.name" placeholder="课程名称" />
        </el-form-item>
        <el-form-item label="课程类型">
          <el-input
            v-model="state.courseInfo.type"
            type="number"
            placeholder="课程类型"
          />
        </el-form-item>

        <el-form-item label="课时">
          <el-input
            v-model="state.courseInfo.period"
            placeholder="课时"
            type="number"
          />
        </el-form-item>
        <el-form-item label="讲师ID" v-show="!isEdit">
          <el-input
            v-model="state.courseInfo.teacher.id"
            placeholder="讲师ID"
            type="number"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="buttonConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { Course } from './types/Course/index';
import empty from '@/assets/empty.png';

interface Teacher {
  id: number;
  teacherName: string;
}

let dialogVisible = ref(false);
let isEdit = ref(false);
const { proxy } = getCurrentInstance() as any;
const state = reactive({
  tableData: [] as Course[],
  courseInfo: {} as Course,
  keyWord: "",
});
const pagination = reactive({
  currentPage: 1,
  pageSize: 5,
  total: 0,
});
function handleCurrentChange(e: any) {
  console.log(e);
  pagination.currentPage = e;
  getCourseList();
}
function handleSizeChange(e: any) {
  console.log(e);
  pagination.pageSize = e;
  pagination.currentPage = 1;
  getCourseList();
}
function gotoChapter(courseId: any) {
  router.push("/chapterList?courseId=" + courseId);
}
function getCourseList(): void {
  console.log(proxy.$API.default);

  proxy.$API.default.course.getCourseList(pagination).then((res: any) => {
    console.log(res.data);
    state.tableData = res.data.data.courses;
    pagination.total = res.data.data.totalItems;
    dialogVisible.value = false;
  });
}
function deleteCourse(row: Course): void {
  console.log(row);
  proxy.$API.default.course.deleteCourseItem(row.id).then((res: any) => {
    console.log(res);
    getCourseList();
  });
}
function buttonConfirm(): void {
  if (isEdit.value == true) {
    editCourseItem();
  } else {
    addCourse();
  }
}
// 编辑课程信息
function editCourseItem(): void {
  proxy.$API.default.course
    .updateCourseItem(state.courseInfo)
    .then((res: any) => {
      console.log(res);
      if (res.data.code == "0") {
        getCourseList();
        isEdit.value = false;
        dialogVisible.value = false;
      }
    });
}
const addCourse = (): void => {
  console.log(state.courseInfo);

  proxy.$API.default.course.addCourseItem(state.courseInfo).then((res: any) => {
    console.log(res);
    if (res.status == 200) {
      getCourseList();
    }
  });
};
function toAddCourse() {
  isEdit.value = false;
  state.courseInfo.name = "";
  state.courseInfo.type = 0;
  state.courseInfo.imageUrl = "";
  state.courseInfo.period = 0;
  state.courseInfo.teacher = {
    id: 0,
    teacherName: "",
  };
  console.log(state.courseInfo);

  dialogVisible.value = true;
}
function toEditCourse(courseItem: Course) {
  console.log(courseItem);
  isEdit.value = true;
  Object.assign(state.courseInfo, courseItem);
  console.log(state.courseInfo);
  dialogVisible.value = true;
}
const handleAvatarSuccess = (
  response:any,
  uploadFile:any
) => {
  console.log(response);
  
  console.log(uploadFile);
  const { code, msg, data } = response
  if(code == '0'){
    state.courseInfo.imageUrl = data
  }
};

const beforeAvatarUpload = (rawFile:any) => {
  console.log(rawFile);

  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不能超过 2MB!");
    return false;
  }
  return true;
};
function dateFormat(time: string): string {
  var data = new Date(time); //获取年
  var y = data.getFullYear(); //获取月
  var m = data.getMonth() + 1; //获取日
  var d = data.getDate();
  //获取小时，判断是否小于10，小于10前面加o
  var hours = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
  //获取分钟，判断是否小于10，小于10前面加o
  var minutes =
    data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
  //获取秒，判断是否小于10，小于10前面加o
  //var secounds = data.getSeconds()<10 ? 'O' + data.getSeconds() : data.getSeconds();
  //输出结果
  return `${y}-${m}-${d} ${hours}:${minutes}`;
}
onMounted(() => {
  getCourseList();
});
</script>


<style lang="scss" scoped>
.course-list {
  overflow: hidden;
  .bread-crumb {
    margin-top: 33px;
  }
  .top-info {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 20px;
    .search {
      display: flex;
    }
  }
  .pagination {
    margin-top: 20px;
    float: right;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>