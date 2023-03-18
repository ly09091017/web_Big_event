$(function(){
    getUserInfo()
    $('#btnlogout').on('click',function(index){
        layui.layer.confirm('确定退出管理系统吗',{icon:3,title:'退出'},function(){
            localStorage.removeItem('token')
            location.href = '/login.html'
        })
    })
})

function getUserInfo(){
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function(res){
            if(res.status !== 0){
                return layui.layer.msg(res.message)
            }
            layui.layer.msg('获取成功')
            getAvatar(res.data)
        },
    })
}

function getAvatar(res){
    let name = res.nickname || res.username  
    if(res.user_pic === null){
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase())
    }else{
        $('.layui-nav-img').attr('src',res.user_pic)
        $('.text-avatar').hide()
    }
    $('#welcome').html(name)
}

