$(function() {
    initArtCateList()
    var layer = layui.layer
    var form = layui.form

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',

            content: $('#dialog-add').html()
        })
    })

    // 通过代理 为 form-add 绑定 submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('添加文章类别失败！')
                }
                initArtCateList()
                layer.msg('添加文章类别成功！')
                    // 关闭弹出层
                layer.close(indexAdd)
            }
        })
    })

    //  通过代理 为 btn-edit 绑定 onclick事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出修改文章信息层
        indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',

                content: $('#dialog-edit').html()
            })
            // 发请求获取对应分类的数据
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })

    //   代理 绑定 submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新文章分类失败！')
                }
                layer.msg('更新文章分类成功！')
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })

    //  删除
    $('tbody').on('click', ".btn-delete", function() {
        var id = $(this).attr('data-id')
            // 提示用户 删除
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    layer.close(index);
                    initArtCateList()
                }

            })


        });
    })
})