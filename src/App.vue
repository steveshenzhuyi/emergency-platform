<template>
  <div align="center" id="app" style="text-align: center;">
    <router-view v-if ="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide (){
    return {
      reload:this.reload
    }
  },
  data() {
    return {
      isRouterAlive:true
    }
  },
  mounted(){
    var that = this
    document.addEventListener("jpush.receiveNotification", function (event) {
  var alertContent
    alertContent = event.extras.type
    if(alertContent == 'video'){
    that.GLOBAL.changeVideoAlert(true)
    }
    console.log(that.GLOBAL)
}, false)

  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
  components: {
  }
};
</script>