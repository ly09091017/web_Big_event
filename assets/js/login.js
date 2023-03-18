$(function(){
    //登录注册切换
    //切换注册
    $('#link-reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //切换登录
    $('#link-login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })


    //登录自定义验证密码和确认密码
    let form = layui.form
    form.verify({
       repwd : function(value){
            let pwd = $('#password').val()
            if(value !== pwd){
                return '两次密码不一致'
            }
       },
       pwd : [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格']
    })





    //监听注册表单的提交时间
    let layer = layui.layer
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.post('/api/reguser',
        {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},
        function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            $('#link-login').click()
        })
    })
    //监听登录表单的提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        let dt = {
            username:$('#form_login [name=username]').val(),
            password:$('#form_login [name=password]').val()
        }
        $.ajax({
            url:'/api/login',
            type:'post',
            data:dt,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'     
            }
        })
    })
})