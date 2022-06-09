
const layer = layui.layer;
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: (res) => { 
            const { data}  =res
            // console.log(res);
             if (res.status !== 0) return layer.msg("获取用户信息失败！");
            layer.msg("获取用户信息成功！");
            //调用渲染函数
            renderAvatar(data)
        }
    })
};
getUserInfo()
const renderAvatar = (user) => {
    const name = user.nickname || user.username
    // console.log(name);
    $('#welcome').html(`欢迎${name}`)
    if (user.user_pic!==null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
          $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
      
    }
}
// 退出登录
$("#btnLogout").click(() => {
    layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "" },
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        }
    );
});