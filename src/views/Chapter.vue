<template>
  <div class="chapter">
    <div class="bread-crumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home/courseList">课程</el-breadcrumb-item>
        <el-breadcrumb-item>章节管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="top-info">
      <div class="operation">
        <el-button type="primary" icon="ArrowLeft" @click="toCourseList"
          >课程列表</el-button
        >
        <el-button type="default" icon="Plus" @click="toAddChapter"
          >添加章节</el-button
        >
        <!-- <el-button type="default" icon="DeleteFilled">批量删除</el-button> -->
      </div>
      <div class="search">
        <el-button
          type="primary"
          icon="Search"
          @click="searchByChapterName(state.routeParams)"
          class="button"
          >搜索</el-button
        >
        <el-input
          v-model="state.keyWord"
          placeholder="请输入章节名称"
          @keyup.enter="searchByChapterName(state.routeParams)"
        />
      </div>
    </div>
    <div class="table">
      <el-table
        :data="state.chapterList"
        style="width: 100%"
        v-loading="state.tableLoading"
        border
      >
        <el-table-column
          label="当前课程"
          prop="course.name"
          header-align="center"
          align="center"
        />
        <el-table-column
          label="章节名"
          prop="name"
          header-align="center"
          align="center"
        />
        <el-table-column
          label="视频地址"
          prop="videoUrl"
          header-align="center"
          align="center"
        >
          <template v-slot="props">
            <span class="video" @click="gotoVideo(props.row)">{{
              props.row.videoUrl
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="简介"
          prop="info"
          show-overflow-tooltip
          header-align="center"
          align="center"
        />
        <!-- <el-table-column
          label="当前进度"
          prop="state"
          header-align="center"
          align="center"
        /> -->
        <el-table-column label="操作" header-align="center" align="center">
          <!-- <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="Type to search"
            />
          </template> -->
          <template #default="scope">
            <el-button
              size="default"
              icon="EditPen"
              @click="toEditChapter(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="你确定要删除该章节吗？"
              @confirm="chapterDelete(scope.$index, scope.row)"
            >
              <template #reference>
                <el-button size="default" type="danger" icon="DeleteFilled"
                  >删除</el-button
                >
              </template></el-popconfirm
            >
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
    <el-dialog
      v-model="dialogVisible"
      title="章节信息"
      width="30%"
      :lock-scroll="false"
    >
      <el-form
        label-width="100px"
        :model="state.chapterList"
        style="max-width: 460px"
      >
        <el-form-item label="视频地址" required>
          <el-input
            v-model="state.chapterInfo.videoUrl"
            placeholder="视频地址"
            style="margin-bottom: 10px"
          />
          <el-upload
            ref="myUploadVideo"
            class="upload-demo"
            action="/api/common/uploadVideo"
            :limit="1"
            :on-success="handleUploadSuccess"
          >
            <template #trigger>
              <el-button type="primary">select file</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip text-red">
                limit 1 file, new file will cover the old file
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="章节名" required>
          <el-input v-model="state.chapterInfo.name" placeholder="章节名" />
        </el-form-item>
        <!-- <el-form-item label="课程ID">
          <el-input
            v-model="state.chapterInfo.courseId"
            type="number"
            placeholder="课程ID"
          />
        </el-form-item>
        <el-form-item label="视频地址">
          <el-input v-model="state.chapterInfo.video" placeholder="视频地址" />
        </el-form-item> -->
        <!-- <el-form-item label="当前进度" required>
          <el-input
            v-model="state.chapterInfo.state"
            placeholder="当前进度"
            type="number"
          />
        </el-form-item> -->
        <el-form-item label="简介">
          <el-input
            v-model="state.chapterInfo.info"
            type="textarea"
            placeholder="简介"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small"
            >取消</el-button
          >
          <el-button type="primary" @click="buttonConfirm" size="small"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "@vue/reactivity";
import { getCurrentInstance, onMounted, toRaw } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { Chapter, RouteParams } from "./types/Chapter";
import { ElMessage } from "element-plus";
import type { UploadInstance } from "element-plus";

const myUploadVideo = ref<UploadInstance>();

const route = useRoute();
const dialogVisible = ref(false);
const isEdit = ref(false);
const state = reactive({
  chapterList: [] as Chapter[],
  chapterInfo: {} as Chapter,
  routeParams: {},
  keyWord: "",
  tableLoading: false,
});
const pagination = reactive({
  currentPage: 1,
  pageSize: 5,
  total: 0,
});
function handleCurrentChange(e: any) {
  console.log(e);
  pagination.currentPage = e;
  getChapterList(state.routeParams);
}
function handleSizeChange(e: any) {
  console.log(e);
  pagination.pageSize = e;
  pagination.currentPage = 1;
  getChapterList(state.routeParams);
}
const { proxy } = getCurrentInstance() as any;
onMounted(() => {
  console.log(myUploadVideo);

  console.log("route:", toRaw(route).query.value);
  state.routeParams = toRaw(route).query.value as unknown as RouteParams;
  getChapterList(state.routeParams);
});
const getChapterList = async (routeParams: any) => {
  state.tableLoading = true;
  const courseId = routeParams.courseId;
  let res = await proxy.$API.default.chapter.getChapterList(
    courseId,
    pagination
  );
  state.tableLoading = false;
  console.log(res.data);
  const { code, msg, data } = res.data;
  if (code == "0") {
    state.chapterList = data.sections;
    pagination.total = res.data.data.totalItems;
    dialogVisible.value = false;
  }
};
const searchByChapterName = async (routeParams: any) => {
  state.tableLoading = true;
  const courseId = routeParams.courseId;
  let res = await proxy.$API.default.chapter.getChapterListByKeyWord(
    courseId,
    pagination,
    state.keyWord
  );
  state.tableLoading = false;
  console.log(res.data);
  const { code, msg, data } = res.data;
  if (code == "0") {
    state.chapterList = data.sections;
    pagination.total = res.data.data.totalItems;
    dialogVisible.value = false;
  }
};
function chapterDelete(index: any, row: any) {
  proxy.$API.default.chapter.deleteChapterItem(row.id).then((res: any) => {
    console.log(res);
    getChapterList(state.routeParams);
  });
  console.log(index, row);
}
function toEditChapter(index: any, chapterInfo: any) {
  console.log(chapterInfo);
  state.chapterInfo.id = chapterInfo.id;
  isEdit.value = true;
  dialogVisible.value = true;
  Object.assign(state.chapterInfo, chapterInfo);
  console.log(state.chapterInfo);

  const { courseId } = state.routeParams as RouteParams;
  if (state.chapterInfo.course) {
    state.chapterInfo.course.id = courseId;
  }
}
function toAddChapter() {
  state.chapterInfo.videoUrl = null;
  state.chapterInfo.name = null;
  state.chapterInfo.state = null;
  state.chapterInfo.info = null;
  // console.log(myUploadVideo);

  // myUploadVideo.value!.clearFiles();
  isEdit.value = false;
  console.log(state.routeParams);
  dialogVisible.value = true;

  const { courseId } = state.routeParams as RouteParams;
  state.chapterInfo.course = {
    id: courseId,
  };
  console.log("添加章节");
}
function buttonConfirm(): void {
  const obj = state.chapterInfo;
  if (obj.name == null || obj.videoUrl == null) {
    ElMessage({
      message: "必填项不能为空",
      type: "warning",
    });
    return;
  }
  if (isEdit.value == true) {
    editChapterItem();
  } else {
    addChapter();
  }
}
function editChapterItem(): void {
  proxy.$API.default.chapter
    .updateChapterItem(state.chapterInfo)
    .then((res: any) => {
      console.log(res);
      getChapterList(state.routeParams);
      isEdit.value = false;
      dialogVisible.value = false;
    });
}
function addChapter(): void {
  proxy.$API.default.chapter
    .addChapterItem(state.chapterInfo)
    .then((res: any) => {
      console.log(res);
      if (res.status == 200) {
        getChapterList(state.routeParams);
        dialogVisible.value = false;
      }
    });
}
const handleUploadSuccess = (response: any, uploadFile: any) => {
  console.log(response);

  console.log(uploadFile);
  const { code, msg, data } = response;
  if (code == "0") {
    state.chapterInfo.videoUrl = data;
  }
};
function toCourseList() {
  router.push("/home/courseList");
}
const gotoVideo = (e: any) => {
  console.log(e);
  window.open(e.videoUrl);
};
</script>

<style lang="scss" scoped>
.chapter {
  .table {
    .video {
      cursor: pointer;
    }
    .video:hover{
      color: #F56C6C;
    }
  }
  .top-info {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 20px;
    .search {
      display: flex;
      justify-content: space-between;
      .button {
        margin-right: 10px;
      }
    }
  }
  .bread-crumb {
    margin-top: 33px;
  }
  .pagination {
    margin-top: 20px;
    float: right;
  }
}
</style>