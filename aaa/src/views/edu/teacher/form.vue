<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
<el-form-item label="讲师头像">

    <!-- 头衔缩略图 -->
    <pan-thumb :image="teacher.avatar"/>
    <!-- 文件上传按钮 -->
    <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
    </el-button>

    <!--
v-show：是否显示上传组件
:key：类似于id，如果一个页面多个图片上传控件，可以做区分
:url：后台上传的url地址
@close：关闭上传组件
@crop-upload-success：上传成功后的回调 -->
    <image-cropper
                   v-show="imagecropperShow"
                   :width="300"
                   :height="300"
                   :key="imagecropperKey"
                   :url="BASE_API+'/yl/oss/upload'"
                   field="file"
                   @close="close"
                   @crop-upload-success="cropSuccess"/>

</el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from '@/api/teacher'
//引入外部组件
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
const defaultForm = {
  name: '',
  sort: 0,
  level: '',
  career: '',
  intro: '',
  avatar: ''
}
export default {
    //声明外部组件
    components: { ImageCropper, PanThumb },
    //定义变量和初始值
    
    data() {
        return {
            teacher: defaultForm,//赋值地址
            //调用全局文件的路径 http://localhost:8001
            BASE_API: process.env.BASE_API,
            imagecropperShow: false, // 是否显示上传组件
            imagecropperKey: 0 // 上传组件id
        }
    },
    //监听，路由改变时调用
     watch: {
        $route(to, from) {
            console.log('watch $route')
            this.init()
            }
    },
    //在页面渲染之前调用，调用具体的某个方法
    created () {
        //调用方法(判断此次的路由请求路径是否带id)
        this.init()
    },
    //写具体的方法调用
    methods: {
        init(){
             if (this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id
                 this.getTeacherById(id)
            }else{
                this.teacher = {...defaultForm}//复制对象
            }
        },
       saveOrUpdate() {
           if(!this.teacher.id){
               this.saveData()
           }else{
               this.updateTeacher()
           }
         
        },

        // 保存
         saveData() {
            teacher.saveTeacher(this.teacher).then(response => {
                return this.$message({
                type: 'success',
                message: '保存成功!'
                })
            }).then(resposne => {
                //根据路径跳转（相当于以前的重定向）
                this.$router.push({ path: '/teacher' })
            }).catch((response) => {
                // console.log(response)
                this.$message({
                type: 'error',
                message: '保存失败'
                })
            })
    },
    //回显
        getTeacherById(id){
            teacher.getTeacherById(id)
                .then((response)=>{
                    this.teacher = response.data.item
                })
                .catch(()=>{
                     this.$message({
                        type: 'error',
                        message: '失败'
                        })
                })
        },
        //修改
        updateTeacher(){
            teacher.updateTeacher(this.teacher)
                .then(()=>{
                    return this.$message({
                        type: 'success',
                        message: '修改成功'
                        })
                })
                .then(()=>{
                     //根据路径跳转（相当于以前的重定向）
                     this.$router.push({ path: '/teacher' })
                })
                .catch(()=>{
                    this.$message({
                        type: 'error',
                        message: '失败'
                        })
                })
        },
        // 上传成功后的回调函数
    cropSuccess(data) {
      console.log(data)
      this.imagecropperShow = false//关闭窗口
      this.teacher.avatar = data.imgurl
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果 类似乐观锁的版本号
      this.imagecropperKey = this.imagecropperKey + 1
    },

    // 关闭上传组件
    close() {
      this.imagecropperShow = false//关闭窗口
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果 类似乐观锁的版本号
      this.imagecropperKey = this.imagecropperKey + 1
    }
    }
}
</script>