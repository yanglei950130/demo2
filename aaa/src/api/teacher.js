import request from '@/utils/request' //模板提供的组件，axios封装
const apiUrl = '/yl/teacher'
export default {
   
   //另一种写法
    getTeacherPageListTest(page,limit,searchObj) {
        //分页加条件显示
        return request({
            //后端controller里面的路径
            url: `${apiUrl}/queryListByPage/${page}/${limit}`,
            //提交方式
            method: 'post',
            //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
            data: searchObj
        })
    },
    //分页条件查询的方法
    //三个参数：当前页，每页记录数，条件封装对象
    getTeacherPageList(page,limit,searchObj) {
        //分页加条件显示
        return request({
            //后端controller里面的路径
            url: '/yl/teacher/queryListByPage/'+page+'/'+limit,
            //提交方式
            method: 'post',
            //传递条件对象,如果传递json数据，使用data。如果不是json，使用params
            data: searchObj
        })
    },
    //删除
    deleteTeacherId(id) {
        return request({
            //后端controller里面的路径
            url: '/yl/teacher/'+id,
            //提交方式
            method: 'delete'
        })
    },
    //添加
    saveTeacher(teacher) {
        return request({
            //后端controller里面的路径
            url: '/yl/teacher/addTeacher',
            //提交方式
            method: 'post',
            data:teacher
        })
    },
    //回显
    getTeacherById(id) {
        return request({
            //后端controller里面的路径
            url: '/yl/teacher/getTeacherById/'+id,
            //提交方式
            method: 'get'
        })
    },
    //修改
    updateTeacher(teacher){
        return request({
            //后端controller里面的路径
            url: '/yl/teacher/updateTeachre',
            //提交方式
            method: 'post',
            data:teacher
        })
    }


}