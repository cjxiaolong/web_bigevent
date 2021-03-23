$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 位之间'
            }
        }
    })
    initUserInfo()
    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                // 调用 form.val() 快速赋值
                form.val('formUserInfo', res.data)
            }

        })
    }

    $('#btnReset').on('click', function (e) {
        // 阻止默认重置
        e.preventDefault();
        initUserInfo()
    })

    //  监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败！')
                }
                layer.msg('用户信息修改成功！')
                initUserInfo()
                window.parent.getUserInfo()
            }
        })
    })

})