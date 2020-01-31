<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>定时任务</el-breadcrumb-item>
      <el-breadcrumb-item>定时任务列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <!-- <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getcrontabList">
            <el-button slot="append" icon="el-icon-search" @click="getcrontabList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加定时任务</el-button>
        </el-col>
      </el-row> -->

      <!-- 定时任务列表区域 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" :index="indexMethod" />
      <el-table-column prop="jobName" label="任务名称" width="180" />
      <el-table-column prop="command" label="shell命令" width="180" />
      <el-table-column prop="err" label="错误原因" />

      <el-table-column prop="output" label="脚本输出" />

      <el-table-column prop="planTime" label="计划开始时间" :formatter="timestamePlan" />

      <el-table-column prop="scheduleTime" label="实际调度时间" :formatter="timestampSchedule" />

      <el-table-column prop="startTime" label="开始执行时间" :formatter="timestampStart" />

      <el-table-column prop="endTime" label="执行结束时间" :formatter="timestampEnd" />
    </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page"   :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    <!-- <el-pagination :current-page.sync="currentPage1" :page-size="100"
    layout="total, prev, pager, next" :total="total" @size-change="handleSizeChange"
    @current-change="handleCurrentChange" /> -->

    </el-card>

  </div>
</template>

<script>
import { getLogList } from '@/api/job'
export default {
  data() {
    return {
      tableData: [
        {
          jobName: '',
          command: '',
          err: '',
          output: '',
          planTime: '',
          scheduleTime: '',
          startTime: '',
          endTime: ''
        }
      ],
      jobName: '',
      total: 0,
      page: 1,
      pageSize: 30
    }
  },

  created() {
    // this.fetchData()

    this.jobName = this.$route.query.name
    console.log('name: ' + this.jobName)
    this.GetLogList(this.jobName)
  },
  methods: {
    // 分页
    handleSizeChange(newSize) {
      console.log('handleSizeChange')

      console.log(newSize)
    },
    handleCurrentChange(newSize) {
      var skip = (this.page + newSize) * this.pageSize
      var limit = this.pageSize
      var p = {
        name: this.jobName,
        limit: limit,
        skip: skip
      }
      console.log(p)

      getLogList(p).then(response => {
        this.tableData = response.data.data.data
        this.total = response.data.data.count
        console.log(this.total)
      })
    },

    timestampSchedule(row, column) {
      var date = new Date(row.scheduleTime) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    timestampStart(row, column) {
      var date = new Date(row.startTime) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    timestampEnd(row, column) {
      var date = new Date(row.endTime) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    timestamePlan(row, column) {
      var date = new Date(row.planTime) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },

    indexMethod(index) {
      return index + 1
    },
    GetLogList(name) {
      var skip = (this.page - 1) * this.pageSize
      var limit = this.pageSize
      var p = {
        name: this.jobName,
        limit: limit,
        skip: skip
      }
      console.log(p)
      getLogList(p).then(response => {
        this.tableData = response.data.data.data
        this.total = response.data.data.count
        console.log(this.total)
      })
    }
  }
}
</script>
