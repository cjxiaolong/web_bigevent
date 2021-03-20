$(function() {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        // 提示用户是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //  1. 清空本地存储
            localStorage.removeItem('token')
                // 2.重新跳转登录页
            location.href = 'login.html'
                // 关闭 confirm 询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')

            }
            console.log(res);
            renderAvatar(res.data)
        },
        //  无论成功或失败 都会调用这个函数
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //    强制清空 token
        //         localStorage.removeItem('token')
        //             // 2.强制  跳转登录页
        //         location.href = '../login.html'
        //     }
        // }

    })
}

// 渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username
        // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
        //  按需渲染图片头像
    if (user.user_pic !== null) {
        //  渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //  渲染文本头像
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()
    }
}