<template>
    <div>
        <mt-header style="font-size:20px" title="心肺复苏指导">
      <mt-button size="small" type="danger" slot="left" icon="back"
            @click="returnA()"><small>返回</small></mt-button>
<!--       <mt-button size="small" slot="right"
            @click="$goRoute('/')"><small>扫码</small></mt-button> -->
    </mt-header>
    <router-view></router-view>
    </div>
</template>

<script>
export default {
  methods: {
    returnA() {
      this.$router.push({name: '病人列表',params:{SELECTED:"病人"}});
    }
  },
}
</script>

