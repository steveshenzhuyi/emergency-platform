<script type="text/javascript">
    // 定义一些公共的属性和方法
    // var photoUrl = 'http://101.132.140.25:8001/photos/'
    // var uploadUrl = "http://101.132.140.25:3000/upload"
    // var facecheck = "http://101.132.140.25:3000/facecheck"
    var photoUrl = 'http://47.98.252.131:8001/photos/'
    var uploadUrl = "http://47.98.252.131:3000/upload"
    var facecheck = "http://47.98.252.131:3000/facecheck"
    
    var showVideoAlert = false
    function changeVideoAlert(now) {
        this.showVideoAlert = now
    }
    // 暴露出这些属性和方法
    export default {
        photoUrl,
        uploadUrl,
        changeVideoAlert,
        showVideoAlert
    }
</script>