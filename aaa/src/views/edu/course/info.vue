<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-form label-width="120px">
        <el-form-item label="课程标题">
            <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
        </el-form-item>

        <!-- 所属分类 TODO -->
        <!-- 一级分类 -->
        <el-form-item label="课程类别">
        <el-select
            v-model="courseInfo.subjectParentId"
            placeholder="请选择">
            <el-option
            v-for="subject in oneLevelSubjectList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
        </el-form-item>


        <!-- 课程讲师 TODO -->
        <!-- 课程讲师 -->
        <el-form-item label="课程讲师">
        <el-select
            v-model="courseInfo.teacherId"
            placeholder="请选择">
            <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
        </el-form-item>

        <el-form-item label="总课时">
            <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>

        <!-- 课程简介 TODO -->
        <el-form-item label="课程简介">
            <el-input v-model="courseInfo.description" placeholder=" 示例：简介"/>
        </el-form-item>
        <!-- 课程封面 TODO -->

        <el-form-item label="课程价格">
            <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>
<script>
import course from '@/api/course'
const defaultForm = {
    title: '',
    subjectId: '',
    teacherId: '',
    lessonNum: 0,
    description: '',
    cover: '',
    price: 0
}
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo:defaultForm
    }
  },

  created() {
    console.log('info created')
  },

  methods: {

     next() {
            //判断添加还是修改，判断课程对象里面是否有id
            if(!this.courseInfo.id) {
                //添加
                this.addCourse()
            } else {
                //修改
                this.updateCourse()
            } 
        },
        addCourse() {
            //调用
            course.addCourseInfo(this.courseInfo)
                .then(response => {
                    console.log('***** '+response)
                    this.$message({
                        type: 'success',
                        message: '添加课程信息成功!'
                    })                  
                    //路由跳转，到编写大纲页面
                    this.$router.push({path:'/course/chapter/'+response.data.courseId})
                })
                .catch(response => {
                     console.log('###### '+response)
                    this.$message({
                        type: 'success',
                        message: '添加课程信息失败!'
                    })
                })
        },
        updateCourse(){
            
        }
  }
}
</script>