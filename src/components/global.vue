<script type="text/javascript">
    // 定义一些公共的属性和方法
    const photoUrl = 'http://101.132.140.25:8001/photos/'
    const uploadUrl = "http://101.132.140.25:3000/upload"
    const facecheck = "http://101.132.140.25:3000/facecheck"
    function commonFun() {
        console.log("公共方法")
    }
    // 暴露出这些属性和方法
    export default {
        photoUrl,
        uploadUrl,
        commonFun
    }
</script>