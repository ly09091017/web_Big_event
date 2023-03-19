$(function(){
    let form = layui.form
    form.verify({
        nickname : function(value){
            if(value.length < 2 || value.length > 6){
                return '用户昵称长度必须2-6位'
            }
        }
    })

    getUserInfo()
    resetUserInfo()  
    submitUserInfo()
})

function getUserInfo(){
    $.ajax({
        url : '/my/userinfo',
        type : 'get',
        success : function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败')
            }
            let formUserInfo = layui.form.val('formUserInfo',res.data)
        }
    })
} 

function resetUserInfo(){
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        getUserInfo()
    })
}

function submitUserInfo(){
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        let dt = $(this).serialize()
        $.ajax({
            url :   '/my/userinfo',
            type : 'post',
            data : dt,
            success :function(res){
                if(res.status !== 0){
                    return layui.layer.msg('修改用户信息失败')
                }
                layui.layer.msg('修改用户信息成功')
                window.parent.getUserInfo()
            }
        })
    })
}