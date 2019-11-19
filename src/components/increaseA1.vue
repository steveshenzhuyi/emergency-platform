<template>
  <div>
    <mt-header fixed style="font-size:25px;height: 50px;" title="新建病人">
      <mt-button size="small" type="danger" slot="left" icon="back"
            @click="returnA()"><small>返回</small></mt-button>
      <mt-button size="small" slot="right"
            @click="getcamera()"><small>扫码</small></mt-button>
      <hr>
    </mt-header>
    <br><br>
    <!-- <mt-cell>
      <img src="components/picture/man.png">
      <mt-button size="small" type="primary" plain>
        <img src="./icon/照相.png" height="35" width="35" slot="icon">
        拍照</mt-button>
    </mt-cell> -->
    <hr>
    <!-- <p style="text-align: left">个人信息</p> -->
    <mt-button size="small" @click="getface()" style="margin-bottom:10px;margin-right: 10px"><small>人脸识别拍照</small></mt-button>
    <mt-button size="small" @click="getAnEmergencyNum()" style="margin-bottom:10px"><small>获取紧急编号</small></mt-button>
    <div v-show='isface'><img v-gallery id="image" style="max-height: 200px; max-width: 90%;" ></img></div>
    <mt-button v-show='isface' type="primary" size="small" @click="uploadPicture()"style="margin-bottom:10px"><small>识别</small></mt-button>
      <mt-field label="姓名" v-model="pname"></mt-field>
      <div class="warning_box_radio">  
        <mt-radio  v-show="!iscamera"
          v-model="gender"
          :options="options">
        </mt-radio>
      </div>
      <mt-field v-show="iscamera" label="性别" v-model="gender1" disabled></mt-field>
      <mt-field label="年龄" style="display:flex" v-model="age" type='number'></mt-field>
      <mt-field label="民族" v-model="nation"></mt-field>
      <mt-field label="手机" v-model="phone" type='number'></mt-field>
      <mt-field label="邮箱" v-model="email" type='email'></mt-field>
      <mt-field label="单位" v-model="unit"></mt-field>
      <mt-field label="职务" v-model="position"></mt-field>
      <p style="position: absolute;left:52px">
        血型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{blood}}{{type}}</p><hr><br>
      <div v-show="!iscamera">
        <mt-picker :slots="slots" @change="onbloodChange" :visible-item-count="3"></mt-picker>
      </div>
      <br><br>
      <mt-button size="large" type="primary"
            @click="newPatient()">新增病历</mt-button>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
// import { Radio } from 'mint-ui';

// Vue.component(Radio.name, Radio);

export default {
  data() {
    return {
      confidence:0,
      base64:'',
      faceid:'0',
      isface:false,
      iscamera:false,
      isem:false,
      groupId : window.localStorage.getItem('GROUPNO'),
      inputUserId : window.localStorage.getItem('USERID'),
      pname: '',
      age: '',
      phone: '',
      gender: '',
      gender1: '',
      unit: '',
      position: '',
      blood: '',
      type: '',
      bloodType: '',
      nation: '',
      email: '',
      photoUrl: '',
      memberId: '',
      options: [
      {
        label: '男',
        value: '1'
      },
      {
        label: '女',
        value: '2'
      }
      ],
      slots: [
      {
        flex: 1,
        values: ['A型','B型', 'AB型', 'O型','不明'],
        className: 'slot1',
      },
      { 
        flex: 1,
        values: ['Rh+', 'Rh-'],
        className: 'slot2',
      },
      ],
    };
  },
  methods: {
    getface(){
      var that = this
      
      navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 100,
        destinationType: 0,
        targetHeight: 300
      });

      function onSuccess(imageData) {
        that.isface = true
        that.base64 = imageData
        document.getElementById('image').src ="data:image/jpeg;base64," + imageData;
      }

      function onFail(message) {
        alert('图片选择失败' + message);
      }

    },
    uploadPicture(){
      var that = this
      that.confidence = 0
      that.faceid = '0'
      var fd = new FormData()
      fd.append('image_base64', that.base64)
      fd.append('api_key', '3w6Df-OtcDBxNvrUWitVTjstLkxp4isX')
      fd.append('api_secret','ntdkqsfCGgrCI_SIVtQEl7AHO6093PWy')
      fd.append('faceset_token','5a7a9cc6cb9b27bfe063203125ccaed5')
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post('https://api-cn.faceplusplus.com/facepp/v3/search',fd).then( res => {
        console.log(res.data.results)
        if(res.data.results != null){
          for (var i = 0; i < res.data.results.length; i++) {
            if(res.data.results[i].confidence>60 && res.data.results[i].confidence>=that.confidence)that.faceid = res.data.results[i].user_id
          }
        if(that.faceid!='0'){
          // alert("识别ID"+res.data.results[0].user_id)
          axios.post('/getMemberInfo',{
            memberId:that.faceid
          }).then((response) => {
            console.log(response)
            if(response.data.results && response.data.results.length>0){
              that.iscamera = true
              that.isface = true
              if(response.data.results[0].VIPTag == true){
                that.pname = 'VIP'+that.faceid
              }else{
                var tempname = response.data.results[0].Name
                that.pname = tempname.substring(0,1)+'*'+tempname.substring(2)
              }
              that.age = response.data.results[0].Age
              that.gender = response.data.results[0].Gender
              that.unit = response.data.results[0].Unit
              that.position = response.data.results[0].Position
              that.bloodType = response.data.results[0].BloodType
              that.nation = response.data.results[0].Nation
              that.email = response.data.results[0].Email
              that.photoUrl = response.data.results[0].PhotoUrl
              that.phone = response.data.results[0].Phone
              that.memberId = that.faceid

              if(that.bloodType == 1){
                that.blood = "A型"
                that.type = "Rh+"
              }
              else if(that.bloodType == 2){
                that.blood = "A型"
                that.type = "Rh-"
              }
              else if(that.bloodType == 3){
                that.blood = "B型"
                that.type = "Rh+"
              }
              else if(that.bloodType == 4){
                that.blood = "B型"
                that.type = "Rh-"
              }
              else if(that.bloodType == 5){
                that.blood = "AB型"
                that.type = "Rh+"
              }
              else if(that.bloodType == 6){
                that.blood = "AB型"
                that.type = "Rh-"
              }
              else if(that.bloodType == 7){
                that.blood = "O型"
                that.type = "Rh+"
              }
              else if(that.bloodType == 8){
                that.blood = "O型"
                that.type = "Rh-"
              }
              else if(that.bloodType == 0){
                that.blood = "不明"
                that.type = ""
              }

              if(that.gender == 1){
                that.gender1 = '男'
              }else if(that.gender == 2){
                that.gender1 = '女'
              }else that.gender1 = '不明'
            }else alert("无此人详细信息")

          }).catch(function(error){
            console.log("error",error);
          });
        }else alert("人像库中没有此人信息")
      }else{
        alert("无法识别人脸，请重试")
      }
    }).catch(function(error){
      console.log("error",error);
    });
  },
  getcamera(){
    var that = this;
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        console.log(result.text)
        if(result.text && result.text!=undefined){
          axios.post('/getMemberInfo',{
            memberId:result.text
          }).then((response) => {
            console.log(response)
            if(response.data.results && response.data.results.length>0){
              that.iscamera = true
              that.isface = false
              if(response.data.results[0].VIPTag == true){
                that.pname = 'VIP'+result.text
              }else{
                var tempname = response.data.results[0].Name
                that.pname = tempname.substring(0,1)+'*'+tempname.substring(2)
              }
              that.age = response.data.results[0].Age
              that.gender = response.data.results[0].Gender
              that.unit = response.data.results[0].Unit
              that.position = response.data.results[0].Position
              that.bloodType = response.data.results[0].BloodType
              that.nation = response.data.results[0].Nation
              that.email = response.data.results[0].Email
              that.photoUrl = response.data.results[0].PhotoUrl
              that.phone = response.data.results[0].Phone
              that.memberId = result.text

              if(that.bloodType == 1){
                that.blood = "A型"
                that.type = "Rh+"
              }
              else if(that.bloodType == 2){
                that.blood = "A型"
                that.type = "Rh-"
              }
              else if(that.bloodType == 3){
                that.blood = "B型"
                that.type = "Rh+"
              }
              else if(that.bloodType == 4){
                that.blood = "B型"
                that.type = "Rh-"
              }
              else if(that.bloodType == 5){
                that.blood = "AB型"
                that.type = "Rh+"
              }
              else if(that.bloodType == 6){
                that.blood = "AB型"
                that.type = "Rh-"
              }
              else if(that.bloodType == 7){
                that.blood = "O型"
                that.type = "Rh+"
              }
              else if(that.bloodType == 8){
                that.blood = "O型"
                that.type = "Rh-"
              }
              else if(that.bloodType == 0){
                that.blood = "不明"
                that.type = ""
              }

              if(that.gender == 1){
                that.gender1 = '男'
              }else if(that.gender == 2){
                that.gender1 = '女'
              }else that.gender1 = '不明'
            }else alert("无此人详细信息")

          }).catch(function(error){
            console.log("error",error);
          });
        }else alert("扫描失败")
      })

  },
  onbloodChange(picker, values) {
   this.blood = values[0];
   this.type = values[1];
   console.log(this.gender)
 },
 returnA() {
  this.$router.push({name: '病人列表',params:{SELECTED:"病人"}})
},
newPatient() {
  if(this.blood === "A型" && this.type === "Rh+") {
    this.bloodType = '1'
  }else if(this.blood === "A型" && this.type === "Rh-") {
    this.bloodType = '2'
  }else if(this.blood === "B型" && this.type === "Rh+") {
    this.bloodType = '3'
  }else if(this.blood === "B型" && this.type === "Rh-") {
    this.bloodType = '4'
  }else if(this.blood === "AB型" && this.type === "Rh+") {
    this.bloodType = '5'
  }else if(this.blood === "AB型" && this.type === "Rh-") {
    this.bloodType = '6'
  }else if(this.blood === "O型" && this.type === "Rh+") {
    this.bloodType = '7'
  }else if(this.blood === "O型" && this.type === "Rh-") {
    this.bloodType = '8'
  }else if(this.blood === "不明") {
        this.bloodType = '0'
      }
  if(this.gender!=1 && this.gender!=2)this.gender=0;
  if(this.pname == "" || this.pname == null){
    Toast('姓名不能为空');
  }else{
    if(this.isem == false && this.iscamera == false){
      axios.post('/newMember',{
        name:this.pname
      }).then((response) => {
        this.memberId = response.data.results[0].memberId
        var tempname = response.data.results[0].Name
        this.pname = tempname.substring(0,1)+'*'+tempname.substring(2)
        axios.post('/newPatient',{
          groupId: this.groupId,
          inputUserId: this.inputUserId,
          gender: this.gender,
          pname: this.pname,
          age: this.age,
          phone: this.phone,
          bloodType: this.bloodType,
          unit: this.unit,
          position: this.position,
          nation: this.nation,
          email: this.email,
          photoUrl: '',
          memberId: this.memberId
        }).then((response) => {
          console.log(response)
          if(response.data.results != "新建失败") {
            var pid = response.data.results[0].PatientId
            Toast('创建成功');
            axios.post('/reportPatient',{
          patientId:pid
        }).then((response) => {
          if(response.data.results == "上传成功") {
            // alert("上报成功");
            Toast('成功上报指挥中心');
            this.$router.push({name: 'A2',params:{PATIENTID:pid,SELECTED1:"患者病历"}})
          }else{
            // alert("上报失败");
            Toast('上报失败');
          }
        })
            
          }else {
            Toast('创建失败');
          }
        }).catch(function(error){
          console.log("error",error);
        });

      }).catch(function(error){
        console.log("error",error);
      });
    }else{
      axios.post('/newPatient',{
        groupId: this.groupId,
        inputUserId: this.inputUserId,
        gender: this.gender,
        pname: this.pname,
        age: this.age,
        phone: this.phone,
        bloodType: this.bloodType,
        unit: this.unit,
        position: this.position,
        nation: this.nation,
        email: this.email,
        photoUrl: '',
        memberId: this.memberId
      }).then((response) => {
        console.log(response)
        if(response.data.results != "新建失败") {
          var pid = response.data.results[0].PatientId
          Toast('创建成功');
          axios.post('/reportPatient',{
          patientId:pid
        }).then((response) => {
          if(response.data.results == "上传成功") {
            // alert("上报成功");
            Toast('成功上报指挥中心');
            this.$router.push({name: 'KSA1',params:{PATIENTID:pid,SELECTED1:"患者病历"}})
          }else{
            // alert("上报失败");
            Toast('上报失败');
          }
        })
            
          }else {
            Toast('创建失败');
          }
      }).catch(function(error){
        console.log("error",error);
      });
    }
  }
},
getAnEmergencyNum(){
  axios.get('/getAnEmergencyNum',{}).then((response) => {
    this.isem = true
    this.pname = '紧急'+String(response.data.results).substr(2)

  }).catch(function(error){
    console.log("error",error);
  })
}
}
}
</script>

<style lang="less">
.warning_box_radio{
  display:flex;
  margin: 0  40px 0 24px;
  .mint-cell{
    float: left;
    .mint-cell-wrapper{
      background-position: 0%;
    }
  }  
}
</style>

