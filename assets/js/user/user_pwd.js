$(function(){
    let form = layui.form
    form.verify({
        pwd : [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
        samepwd : function(value){
            let oldPwd = $('[name=oldPwd]').val()
            if(value === oldPwd){
                return '不能与原密码相同'
            }
        },
        repwd : function(value){
            let newPwd = $('[name=newPwd]').val()
            if(value !== newPwd){
                return '两次密码不一致'
            }
        }
    })


$('.layui-form').on('submit',function(e){
    e.preventDefault()
    let dt = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/my/updatepwd',
        data: dt,
        success: function(res){
            if(res.status !== 0){
                return layui.layer.msg(res.message)
            }
            layui.layer.msg('修改密码成功')
        }
    })
})





}) 