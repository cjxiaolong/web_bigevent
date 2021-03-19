$(function() {
    // 点击'去注册账号'链接

    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()

        })
        // 点击'去登录'链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()

    })

    // 从layui获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能有空格'],
        repwd: function(value) {
            //  通过形参拿到的时确认密码框中的内容
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),

            }
            $.post('/api/reguser',
                data,
                function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('注册成功，请登录！');
                    // 点击跳转
                    $('#link_login').click()
                })
        })
        // 监听登录表单
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
            // var data = {
            //     username: $('#form_login [name=username]').val(),
            //     password: $('#form_login [name=password]').val(),

        // }
        // $.post('http://api-breakingnews-web.itheima.net/api/login', data,
        //     function(res) {
        //         if (res.status !== 0) {
        //             return console.log(res.message);
        //         }
        //         console.log('登录成功');
        //     })

        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                // 将登录成功得到的 token 字符串，保存到locaStorag中
                localStorage.setItem('token', res.token)
                console.log(res.token);
                // 跳转后台主页
                location.href = '../index.html'
            }
        })

    })
})