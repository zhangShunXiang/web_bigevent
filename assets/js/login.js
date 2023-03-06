(function () {
    $('.reg-login-toogle ').on('click', function () {
        $(this).parent().hide().siblings().show();
    })

    const form = layui.form;
    form.on('submit(login)', function (data) {
        username = data.field.username
        password = data.field.password
         data={username:username,password:password}
        $.ajax({
             url: '/api/login',
             method:"post",
             data:$('#login').serialize(),
             success:function(res){
                if(res.status!==0)  return layer.msg('登录失败')
                layer.msg('登录成功！')
                localStorage.setItem('token',res.token)
                location.href="/index.html"
             }
            
        })
        return false
    })
    form.on('submit(reg)', function (data) {
        username = data.field.username
        password = data.field.password
         data={username:username,password:password}
        $.post('/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                // 模拟人的点击行为
                $('.reg-login-toogle ').click()
            })
        return false
    })

 
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // console.log(value);
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box').val()
            // console.log(pwd);
            if (pwd !== value) {
                return '两次密码不一致！'
            }

        }
    })

})()