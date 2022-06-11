$(function () { 
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
    });
    const initUserInfo = () => { 
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success: (res) => { 
             
                console.log(res);
                const { status } = res;
                const { data}=res
                if (status == 0) {
                    layer.msg('获取用户信息成功')
                    //填充表单
                    form.val("formUserInfo",data)
                } else {
                    return layer.msg('获取用户信息失败')
                 }
            }
        })
       
    }
    initUserInfo()
//重置功能
     $('#btnReset').click((e) => {
            e.preventDefault();
                initUserInfo()
     })
    //更新用户信息
    $('.layui-form').submit(function (e) { 
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(".layui-form").serialize(),
            success: (res) => { 
                const { status}=res
                if (status !== 0) {
                    return layer.msg('用户信息更新失败')
                } else { 
                    layer.msg('用户信息更新成功')
                    //通知父页面更新页面
                    window.parent.getUserInfo()
                }
            }
        })
    })
})
