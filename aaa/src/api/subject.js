import request from '@/utils/request'

export default {
    //显示列表
    getAllSubjectList() {
        return request({
            url: '/yl/subject',
            method: 'get'
          })
    },
    //删除
    removeSubjectId(id) {
        return request({
            url: '/yl/subject/'+id,
            method: 'delete'
        })
    },
    //添加一级分类
    addSubjectOne(subject) {
        return request({
            url: '/yl/subject/addOneLevel',
            method: 'post',
            data:subject
        })
    },
    //添加二级分类
    addSubjectTwo(subject) {
        return request({
            url: '/yl/subject/addTwoLevel',
            method: 'post',
            data:subject
        })
    }
}