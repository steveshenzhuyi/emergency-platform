<template>
  <div align="center">
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="患者病历">
        <mt-header fixed style="font-size:25px;height: 50px;" :title="title1">
          <mt-button size="small" icon="back" slot="left"
          @click="returnA()"><small>返回</small></mt-button>
          <mt-button size="small" slot="right"
          @click="alertHelp()"><small>远程支持
          </small></mt-button>
          <hr>
        </mt-header>
        <br><br>
        <mt-navbar v-model="selected1">
          <mt-tab-item id="1">主诉</mt-tab-item>
          <mt-tab-item id="2">现病史</mt-tab-item>
          <mt-tab-item id="3">体征</mt-tab-item>
          <mt-tab-item id="4">既往史</mt-tab-item>
          <mt-tab-item id="5">初步诊断</mt-tab-item>
          <mt-tab-item id="6">基本信息</mt-tab-item>
        </mt-navbar>
        <br>
        <mt-tab-container v-model="selected1">
          <mt-tab-container-item id="1">
            <div align="left">
              <small style="color:grey">{{timevalue}}</small>
              <mt-field type="textarea" placeholder="请输入内容" v-model="主诉" rows="5" v-on:focus.native.capture="focus1()" v-on:blur.native.capture="blur1()"></mt-field>
            </div>
            <div align="center" v-show="editing1" style="height: 35px">
              <mt-button  v-show="editing1" size="small" type="primary" style="float: right;margin-top: 5px"
              @click="save10()">保存</mt-button>
             <mt-button  v-show="editing1" size="small" style="float: right; margin-right:10px;margin-top: 5px"
              @click="cancel1()">取消</mt-button>
              </div>
              <hr>
            <div v-for="(item,index) in 主诉图片">
              <div align="center">
              <small style="color:grey">{{item.time}}</small></div>
              <div align="center">
           <img v-gallery :src="item.fileUrl" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;"></div>
          </div>
          <hr>
          <div align="center">
          <img v-gallery v-show="photoing" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;" id='image1'>
        </div>
        <div align="center">
          <mt-button size="small"  style="float: left" type="primary" plain  @click="takephoto1()">
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon">拍照</mt-button>
          <mt-button size="small" style="float: left; margin-left: 10px" type="danger" plain @click="choosephoto1()">
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon" >相册</mt-button>
          <mt-button size="small" type="primary" style="float: right;position" @click="uploadPicture1()">上传</mt-button>
        </div>
        <br><br><br><br><br><br>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div align="left">
            <small style="color:grey">{{timevalue1}}</small>
            <mt-field type="textarea" placeholder="请输入内容" v-model="现病史" rows="5" v-on:focus.native.capture="focus2()" v-on:blur.native.capture="blur2()" ></mt-field>
          </div>
          <div align="center" v-show="editing2" style="height: 35px">
              <mt-button  v-show="editing2" size="small" type="primary" style="float: right;margin-top: 5px"
              @click="save20()">保存</mt-button>
             <mt-button  v-show="editing2" size="small" style="float: right; margin-right:10px;margin-top: 5px"
              @click="cancel2()">取消</mt-button>
              </div>
              <hr>
          <div v-for="(item,index) in 现病史图片">
              <div align="center">
              <small style="color:grey">{{item.time}}</small></div>
              <div align="center">
           <img v-gallery :src="item.fileUrl" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;"></div>
          </div>
          <hr>
          <div align="center">
          <img v-gallery v-show="photoing" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;" id='image2'>
        </div>
        <div align="center">
          <mt-button size="small"  style="float: left" type="primary" plain  @click="takephoto2()">
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon">拍照</mt-button>
          <mt-button size="small" style="float: left; margin-left: 10px" type="danger" plain @click="choosephoto2()">
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon" >相册</mt-button>
          <mt-button size="small" type="primary" style="float: right;position" @click="uploadPicture2()">上传</mt-button>
        </div>
        <br><br><br><br><br><br>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div align="center" style="height:28px"><span style="float: left;">常用体征</span></div><hr>
        <div>
          <mt-button size="small" @click.native="popupVisible3 = true" style="position:absolute;left:30px;width: 90px"
            type="primary" plain>监护</mt-button>
          <mt-button size="small" @click="heartrate()" style="position:relative;left:30px;width: 90px"
            type="primary" plain>心率</mt-button>
          <mt-button size="small" @click="bloodpressure()" style="position:relative;left:60px;width: 90px"
            type="primary" plain>血压</mt-button>
          <mt-button size="small" @click="temprature()" style="position:relative;left:90px;width: 90px"
            type="primary" plain>体温</mt-button>
          </div>
            <br> 
            <div>
          <mt-button size="small" @click="breath()" style="position:absolute;left:30px;width: 90px"
            type="primary" plain>呼吸</mt-button>
          <mt-button size="small" @click="bloodoxygen()" style="position:absolute;left:150px;width: 90px"
            type="primary" plain>血氧</mt-button>
          <mt-button size="small" @click="symptom()" style="position:relative;left:60px;width: 90px"
            type="primary" plain>其他</mt-button><hr>
          </div>
          <div v-show="istizheng" style=" padding:3px;border:1px solid blue;margin:3px;" align="right">
            <div align="center">新增体征：{{体征}}</div>
            <mt-field placeholder="内容" v-model="content" type="textarea" rows="2"></mt-field>
            <mt-button @click="add()" size="small" type="primary">确定</mt-button>
          </div>
           <div style="margin-top: 15px;margin-bottom: 15px" align="left"><span style="text-align: left;">体征列表</span><span><mt-button size="small" type="primary"  @click="Showdelete()" style="float: right;margin-right: 5px">管理</mt-button></span></div>
          <div v-for="(item,index) in dataTZ" style="text-align: left">
            <hr>
            <div>
              <div><small style="color:grey">{{item.OperationTime}}&nbsp;&nbsp;&nbsp;{{item.Address==1?'地点：会场':'地点：车辆'}}</small><mt-button v-show="showdelete" size="small" type="danger"  @click="deleteTZ(index)" style="position:absolute;right:5px" text-align="right">删除</mt-button></div>
              <div><b>{{item.OperationName}}</b></div><div><span style="display:inline-block;width:380px">{{item.Detail}}</span></div>
            </div>
          </div>
          <br><br><br><br>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <div align="center" style="height:30px">
          <mt-button v-show="editing41" size="small" style="float: right;margin-top: 2px" type="primary" @click="save41()">保存</mt-button>
          <mt-button  v-show="editing41" size="small" style="float: right; margin-right:10px;margin-top: 2px"
              @click="cancel41()">取消</mt-button>
          <span style="float: left;">过敏史</span>
        </div>
          <div align="left">
            <mt-field  type="textarea" placeholder="请输入内容" v-model="过敏史" rows="2" v-on:focus.native.capture="focus41()" v-on:blur.native.capture="blur41()"></mt-field><hr>
          </div>
         <!--  <div style="height: 33px">
          <mt-button size="small" style="float: left" type="primary" plain>
          <img src="./icon/录音.png" height="35" width="35" slot="icon">语音</mt-button>
          </div> -->
          <div align="center" style="height:30px">
          <mt-button v-show="editing42" size="small" style="float: right;margin-top: 2px" type="primary" @click="save42()">保存</mt-button>
          <mt-button  v-show="editing42" size="small" style="float: right; margin-right:10px;margin-top: 2px"
              @click="cancel42()">取消</mt-button>
          <span style="float: left;">疾病史</span>
        </div>
          <div align="left">
            <mt-field type="textarea" placeholder="请输入内容" v-model="疾病史"  rows="2" v-on:focus.native.capture="focus42()" v-on:blur.native.capture="blur42()"></mt-field><hr>
          </div>
          <!-- <div style="height: 33px">
          <mt-button size="small" style="float: left" type="primary" plain>
          <img src="./icon/录音.png" height="35" width="35" slot="icon">语音</mt-button>
          </div> -->
          <div align="center" style="height:30px">
          <mt-button v-show="editing43" size="small" style="float: right;margin-top: 2px" type="primary" @click="save43()">保存</mt-button>
          <mt-button  v-show="editing43" size="small" style="float: right; margin-right:10px;margin-top: 2px"
              @click="cancel43()">取消</mt-button>
          <span style="float: left;">目前用药</span>
        </div>
          <div align="left">
            <mt-field type="textarea" placeholder="请输入内容" v-model="目前用药"  rows="2" v-on:focus.native.capture="focus43()" v-on:blur.native.capture="blur43()"></mt-field><hr>
          </div>
            <div v-for="(item,index) in 既往史图片">
              <div align="center">
              <small style="color:grey">{{item.time}}</small></div>
              <div align="center">
           <img v-gallery :src="item.fileUrl" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;"></div>
          </div>
          <hr>
          <div align="center">
          <img v-gallery v-show="photoing" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;" id='image4'>
        </div>
        <div align="center">
          <mt-button size="small"  style="float: left" type="primary" plain  @click="takephoto4()">
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon">拍照</mt-button>
          <mt-button size="small" style="float: left; margin-left: 10px" type="danger" plain @click="choosephoto4()">
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon" >相册</mt-button>
          <mt-button size="small" type="primary" style="float: right;position" @click="uploadPicture4()">上传</mt-button>
        </div>
          <br><br><br><br><br><br>
        </mt-tab-container-item>
        <mt-tab-container-item id="5">
          <div align="center" style="height:30px">
              <span style="float: left;">初步诊断</span></div>
          <div align="left">
            <small style="color:grey">{{timevalue2}}</small>
            <mt-field type="textarea" placeholder="请输入内容" v-model="初步诊断" rows="3" v-on:focus.native.capture="focus5()" v-on:blur.native.capture="blur5()"></mt-field>
          </div>
          <div align="center" v-show="editing5" style="height: 35px">
              <mt-button  v-show="editing5" size="small" type="primary" style="float: right;margin-top: 5px"
              @click="save50()">保存</mt-button>
             <mt-button  v-show="editing5" size="small" style="float: right; margin-right:10px;margin-top: 5px"
              @click="cancel5()">取消</mt-button>
              </div>
  <!-- <div>
            <mt-button size="small" style="float: left" type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">语音</mt-button>
            <img :src="photosrc" style="max-height: 200px; max-width: 90%;"><hr>
            <mt-button size="small" style="float: left; margin-left: 10px" type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon" @click="choosephoto()">图片</mt-button>
            <mt-button size="small" type="primary" style="float: right" @click="uploadPicture()">上传</mt-button>
          </div> -->
          <hr>
          <div align="center" style="height:30px"><span style="float: left;">预检分级</span></div>
          <div align="left" style="height:30px">
            <span><b>当前分级：{{level}}</b></span>
          <mt-button @click="setclass()" size="small" style="float: right;margin-right: 10px" v-show="settingclass">修改分级</mt-button>
          </div>
          <hr>
          <mt-picker :slots="slots" @change="onPatientlistChange" :visible-item-count="3"></mt-picker><hr>
          <div><small style="color:grey">病人分级为I级或II级时，系统将自动上报。其他情况有需要时，可以使用手动一键上报。</small></div>
          <mt-button type="danger" @click="alert()">一键上报</mt-button><br><br><br><br>
        </mt-tab-container-item>
        <mt-tab-container-item id="6">
          <img src="./pictrue/man.png"><hr>
          <mt-field label="编号" v-model="PatientId" disabled></mt-field>
          <mt-field label="姓名" v-model="Name" disabled></mt-field>
          <mt-field label="性别" v-model="Gender" disabled></mt-field>
          <mt-field label="年龄" v-model="Age" disabled></mt-field>
          <mt-field label="民族" v-model="Nation" disabled></mt-field>
          <mt-field label="手机" v-model="Phone" disabled></mt-field>
          <mt-field label="邮箱" v-model="Email" disabled></mt-field>
          <mt-field label="单位" v-model="Unit" disabled></mt-field>
          <mt-field label="职务" v-model="Position" disabled></mt-field>
          <mt-field label="血型" v-model="bloodType" disabled></mt-field><br><br><br><br>
         <!-- <mt-button size="small" style="position:relative;left:100px"
          type="danger" @click="edit">修改</mt-button><br><hr> -->
        </mt-tab-container-item>
      </mt-tab-container>
    </mt-tab-container-item>
    <mt-tab-container-item id="处置方案">
      <mt-header fixed style="font-size:25px;height: 50px;" :title="title2">
      <mt-button size="small" icon="back" slot="left"
        @click="returnA()"><small>返回</small></mt-button>
      <!-- <mt-button size="small" slot="right"
        @click="()"><small>监护</small></mt-button> -->
      <hr>
      </mt-header>
      <br><br>
      <div>
        <div style="text-align: left; margin-top: 10px">常用处置</div><hr>
        <div>
        <mt-button size="small" @click="oxygen()" style="position:absolute;left:30px;width: 90px"
          type="primary" plain>吸&nbsp;&nbsp;氧</mt-button>
        <mt-button size="small" @click="ECG()" style="position:relative;left:30px;width: 90px"
          type="primary" plain>&nbsp;心电图&nbsp;</mt-button>
        <mt-button size="small" @click="bandage()" style="position:relative;left:60px;width: 90px"
          type="primary" plain>包扎止血</mt-button>
           <mt-button size="small" @click="stone()" style="position:relative;left:90px;width: 90px"
          type="primary" plain>支具固定</mt-button>
        </div>
          <br>
          <div>
        <mt-button size="small" @click="drug()" style="position:absolute;left:30px;width: 90px"
          type="primary" plain>口服药物</mt-button>
        <mt-button size="small" @click="dd()" style="position:absolute;left:150px;width: 90px"
          type="primary" plain>静脉给药</mt-button>
        <mt-button size="small" @click="elseway()" style="position:relative;left:60px;width: 90px"
          type="primary" plain>其他处理</mt-button><hr>
          </div> 
      </div>
      <div v-show="isShow4" style=" padding:3px;border:1px solid blue;margin:3px" align="right">
        <div align="center">新增处置：{{methods}}</div>
        <mt-field placeholder="内容" v-model="content1" type="textarea" rows="3"></mt-field>
        <mt-button size="small" @click="add1()" type="primary">确定</mt-button>
      </div>
       <div style="margin-top: 15px;margin-bottom: 15px" align="left"><span style="text-align: left;">处置列表</span><span><mt-button size="small" type="primary"  @click="Showdelete()" style="float: right;margin-right: 5px">管理</mt-button></span></div>
      <div v-for="(item,index) in dataCZ" style="text-align: left">
        <hr> 
        <div><small style="color:grey">{{item.OperationTime}}&nbsp;&nbsp;&nbsp;{{item.Address==1?'地点：会场':'地点：车辆'}}</small><mt-button v-show="showdelete" size="small" type="danger"  @click="deleteCZ(index)" style="position:absolute;right:5px" text-align="right">删除</mt-button></div>
        <div><b>{{item.OperationName}}</b>&nbsp;&nbsp;&nbsp;<span v-show="(item.OperationCode=='P112')">检查单号{{item.Detail1}}</span></div>
        <div>
          <span style="display:inline-block;width:380px">{{item.Detail}}</span>
        </div>
        <div align="center" v-show="item.InfoType==3">
           <img v-gallery :src="item.FileUrl" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;"></div>
      </div><br><br><br><br>
    </mt-tab-container-item>
    <mt-tab-container-item id="病人去向">
      <mt-header fixed style="font-size:25px;height: 50px;" :title="title3">
        <mt-button size="small" icon="back" slot="left"
        @click="returnA()"><small>返回</small></mt-button>
        <mt-button size="small" slot="right" v-show="isShow2"
        @click="confirm()"><small>后送</small></mt-button>
        <hr>
      </mt-header>
      <br><br><br>
      <div style="font-size:20px">选择分流：{{state}}</div>
        <div v-show="isShow3">
          <mt-button plain type="primary" @click="changestate()">处置完成</mt-button>
          <mt-button plain type="danger" @click="gotohospital()">前往医院</mt-button>
          <mt-button plain  @click="self()">自行前往</mt-button>
          <!-- <mt-button plain  @click="sure()">确定选择</mt-button> -->
        </div>
        <hr>
        <div v-show="isShow">
          <div  align="center" style="height:30px">
          <span style="float: left;">添加医嘱</span></div>
          <mt-field placeholder="输入医嘱" v-model="doctortell" type="textarea" :disabled="!isovering" rows="5"></mt-field><hr>
          <!-- <mt-button size="small" type="danger" plain style="float: left; margin-left: 10px">
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
          图片</mt-button> -->
          <mt-button size="small" type="primary" style="float: right" v-show="isovering"
          @click="save60()">确定</mt-button>
        </div>
        <div v-show="isShow1" align="left">
          <span><b>推荐医院：</b>{{goodhos}} &nbsp;&nbsp;</span><span v-show="hide"><b>推荐车辆：</b>{{goodcar}}</span>
          <div style="margin-top:10px;text-align: left"><b>已选医院：</b>
          {{HosNo}}&nbsp;&nbsp;&nbsp;{{OrganizationName}}&nbsp;&nbsp;&nbsp;{{LocationDescription}}</div>
          <div v-show="hide" style="text-align: left;"><b>已选车辆：</b>
          {{CarNo}}&nbsp;&nbsp;&nbsp;{{carname}}&nbsp;&nbsp;&nbsp;{{carId}}</div>
          <div align="center" v-show="isShow100" style="margin: 10px 0px; width: 98%">
          <mt-button size="small"  style="float: left" type="primary" plain  @click.native="popupVisible1 = true">医院列表</mt-button>
          <mt-button size="small" style="float: left; margin-left: 10px" type="primary" plain @click.native="popupVisible2 = true">车辆列表</mt-button>
          <mt-button v-show="isShow100" size="small" type="danger" style="float: right;" @click="ensure()">确定</mt-button>
        </div>
          <div id="map-container" class="map-root" style="width:99%;height:420px;padding:1px;border:1px solid black;margin-top: 50px;">
          </div>
        </div>
        <br>
        <br><br>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-popup v-model="popupVisible1"  position="bottom" closeOnClickModal="true" style="width:100%;height: 50%;overflow: auto;">
          <div v-for="(item,index) in hosList">
            <a @click="gethospital(index)">
            <hr>
            <div align="left">
              编号{{item.OrganizationCode}}&nbsp;&nbsp;{{item.OrganizationName}}&nbsp;&nbsp;
              {{item.LocationDescription}}<br>
              <small style="color:grey">
              ICU剩余{{item.ICUNow}}&nbsp;&nbsp;手术室剩余{{item.ORNow}}&nbsp;&nbsp;专用病房剩余{{item.GWNow}}&nbsp;&nbsp;导管室剩余{{item.DGNow}}</small><br>
              <small style="color:grey;">联系人：{{item.realManager}}</small>
              <small style="color:grey;position:absolute;left:120px">手机：{{item.phone}}</small>
              <small style="color:grey;position:absolute;left:290px">{{item.Time}}</small><br>
              <mt-badge size="small" v-show='item.XiongtongTag'>胸痛</mt-badge>
              <mt-badge size="small" v-show='item.GanranTag'>感染</mt-badge>
              <mt-badge size="small" v-show='item.ZhongduTag'>中毒</mt-badge>
              <mt-badge size="small" v-show='item.CuzhongTag'>卒中</mt-badge>
              <mt-badge size="small" v-show='item.ChuangshangTag'>创伤</mt-badge>
              <mt-badge size="small" v-show='item.HefusheTag'>核辐射</mt-badge>
              <mt-badge size="small" v-show='item.YunchanTag'>孕产</mt-badge>
              <mt-badge size="small" v-show='item.ErtongTag'>儿童</mt-badge>
              <mt-badge size="small" v-show='item.JingshenTag'>精神</mt-badge>
              <mt-badge size="small" v-show='item.ChuanranTag'>传染</mt-badge>
              <mt-badge size="small" v-show='item.XinliTag'>心理</mt-badge>
              <mt-badge size="small" v-show='item.ErchuangTag'>儿创</mt-badge>
            </div><hr>
            </a>
          </div>
        </mt-popup>
        <mt-popup v-model="popupVisible2" position="bottom" style="width:100%;overflow: auto;">
          <div v-for="(item,index) in carList">
            <a @click="getcar(index)">
            <hr>
            <div align="left">
              <div>编号{{item.CarNo}}&nbsp;&nbsp;{{item.CarName}}&nbsp;{{item.CarId}}</div>
              <div><span>{{item.CarStatus}}</span><span style="position:absolute;left:120px">&nbsp;当前待后送：{{item.daihousong}}人</span>
               </div>
              <small style="color:grey;">联系人：{{item.CarManager}}</small>
              <small style="color:grey;position:absolute;left:120px">手机：{{item.phone}}</small>
              <small style="color:grey;position:absolute;left:290px">{{item.Time}}</small>
            </div><hr>
            </a>
          </div>
        </mt-popup>
        <mt-popup v-model="popupVisible3" position="bottom" style="width:100%;height: 70%;overflow: auto;">
          <h4>点选可用设备，给病人使用心电监护。<br>结束上一个病人的监测后，设备才可以重复使用。</h4>
          <div>
            <div align="center" style="height: 30px">
              <span><b>可用设备列表</b></span>
              <mt-button size="small" type="primary" style="float: right;margin-right: 30px"
              @click="getDeviceList()">刷新</mt-button>
              </div>
            <div v-for="(item,index) in useableDeviceList">
            <a @click="">
            <div align="left">
              <div>设备编号：{{item.device_serial_id}}</div>
              <div><span>设备名称：{{item.device_desc}}</span><mt-button size="small" type="primary" style="float: right;margin-right: 30px" @click="startMonitor(index)">使用</mt-button></div>
              <small style="color:grey;">通道号：{{item.channel_no}}</small>
            </div><hr>
            </a>
          </div>
          </div>
          <br>
          <div>
             <div align="center" style="height: 30px;margin-bottom: 10px;">
              <span><b>检查单列表</b></span>
              <mt-button size="small" type="primary" style="float: right;margin-right: 30px"
              @click="getTestList()">刷新</mt-button>
              </div>
             <div v-for="(item,index) in testList">
            <div align="left">
              <div><span>病人姓名：{{item.member_name}}</span><span style="position:absolute;left:150px">&nbsp;当前状态：{{item.status_descprion}}</span><mt-button size="small" type="danger" v-show="item.status==1" style="float: right;margin-right: 30px" @click="stopMonitor(index)">停止监测</mt-button> </div>
              <div>检查单号：{{item.busi_no}}</div>
             <!--  <small style="color:grey;">联系人：{{}}</small>
              <small style="color:grey;position:absolute;left:100px">手机：{{}}</small> -->
            </div><hr>
          </div>
          </div>
        </mt-popup>
    <div>
      <mt-tabbar v-model= "selected" fixed>
        <mt-tab-item id="患者病历">
          <img slot="icon" src="./icon/病历.png"><div style="font-size:12px">患者病历</div>
        </mt-tab-item>
        <mt-tab-item id="处置方案">
          <img slot="icon" src="./icon/处置方案.png"><div style="font-size:12px">处置方案</div>
        </mt-tab-item>
        <mt-tab-item id="病人去向">
          <img slot="icon" src="./icon/去向.png"><div style="font-size:12px">病人去向</div>
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <router-view></router-view>
  </div>
</template>


<script>
  import axios from 'axios';
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import { Popup } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import global from './global.vue'
  export default {
    inject:['reload'],
    data() {
      return {
        goodcar:'车辆1',
        goodhos:'医院1',
        editing1:false,
        editing2:false,
        editing41:false,
        editing42:false,
        editing43:false,
        editing5:false,
        title1:'',
        title2:'',
        title3:'',
        tempzhusu:'',
        tempxianbingshi:'',
        tempguomin:'',
        tempjibing:'',
        tempyongyao:'',
        tempzhenduan:'',
        photoing:false,
        photosrc: global.photoUrl+"zyh_1557216080825test.jpg",
        popupVisible1: false,
        popupVisible2: false,
        popupVisible3: false,
        useableDeviceList:[],
        testList:[],
        nowTime:'',
        intervalid1:null,
        watchID1:null,
        selected: this.$route.params.SELECTED1,
        patientId: this.$route.params.PATIENTID,
        methods: '请选择处置',
        OrganizationName: '',
        ICUNum: '',
        LocationDescription:'',
        // LocationDescription1: '浙医二院',
        carname:'',
        carstate: '',
        destination: '',
        isShow: false,
        isShow1:false,
        isShow2: false,
        isShow3: true,
        isShow4: false,
        isShow100: false,
        istizheng: false,
        isovering:false,
        settingclass:false,
        hide: true,
        value3: '',
        selected1: '1',
        timevalue: '',
        timevalue1: '',
        timevalue2: '',
        visible: false,
        state: '',
        StatusName: '',
        hospital: '',
        car: '',
        carId: '',
        CARNO: '',
        HOSNO: '',
        CarNo: '',
        HosNo: '',
        picked2: '',
        体征: '请选择体征',
        现病史: '',
        现病史图片:[],
        主诉: '',
        主诉图片:[],
        过敏史: '',
        疾病史: '',
        目前用药: '',
        既往史图片:[],
        初步诊断: '',
        content: '',
        content1: '',
        PatientId: '',
        Name: '',
        theways: '',
        Phone: '',
        Email: '',
        bloodType: '',
        Nation: '',
        备注: '',
        Unit: '',
        Position: '',
        level: '',
        Age: '',
        Gender: '',
        patientrecord:[],
        zhusu:[],
        dataTZ:[],
        dataCZ:[],
        hosList:[],
        carList:[],
        Status: '',
        doctortell: '',
        selectform: '',
        flag:'',
        slots: [
        { 
          flex: 1,
          values: ['选择分级','I级', 'II级', 'III级', 'IV级','V级'],
          className: 'slot1',
        }
        ],
        myPosition:'',
        Drivingrender:'',
        showdelete:false,
      };
    },
    mounted() {
      var that = this
      that.initMap()
      that.getpatientrecord()
      that.getPatientInfo()
      that.getDeviceList()
      that.getTestList()

      document.addEventListener("jpush.openNotification", function (event) {
      var alertContent = event.extras.type
      if(alertContent == 'ECG'){
        that.getpatientrecord()
      }
    }, false)
    },
    beforeDestroy () {
      navigator.geolocation.clearWatch(this.watchID1)
      this.watchID1 = null
      clearInterval(this.intervalid1)
      this.intervalid1 = null
    },
    watch: {
      popupVisible1: function (val) {
        if(val) {
          document.getElementsByTagName('mt-tab-container')[0].addEventListener('touchmove', this.handler, { passive: false });
        } else {
          document.getElementsByTagName('mt-tab-container')[0].addEventListener('touchmove', this.handler, { passive: false });
        }
      },
       popupVisible2: function (val) {
        if(val) {
          document.getElementsByTagName('mt-tab-container')[0].addEventListener('touchmove', this.handler, { passive: false });
        } else {
          document.getElementsByTagName('mt-tab-container')[0].addEventListener('touchmove', this.handler, { passive: false });
        }
      }
    },
    methods: {
      handler:function(e) {
        e.preventDefault();
      },
      deleteTZ(index) {
         MessageBox.confirm('确定删除?').then(action => {
        axios.post('/deleteRecord',{
          SortNo:this.dataTZ[index].SortNo
        }).then((response)=>{
          if(response.data.results=="删除成功") {
            Toast('删除成功！')
            this.showdelete=false
            this.getpatientrecord()
          }else{
            Toast('删除失败！')
            this.getpatientrecord()
          }
        }) 
      })
      },
      deleteCZ(index) {
        MessageBox.confirm('确定删除?').then(action => {
        axios.post('/deleteRecord',{
          SortNo:this.dataCZ[index].SortNo
        }).then((response)=>{
          if(response.data.results=="删除成功") {
            Toast('删除成功！')
            this.showdelete=false
            this.getpatientrecord()
          }else{
            Toast('删除失败！')
            this.getpatientrecord()
          }
        }) 
      })
      },
      Showdelete(){
      this.showdelete = !this.showdelete;
    },
      focus1(){
        this.editing1 = true;
        this.tempzhusu = this.主诉;
      },
      blur1(){
        if(this.tempzhusu == this.主诉){
          this.editing1 = false;
          this.tempzhusu = '';
        }else{
          this.editing1 = true;
        }
      },
      cancel1(){
        this.主诉 = this.tempzhusu;
        this.editing1 = false;
        this.tempzhusu = '';
      },
      focus2(){
        this.editing2 = true;
        this.tempxianbingshi = this.现病史;
      },
      blur2(){
        if(this.tempxianbingshi == this.现病史){
          this.editing2 = false;
          this.tempxianbingshi = '';
        }else{
          this.editing2 = true;
        }
      },
      cancel2(){
        this.现病史 = this.tempxianbingshi;
        this.editing2 = false;
        this.tempxianbingshi = '';
      },
      focus5(){
        this.editing5 = true;
        this.tempzhenduan = this.初步诊断;
      },
      blur5(){
        if(this.tempzhenduan == this.初步诊断){
          this.editing5 = false;
          this.tempzhenduan = '';
        }else{
          this.editing5 = true;
        }
      },
      cancel5(){
        this.初步诊断 = this.tempzhenduan;
        this.editing5 = false;
        this.tempzhenduan = '';
      },
      focus41(){
        this.editing41 = true;
        this.tempguomin = this.过敏史;
      },
      blur41(){
        if(this.tempguomin == this.过敏史){
          this.editing41 = false;
          this.tempguomin = '';
        }else{
          this.editing41 = true;
        }
      },
      cancel41(){
        this.过敏史 = this.tempguomin;
        this.editing41 = false;
        this.tempguomin = '';
      },
      focus42(){
        this.editing42 = true;
        this.tempjibing = this.疾病史;
      },
      blur42(){
        if(this.tempjibing == this.疾病史){
          this.editing42 = false;
          this.tempjibing = '';
        }else{
          this.editing42 = true;
        }
      },
      cancel42(){
        this.疾病史 = this.tempjibing;
        this.editing42 = false;
        this.tempjibing = '';
      },
      focus43(){
        this.editing43 = true;
        this.tempyongyao = this.目前用药;
      },
      blur43(){
        if(this.tempyongyao == this.目前用药){
          this.editing43 = false;
          this.tempyongyao = '';
        }else{
          this.editing43 = true;
        }
      },
      cancel43(){
        this.目前用药 = this.tempyongyao;
        this.editing43 = false;
        this.tempyongyao = '';
      },
      getpatientrecord() {
        //重置
        this.主诉图片 = []
        this.既往史图片=[]
        this.现病史图片=[]
        this.dataTZ = []
        this.dataCZ = []
        var Longitude = window.localStorage.getItem("Longitude")
        var Latitude = window.localStorage.getItem("Latitude")
        this.myPosition = new AMap.LngLat(Longitude,Latitude);
        this.Drivingrender = new Lib.AMap.DrivingRender()
        axios.get('/getHosList',{}).then((response) => {
          var that = this
          that.hosList = response.data.results
          AMap.plugin(['AMap.Driving'],function(){
            that.driving = new AMap.Driving({
              policy: AMap.DrivingPolicy.LEAST_TIME
            })
          });
          for(var i=0;i<that.hosList.length;i++){
           (function(j){
             that.hosList[j].position = new AMap.LngLat(response.data.results[j].Longitude, response.data.results[j].Latitude)             
             new AMap.Driving({policy: AMap.DrivingPolicy.LEAST_TIME}).search(that.myPosition, that.hosList[j].position, function (status, result) {
              that.hosList[j].searchresult = result
              that.hosList[j].Time = "预计到达时间"+Math.round(that.hosList[j].searchresult.routes[0].time/60)+"分钟";
             })
           })(i) 
          }
        })
        console.log(this.hosList)
        axios.get('/getCarList',{}).then((response) => {
          var that = this
          var carlist = response.data.results
          var x  =carlist.shift()
          that.carList = response.data.results
          for(var i=0; i<that.carList.length;i++) {
            (function(j){
              axios.post('/getCarStatusCount', {'groupNo': that.carList[j].GroupNo})
              .then((response) => {
                that.carList[j].daihousong = response.data['results'].daihousong
              }).catch(function (error) {
                console.log("error", error);
              })
              if(that.carList[j].CarStatus == "0"){
                that.carList[j].CarStatus = "空闲"
              }else if(that.carList[j].CarStatus == "1") {
                that.carList[j].CarStatus = "正在前往会场："+that.carList[j].Assembly
              }else if(that.carList[j].CarStatus == "2") {
                that.carList[j].CarStatus = "正在前往医院："+that.carList[j].Hospital
              }   
            })(i);
            (function(k){
          that.carList[k].position = new AMap.LngLat(response.data.results[k].Longitude, response.data.results[k].Latitude)
          new AMap.Driving({policy: AMap.DrivingPolicy.LEAST_TIME}).search(that.carList[k].position,that.myPosition, function (status, result) {
            that.carList[k].searchresult = result
            that.carList[k].Time = "预计到达时间"+Math.round(that.carList[k].searchresult.routes[0].time/60)+"分钟";
          })
        })(i)
          }
        })
        console.log(this.carList)
        this.content1 = ''
        this.content = ''

       
        axios.post('/getPatientRecord',{
          patientId:this.$route.params.PATIENTID
        }).then((response) => {
          window.localStorage.setItem('PATIENTNO',this.patientId);
          this.patientrecord=response.data.results
          this.zhusu=this.patientrecord.P01;
          if(this.zhusu.length>0) {
            for(var i=0; i<this.zhusu.length;i++) {
              if(this.zhusu[i].InfoType == 3) {
                var fileUrl = this.zhusu[i].FileUrl
                var time = this.zhusu[i].OperationTime
                this.主诉图片.unshift({
                  fileUrl:global.photoUrl+fileUrl,
                  time:time
                })              
              }
            }
            for(var k=0; k<this.zhusu.length;k++) {
              if(this.zhusu[k].InfoType == 1) {
                this.主诉=this.zhusu[k].Detail;
                this.timevalue=this.zhusu[k].OperationTime;
                break;
              }
            }
          }else{
            this.主诉='';
            this.timevalue='';
          }
          if(this.patientrecord.P02.length>0) {
            for(var i=0; i<this.patientrecord.P02.length;i++) {
              if(this.patientrecord.P02[i].InfoType == 3) {
                var fileUrl = this.patientrecord.P02[i].FileUrl
                var time = this.patientrecord.P02[i].OperationTime
                this.现病史图片.unshift({
                  fileUrl:global.photoUrl+fileUrl,
                  time:time
                })
              }
            }
            console.log(this.现病史图片)
            for(var k=0; k<this.patientrecord.P02.length;k++) {
              if(this.patientrecord.P02[k].InfoType == 1) {
                this.现病史=this.patientrecord.P02[k].Detail;
                this.timevalue1=this.patientrecord.P02[k].OperationTime;
                break;
              }
            }

          }else{
            this.现病史 = '';
            this.timevalue1 = '';
          }
          this.dataTZ=this.patientrecord.P03
          console.log(this.dataTZ)

          for(var i=0; i<this.patientrecord.P04.length;i++) {
            if(this.patientrecord.P04[i].OperationCode == "P041") {
              this.过敏史=this.patientrecord.P04[i].Detail
              break;
            }
          }
          for(var k=0; k<this.patientrecord.P04.length;k++) {
            if(this.patientrecord.P04[k].OperationCode == "P042") {
              this.疾病史=this.patientrecord.P04[k].Detail
              break;
            }
          }
          for(var j=0; j<this.patientrecord.P04.length;j++) {
            if(this.patientrecord.P04[j].OperationCode == "P043") {
              this.目前用药=this.patientrecord.P04[j].Detail
              break;
            }
          }
          for(var j=0; j<this.patientrecord.P04.length;j++) {
            if(this.patientrecord.P04[j].OperationCode == "P040") {
              var fileUrl =  this.patientrecord.P04[j].FileUrl
              var time = this.patientrecord.P04[j].OperationTime
              this.既往史图片.unshift({
                fileUrl:global.photoUrl+fileUrl,
                time:time
              })
            }
          }
          if(this.patientrecord.P05.length>0) {
            this.初步诊断=this.patientrecord.P05[0].Detail
            this.timevalue2=this.patientrecord.P05[0].OperationTime
          }else{
            this.初步诊断=''
            this.timevalue2=''
          }
          this.dataCZ=this.patientrecord.P11
          for(var j=0; j<this.patientrecord.P11.length;j++) {
            if(this.patientrecord.P11[j].InfoType == 3) {
              var fileUrl =  this.patientrecord.P11[j].FileUrl
              this.dataCZ[j].FileUrl = global.photoUrl+fileUrl
              
            }
          }
          if(this.patientrecord.P06.length>0) {
            this.doctortell=this.patientrecord.P06[0].Detail
          }else{
            this.doctortell= ''
          }
        })
      },
      getPatientInfo(){
        axios.post('/getPatientInfo',{
          patientId:this.$route.params.PATIENTID
        }).then((response) => {
          console.log(response)
          this.PatientId=response.data.results[0].PatientId;
          this.Name=response.data.results[0].Name;
          this.title1="患者病历："+this.Name;
          this.title2="处置方案："+this.Name;
          this.title3="病人去向："+this.Name;
          this.Phone=response.data.results[0].Phone
          this.Email=response.data.results[0].Email;
          this.Gender=response.data.results[0].Gender;
          this.Unit=response.data.results[0].Unit;
          this.Position=response.data.results[0].Position;
          this.Age=response.data.results[0].Age;
          this.Nation=response.data.results[0].Nation;
          this.bloodType=response.data.results[0].BloodType;
          this.Status=response.data.results[0].Status;
          this.StatusName=response.data.results[0].StatusName;
          this.level=response.data.results[0].Classification;
          this.Classification = response.data.results[0].Classification;
          // this.hospital=response.data.results[0].OrganizationName;
          // this.carId=response.data.results[0].CarId;
          this.CarNo=response.data.results[0].CarNo;
          this.HosNo=response.data.results[0].HosNo;
          // if(this.flag1 == "1") {
          //   this.StatusName = "待后送"
          //   this.isShow2 = true
          // }
          this.state=this.StatusName;
          console.log(this.StatusName)
          if(this.StatusName == "处置中") {
            this.isShow1 = false
            this.isShow2 = false
          }else if(this.StatusName == "处置完成") {
            this.isShow = true
            this.isShow1 = false
            this.isShow2 = false
            this.isShow3 = false
          }else if(this.StatusName == "待后送") {
            this.isShow1 = true
            this.isShow2 = true
            this.isShow3 = false
          }else if(this.StatusName == "已后送") {
            this.isShow1 = true
            this.isShow2 = false
            this.isShow3 = false
          }
          if(this.CarNo != "") {
            axios.post('/getCarInfo',{
              carNo:this.CarNo
            }).then((response) => {
              if(this.CarNo == "000") {
                this.hide = false
              }
              this.carname = response.data.results[0].CarName
              this.carId = response.data.results[0].CarId
              console.log(this.carId)
              var state2= '';
              this.state2=response.data.results[0].CarStatus
              if(this.state2 == "0") {
                this.carstate = "空闲"
              }else if(this.state2 == "1") {
                this.carstate = "正在去会场"
              }else if(this.state2 == "2") {
                this.carstate = "正在去医院"
              }
            })
          }
          if(this.HosNo != "") {
            axios.post('/getHosInfo',{
              hosNo:this.HosNo
            }).then((response) => {
              this.OrganizationName = response.data.results[0].OrganizationName
              this.LocationDescription = response.data.results[0].LocationDescription
              this.ICUNum = response.data.results[0].ICUNum
            })
          }
          // if(this.StatusName != "处置中") {
          //   this.isShow1 = true
          // }
          // window.localStorage.setItem('STATE',this.state);

        })
      },
      getDeviceList() {
        axios('http://test.995120.cn:8088/his/outpatient/queryDeviceList',{
          method: 'post', 
          data:{  
         "hospital_bid":"810000"
       },
       headers:{
        "pkgId":"0001",
        "transCode":"500008",
        "senderOrgCode":"810000",
        "senderPltCode":"88888899",
        "senderSysCode":"81",
        "createDate":"20190713",
        "createTime":"11:17:00",
        "version":"1.0",
        "token":"0001",
        "recverOrgCode":"999999",
        "recverPltCode":"99999999",
        "recverSysCode":"99",
        "Content-Type":"application/json"
       }
        }).then((response) => {
          this.useableDeviceList = response.data.recordList
        })
      },
      getTestList() {
        axios('http://test.995120.cn:8088/his/outpatient/getTestList',{
          method: 'post', 
          data:{
         "hospital_bid":"810000"
       },
       headers:{
        "pkgId":"0001",
        "transCode":"500008",
        "senderOrgCode":"810000",
        "senderPltCode":"88888899",
        "senderSysCode":"81",
        "createDate":"20190713",
        "createTime":"11:17:00",
        "version":"1.0",
        "token":"0001",
        "recverOrgCode":"999999",
        "recverPltCode":"99999999",
        "recverSysCode":"99",
        "Content-Type":"application/json"
       }
        }).then((response) => {
          this.testList = []
          for(var i=0;i<5;i++){
            this.testList.push(response.data.recordList[i]) 
          }
        })
      },
      onPatientlistChange(picker, values) {
        this.level = values[0];
        if(this.level == this.Classification || values[0]=="选择分级"){this.settingclass=false}
          else this.settingclass=true
      },
      returnA() {
        this.$router.push({name: '病人列表',params:{SELECTED:"病人"}});
      },
      changestate() {
        this.state = "处置完成";
        this.isShow = true;
        this.isShow1 = false;
        this.isShow100 = false;
        this.isovering = true;
        // this.isShow3 = false
      },
      gotohospital() {
        this.state = "待后送";
        this.isShow = false;
        this.isShow1 = true;
        this.isShow100 = true;
        this.hide = true
        this.CarNo = ""
        this.flag = "1"
      },
      self() {
        this.state = "待后送";
        this.isShow = false;
        this.isShow1 = true;
        this.isShow100 = true
        this.CarNo = "自行前往"
        this.flag = "2"
        this.hide = false
      },
      oxygen() {
        this.methods = "吸氧"
        this.content1 = ""
        this.isShow4 = false
        axios.post('/newPatientRecord',{
          patientId:this.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail: "",
          operationCode: "P111",
          detail1: "",
          address: "1",
          infoType: "1",
          fileUrl: '' 
        }).then((response) => {
          if(response.data.results == "新建成功") {
            // alert("上传成功");
            Toast('上传成功');
            this.getpatientrecord()
          }
        })
      },
      ECG() {
        MessageBox.confirm('确定申请心电检查?').then(action => {
        Indicator.open('下单中，请稍候...');
        this.methods = "心电图"
        this.content1 = ""
        this.isShow4 = false
        var sex
        if(this.Gender == '男')sex='M'
          else if(this.Gender== '女')sex='F'
            else sex='U'
        axios.post('/testLIBANG',{
          PatientId:this.$route.params.PATIENTID,
          name:this.Name,
          age:this.Age,
          sex:sex,
          address:1
        }).then((response) => {
          if(response.data.results == "上传成功") {
            Indicator.close();
            Toast('成功申请心电检查');
            this.getpatientrecord()
          }else{
            Indicator.close();
            Toast('下检查单失败');
          }
        })
      })
      },
      bandage() {
        this.methods = "包扎止血"
        this.content1 = ""
        this.isShow4 = false
        axios.post('/newPatientRecord',{
          patientId:this.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail: "",
          operationCode: "P113",
          detail1: "",
          address: "1",
          infoType: "1",
          fileUrl: '' 
        }).then((response) => {
          if(response.data.results == "新建成功") {
            // alert("上传成功");
            Toast('上传成功');
            this.getpatientrecord()
          }
        })
      },
      stone() {
        this.methods = "支具固定"
        this.content1 = ""
        this.isShow4 = false
        axios.post('/newPatientRecord',{
          patientId:this.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail: "",
          operationCode: "P114",
          detail1: "",
          address: "1",
          infoType: "1",
          fileUrl: '' 
        }).then((response) => {
          if(response.data.results == "新建成功") {
            // alert("上传成功");
            Toast('上传成功');
            this.getpatientrecord()
          }
        })
      },
      drug() {
        this.methods = "口服药物"
        this.content1 = "药物名称：    用法：    用量：   "
        this.isShow4 = true
      },
      dd() {
        this.methods = "静脉给药"
        this.content1 = "药物名称：    用法：    用量：   "
        this.isShow4 = true
      },
      elseway () {
        this.methods = "其他处理"
        this.content1 = ""
        this.isShow4 = true
      },
      heartrate() {
        this.体征 = "心率"
        this.content = ""
        this.istizheng = true
      },
      bloodpressure() {
        this.体征 = "血压"
        this.content = "收缩压   舒张压   "
        this.istizheng = true
      },
      temprature() {
        this.体征 = "体温"
        this.content = ""
        this.istizheng = true
      },
      breath() {
        this.体征 = "呼吸"
        this.content = ""
        this.istizheng = true
      },
      bloodoxygen() {
        this.体征 = "血氧"
        this.content = ""
        this.istizheng = true
      },
      symptom() {
        this.体征 = "其他"
        this.content = ""
        this.istizheng = true
      },
      alert() {
        axios.post('/reportPatient',{
          patientId:this.$route.params.PATIENTID
        }).then((response) => {
          if(response.data.results == "上传成功") {
            // alert("上报成功");
            Toast('成功上报指挥中心');
          }else{
            // alert("上报失败");
            Toast('上报失败');
          }
        })
      },
      alertHelp() {
        axios.post('/oneClickAlert',{
          patientId:this.$route.params.PATIENTID
        }).then((response) => {
          if(response.data.results == "上传成功") {
            // alert("上报成功");
            Toast('成功上报指挥中心,请打开AR眼镜视频通话功能');
          }else{
            // alert("上报失败");
            Toast('上报失败');
          }
        })
        setTimeout(()=>{
          this.GLOBAL.changeVideoAlert(false)
          var scheme = 'com.tencent.trtc';
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"
            });
              sApp.start(function() {
              }, function(error) {
                alert(error);
              });
            },
            function() {
              alert(scheme + ' is not available');
            }
            );   
        },1000)

      },
      ensure() {
        if(this.flag == "1") {
          if(this.CarNo=="" || this.HosNo==""){
            Toast("车辆或医院不能为空！")
          }else{
            axios.post('/prepareSend',{
              patientId:this.patientId,
              carNo:this.CarNo,
              hosNo:this.HosNo
            }).then((response) => {
              if(response.data.results == "上传成功") {
                Toast('病人待后送');
                this.isShow3 = false
                this.isShow2 = true
                this.isShow100 = false
                this.$router.push({name:'confirm',params:{HOSPITAL:this.hospital,CARID:this.carId}})
              }else{
                Toast('上传失败');
              }
            })
          }          
        }
        if(this.flag == "2") {
          if(this.HosNo == "")Toast("医院不能为空！")
            else{
              axios.post('/prepareSend',{
                patientId:this.patientId,
                carNo:'000',
                hosNo:this.HosNo
              }).then((response) => {
                if(response.data.results == "上传成功") {
                  Toast('病人自行前往，请手动点击送出');
                  this.isShow3 = false
                  this.isShow2 = true
                  this.isShow100 = false
                  this.$router.push({name:'confirm',params:{HOSPITAL:this.hospital,CARID:"自行前往",FLAG:this.flag}})
                }else{
                  Toast('上传失败');
                }
              })
            }
          }
      },
      save41() {
        axios.post('/newPatientRecord',{
          patientId:this.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:this.过敏史,
          operationCode: "P041",
          detail1: "过敏史",
          address: "1",
          infoType: "1",
          fileUrl: '' 
        }).then((response) => {
          if(response.data.results == "新建成功") {
            this.editing41 = false;
            this.tempguomin = '';
            Toast('上传成功');
            this.getpatientrecord()
          }
        })
      },
      save42() {
        axios.post('/newPatientRecord',{
          patientId:this.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:this.疾病史,
          operationCode: "P042",
          detail1: "疾病史",
          address: "1",
          infoType: "1",
          fileUrl: '' 
        }).then((response) => {
          if(response.data.results == "新建成功") {
            this.editing42 = false;
            this.tempjibing = '';
            Toast('上传成功');
            this.getpatientrecord()
          }
        })
      },
      save43() {
        axios.post('/newPatientRecord',{
          patientId:this.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:this.目前用药,
          operationCode: "P043",
          detail1: "目前用药",
          address: "1",
          infoType: "1",
          fileUrl: '' 
        }).then((response) => {
          if(response.data.results == "新建成功") {
            this.editing43 = false;
            this.tempyongyao = '';
            Toast('上传成功');
            this.getpatientrecord()
          }
        })
      },
      save50() {
        axios.post('/newPatientRecord',{
          patientId:this.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:this.初步诊断,
          operationCode: "P050",
          detail1: "初步诊断",
          address: "1",
          infoType: "1",
          fileUrl: '' 
        }).then((response) => {
          if(response.data.results == "新建成功") {
            this.editing5 = false;
            this.tempzhenduan = '';
            Toast('上传成功');
            this.getpatientrecord()
          }
        })
      },
      save10() {
        axios.post('/newPatientRecord',{
          patientId:this.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:this.主诉,
          operationCode: "P010",
          detail1: "主诉",
          address: "1",
          infoType: "1",
          fileUrl: '' 
        }).then((response) => {
          if(response.data.results == "新建成功") {
            // alert("上传成功");
            Toast('上传成功');
            this.editing1 = false;
            this.tempzhusu = ''
            this.getpatientrecord()
          }
        })
      },
      save20() {
        axios.post('/newPatientRecord',{
          patientId:this.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:this.现病史,
          operationCode: "P020",
          detail1: "现病史",
          address: "1",
          infoType: "1",
          fileUrl: '' 
        }).then((response) => {
          if(response.data.results == "新建成功") {
            this.editing2 = false;
            this.tempxianbingshi = '';
            Toast('上传成功');
            this.getpatientrecord()
          }
        })
      },
      save60() {
        axios.post('/newPatientRecord',{
          patientId:this.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:this.doctortell,
          operationCode: "P060",
          detail1: "医嘱",
          address: "1",
          infoType: "1",
          fileUrl: '' 
        }).then((response) => {
          if(response.data.results == "新建成功") {
            axios.post('/assemblyOver',{
              patientId:this.$route.params.PATIENTID
            }).then((response) => {
              if(response.data.results == "上传成功") {
                Toast('处置完成');
                this.isovering = false
                this.isShow3 = false
                this.getpatientrecord()
              }
            })

          }
        })
        
      },
      setclass() {
        var Class
        if(this.level === "I级") {
          this.Class = '1'
        }else if(this.level === "II级") {
          this.Class = '2'
        }else if(this.level === "III级") {
          this.Class = '3'
        }else if(this.level === "IV级") {
          this.Class = '4'
        }else if(this.level === "V级") {
          this.Class = '5'
        }console.log(this.Class)
        axios.post('/setClass',{
          patientId:this.$route.params.PATIENTID,
          class:this.Class
        }).then((response) => {
          if(response.data.results == "上传成功") {
            if(this.Class == '1' || this.Class == '2')Toast('成功上报指挥中心')
              else Toast('修改成功');
            this.getpatientrecord()
            this.getPatientInfo()
          }
        })
      },
      add() {
        this.operationCode = ''
        if(this.体征 == "心率") {
          this.operationCode = "P031"
        }else if(this.体征 == "血压") {
          this.operationCode = "P032"
        }else if(this.体征 == "体温") {
          this.operationCode = "P033"
        }else if(this.体征 == "呼吸") {
          this.operationCode = "P034"
        }else if(this.体征 == "血氧") {
          this.operationCode = "P035"
        }else if(this.体征 == "其他") {
          this.operationCode = "P036"
        }
        if(this.operationCode != ''){
          axios.post('/newPatientRecord',{
            patientId:this.$route.params.PATIENTID,
            inputUserId:window.localStorage.getItem('USERID'),
            operator:window.localStorage.getItem('USERID'),
            detail:this.content,
            operationCode: this.operationCode,
            detail1: this.体征,
            address: "1",
            infoType: "1",
            fileUrl: '' 
          }).then((response) => {
            if(response.data.results == "新建成功") {
              // alert("上传成功");
              Toast('上传成功');
              this.getpatientrecord()
              this.istizheng = false
            }
          })
        }else{
          // alert("请选择体征");
          Toast('请选择体征');
        }
      },
      add1() {
        this.operationCode1 = ''
        if(this.methods == "吸氧") {
          this.operationCode1 = "P111"
        }else if(this.methods == "心电图") {
          this.operationCode1 = "P112"
        }else if(this.methods == "包扎止血") {
          this.operationCode1 = "P113"
        }else if(this.methods == "支具固定") {
          this.operationCode1 = "P114"
        }else if(this.methods == "口服药物") {
          this.operationCode1 = "P115"
        }else if(this.methods == "静脉给药") {
          this.operationCode1 = "P116"
        }else if(this.methods == "其他处理") {
          this.operationCode1 = "P117"
        }
        if(this.operationCode1!=''){
          axios.post('/newPatientRecord',{
            patientId:this.$route.params.PATIENTID,
            inputUserId:window.localStorage.getItem('USERID'),
            operator:window.localStorage.getItem('USERID'),
            detail:this.content1,
            operationCode: this.operationCode1,
            detail1: this.methods,
            address: "1",
            infoType: "1",
            fileUrl: '' 
          }).then((response) => {
            if(response.data.results == "新建成功") {
              // alert("上传成功");
              Toast('上传成功');
              this.getpatientrecord()
              this.isShow4 = false
            }
          })
        }else{
          // alert("请选择处置"); 
          Toast('请选择处置');    
        }
      },
Select() {
  if(this.StatusName == "处置中") {
    if(this.selectform == "2") {
      axios.post('/getCarInfo',{
        carNo:this.CARNO
      }).then((response) => {
        this.CarNo = response.data.results[0].CarNo
        this.carId = response.data.results[0].CarId
        this.carname = response.data.results[0].CarName
        if(response.data.results[0].Assembly !='') {
          this.destination=response.data.results[0].Assembly
        }else{
          this.destination=response.data.results[0].Hospital
        }
        var state2= '';
        this.state2=response.data.results[0].CarStatus
        if(this.state2 == "0") {
          this.carstate = "空闲"
        }else if(this.state2 == "1") {
          this.carstate = "正在去会场"
        }else if(this.state2 == "2") {
          this.carstate = "正在去医院"
        }
      })
}else if(this.selectform == "3") {
  axios.post('/getHosInfo',{
    hosNo:this.HOSNO
  }).then((response) => {
    this.HosNo = response.data.results[0].OrganizationCode
    this.OrganizationName = response.data.results[0].OrganizationName
    this.LocationDescription = response.data.results[0].LocationDescription
    this.ICUNum = response.data.results[0].ICUNum
  })
}
}
},
// sure() {
//   if(this.CarNo != "" && this.HosNo != "") {
//     Toast('确定选择的车辆和医院')
//     axios.post('/getCarInfo',{
//       carNo:this.CarNo
//     }).then((response) => {
//       this.carId = response.data.results[0].CarId
//       this.carname = response.data.results[0].CarName
//       if(response.data.results[0].Assembly !='') {
//         this.destination=response.data.results[0].Assembly
//       }else{
//         this.destination=response.data.results[0].Hospital
//       }
//       var state= '';
//       this.state=response.data.results[0].CarStatus
//       if(this.state == "0") {
//         this.carstate = "空闲"
//       }else if(this.state == "1") {
//         this.carstate = "正在去会场"
//       }else if(this.state == "2") {
//         this.carstate = "正在去医院"
//       }
//     })
//     axios.post('/getHosInfo',{
//       hosNo:this.HosNo
//     }).then((response) => {
//       this.OrganizationName = response.data.results[0].OrganizationName
//       this.LocationDescription = response.data.results[0].LocationDescription
//       this.ICUNum = response.data.results[0].ICUNum
//     })
//   }else{
//     Toast('请选择车辆和医院')
//   }
// },
confirm() {
  this.$router.push({name:'confirm',params:{HOSPITAL:this.OrganizationName,CARID:this.carId}})
},
gethospital:function(index){
  this.HosNo=this.hosList[index].OrganizationCode
  this.OrganizationName = this.hosList[index].OrganizationName
  this.LocationDescription = this.hosList[index].LocationDescription

},
getcar:function(index){
  this.CarNo = this.carList[index].CarNo
  this.carname = this.carList[index].CarName
  this.carId = this.carList[index].CarId
},

startMonitor:function(index){
  var that = this
  that.popupVisible3 = false
  that.nowTime = new Date().getTime()
  MessageBox.confirm('确定使用这台设备监护?').then(action => {
    axios('http://test.995120.cn:8088/his/outpatient/addOutpatient',{
      method: 'post', 
      data:{  
       "busi_no":that.nowTime,
       "test_type":"ECG00010000001",
       "hospital_bid":"810000",
       "office_bid":"G01",
       "doctor_account":"zyh",
       "device_bid":"",
       "device_serial_id":"",
       "device_type":"",
       "outerUserNo":that.patientId,
       "realName":that.Name,
       "certType":"01",
       "certNo":'9999999999999'+that.patientId
     },
     headers:{
      "pkgId":"0001",
      "transCode":"500008",
      "senderOrgCode":"810000",
      "senderPltCode":"88888899",
      "senderSysCode":"81",
      "createDate":"20190703",
      "createTime":"11:17:00",
      "version":"1.0",
      "token":"0001",
      "recverOrgCode":"999999",
      "recverPltCode":"99999999",
      "recverSysCode":"99",
      "Content-Type":"application/json"
    }
  }).then((response) => {
    if(response.data.respCode == "000000"){
      axios('http://test.995120.cn:8088/his/outpatient/startMonitoring',{
        method: 'post', 
        data:{
         "busi_no":that.nowTime,
         "hospital_bid":"810000",
         "office_bid":"G01",
         "doctor_account":"zyh",
         "device_bid":that.useableDeviceList[index].device_bid,
         "device_serial_id":that.useableDeviceList[index].device_serial_id,
         "device_type":"",
         "memo":"",
         "outpatient_test_bid":""
       },
     headers:{
      "pkgId":"0001",
      "transCode":"500008",
      "senderOrgCode":"810000",
      "senderPltCode":"88888899",
      "senderSysCode":"81",
      "createDate":"20190703",
      "createTime":"11:17:00",
      "version":"1.0",
      "token":"0001",
      "recverOrgCode":"999999",
      "recverPltCode":"99999999",
      "recverSysCode":"99",
      "Content-Type":"application/json"
    }
  }).then((response) => {
    if(response.data.respCode == "000000"){
      MessageBox.alert("开始监护成功","提示")
      that.popupVisible3 = true
      that.getDeviceList()
      that.getTestList()
    }else{
      MessageBox.alert("开始监护失败","提示")
      that.popupVisible3 = true
    }
  })

    }else{
     MessageBox.alert("下检查单失败","提示")
     that.popupVisible3 = true
    }
  })
  
});
  // 你从何而来的自信
},
stopMonitor:function(index){
  var that = this
  that.popupVisible3 = false
  MessageBox.confirm('确定停止监护?').then(action => {
    axios('http://test.995120.cn:8088/his/outpatient/stopMonitoring',{
      method: 'post', 
      data:{  
       "busi_no":that.testList[index].busi_no,
       "hospital_bid":"810000",
       "office_bid":"G01",
       "doctor_account":"zyh",
       "memo":""
     },
     headers:{
      "pkgId":"0001",
      "transCode":"500008",
      "senderOrgCode":"810000",
      "senderPltCode":"88888899",
      "senderSysCode":"81",
      "createDate":"20190703",
      "createTime":"11:17:00",
      "version":"1.0",
      "token":"0001",
      "recverOrgCode":"999999",
      "recverPltCode":"99999999",
      "recverSysCode":"99",
      "Content-Type":"application/json"
    }
  }).then((response) => {
    if(response.data.respCode == "000000"){
      MessageBox.alert("停止监护成功","提示")
      that.popupVisible3 = true
      that.getTestList()
      that.getDeviceList()
    }else{
      MessageBox.alert("停止监护失败","提示")
      that.popupVisible3 = true
    }
  })
})
},

choosephoto1() {
  var that = this;
  navigator.camera.getPicture(onSuccess, onFail, { 
    quality: 100,
    destinationType: 1,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      // targetWidth: 300,
      // targetHeight: 300
    });

  function onSuccess(imageData) {
    that.photoing = true;
    document.getElementById('image1').src =imageData;
  }

  function onFail(message) {
    Toast('图片选择失败' + message);
  }

},
choosephoto2() {
  var that = this;
  navigator.camera.getPicture(onSuccess, onFail, { 
    quality: 100,
    destinationType: 1,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      // targetWidth: 300,
      // targetHeight: 300
    });

  function onSuccess(imageData) {
    that.photoing = true;
    document.getElementById('image2').src =imageData;
  }

  function onFail(message) {
    Toast('图片选择失败' + message);
  }

},
choosephoto4() {
  var that = this;
  navigator.camera.getPicture(onSuccess, onFail, { 
    quality: 100,
    destinationType: 1,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      // targetWidth: 300,
      // targetHeight: 300
    });

  function onSuccess(imageData) {
    that.photoing = true;
    document.getElementById('image4').src =imageData;
  }

  function onFail(message) {
    Toast('图片选择失败' + message);
  }

},
takephoto1() {
      var that = this;
      navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 100,
        destinationType: 1,
      // targetWidth: 300,
      // targetHeight: 300
    });

      function onSuccess(imageData) {
        that.photoing = true;
        document.getElementById('image1').src =imageData;
      }

      function onFail(message) {
        Toast('图片选择失败' + message);
      }

    },
    takephoto2() {
      var that = this;
      navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 100,
        destinationType: 1,
      // targetWidth: 300,
      // targetHeight: 300
    });

      function onSuccess(imageData) {
        that.photoing = true;
        document.getElementById('image2').src =imageData;
      }

      function onFail(message) {
        Toast('图片选择失败' + message);
      }

    },
    takephoto4() {
      var that = this;
      navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 100,
        destinationType: 1,
      // targetWidth: 300,
      // targetHeight: 300
    });

      function onSuccess(imageData) {
        that.photoing = true;
        document.getElementById('image4').src =imageData;
      }

      function onFail(message) {
        Toast('图片选择失败' + message);
      }

    },
     uploadPicture1() {
      Indicator.open('上传中...');
      var that = this;
      //获取元素中的图片uri
      var imgURI = document.getElementById('image1').src
      //文件命名
      var photoname =that.$route.params.PATIENTID + '_' + new Date().getTime() + '_P010.jpg'
      //上传接口
      var uri = encodeURI(global.uploadUrl)
      var options = {
        fileKey: 'file',
        fileName: photoname,
        chunkedMode: true,
        mimeType: 'image/jpeg'
      }
      function success(r) {
        axios.post('/newPatientRecord',{
          patientId:that.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:"主诉图片",
          operationCode: "P010",
          detail1: "",
          address: "1",
          infoType: "3",
          fileUrl: photoname
        }).then((response) => {
          if(response.data.results == "新建成功") {
            Indicator.close();
            Toast("上传成功");
            that.getpatientrecord()
            that.photoing = false

          }else{
            Indicator.close();
            Toast("信息上传失败");
          }
        })
      }
          function fail(error) {
            Indicator.close();
            Toast("图片上传失败!");
          }
          var ft = new FileTransfer();
          ft.upload(imgURI, uri, success, fail, options)

        },
         uploadPicture2() {
          Indicator.open('上传中...');
      var that = this;
      //获取元素中的图片uri
      var imgURI = document.getElementById('image2').src
      //文件命名
      var photoname =that.$route.params.PATIENTID + '_' + new Date().getTime() + '_P020.jpg'
      //上传接口
      var uri = encodeURI(global.uploadUrl)
      var options = {
        fileKey: 'file',
        fileName: photoname,
        chunkedMode: true,
        mimeType: 'image/jpeg'
      }
      function success(r) {
        axios.post('/newPatientRecord',{
          patientId:that.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:"现病史图片",
          operationCode: "P020",
          detail1: "",
          address: "1",
          infoType: "3",
          fileUrl: photoname
        }).then((response) => {
          if(response.data.results == "新建成功") {
            Indicator.close();
            Toast("上传成功");
            that.getpatientrecord()
            that.photoing = false

          }else{
            Indicator.close();
            Toast("信息上传失败");
          }
        })
      }
          function fail(error) {
            Indicator.close();
            Toast("图片上传失败!");
          }
          var ft = new FileTransfer();
          ft.upload(imgURI, uri, success, fail, options)

        },
    uploadPicture4() {
      Indicator.open('上传中...');
      var that = this;
      //获取元素中的图片uri
      var imgURI = document.getElementById('image4').src
      //文件命名
      var photoname =that.$route.params.PATIENTID + '_' + new Date().getTime() + '_P040.jpg'
      //上传接口
      var uri = encodeURI(global.uploadUrl)
      var options = {
        fileKey: 'file',
        fileName: photoname,
        chunkedMode: true,
        mimeType: 'image/jpeg'
      }
      function success(r) {
        axios.post('/newPatientRecord',{
          patientId:that.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:"既往史图片",
          operationCode: "P040",
          detail1: "",
          address: "1",
          infoType: "3",
          fileUrl: photoname
        }).then((response) => {
          if(response.data.results == "新建成功") {
            Indicator.close();
            Toast("上传成功");
            that.getpatientrecord()
            that.photoing = false

          }else{
            Indicator.close();
            Toast("信息上传失败");
          }
        })
      }
          function fail(error) {
            Indicator.close();
            Toast("图片上传失败!");
          }
          var ft = new FileTransfer();
          ft.upload(imgURI, uri, success, fail, options)

        },
initMap () {
  var that = this
  var carList1=[{},];
  var hosList1=[{},];
  var assList1=[{},];
  var positionHos = [];
  var positionAss = [];
  var positionCar = [];
  var markerCar=[];
  var markerHos = [];
  var markerAss = [];
  var lnglats;
  var marker;

  let mapObj = new AMap.Map('map-container', {
    center: [120.154539,30.265048],
    zoom: 13,
    mapStyle: 'amap://styles/c276159e0bece965039d24472029a3e0',
  })
  mapObj.plugin(['AMap.ToolBar','AMap.OverView', 'AMap.MapType'], function () {
    mapObj.addControl(new AMap.ToolBar())
    mapObj.addControl(new AMap.OverView({isOpen:false}))
    mapObj.addControl(new AMap.MapType({showTraffic: true, showRoad: false}))
  })
  var options = {
    enableHighAccuracy: true,
    maximumAge: 0
  }
  var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  // var gps = [119,30];
  //   AMap.convertFrom(gps, 'gps', function (status, result) {           
  //     lnglats = result.locations[0];
  //     mapObj.setCenter(lnglats)
  //     alert(lnglats)
  //   });
  function onSuccess(position) {
    // alert('Latitude: '          + position.coords.latitude          + '\n' +
    // 'Longitude: '         + position.coords.longitude         + '\n' +
    // 'Altitude: '          + position.coords.altitude          + '\n' +
    // 'Accuracy: '          + position.coords.accuracy          + '\n' +
    // 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    // 'Heading: '           + position.coords.heading           + '\n' +
    // 'Speed: '             + position.coords.speed             + '\n' +
    // 'Timestamp: '         + position.timestamp                + '\n');
    var gps = [position.coords.longitude, position.coords.latitude];
    AMap.convertFrom(gps, 'gps', function (status, result) {         
      lnglats = result.locations[0];
      mapObj.setCenter(lnglats)
      marker = new AMap.Marker({
        position: lnglats,
        map: mapObj
      })
      AMap.event.addListener(marker, 'click', (e) => {
        AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
          var infoWindow = new SimpleInfoWindow({
            infoTitle: '<strong>我在这里</strong>',
            infoBody: '',
            offset: new AMap.Pixel(0, -20),
            autoMove: true
          })
          infoWindow.open(mapObj, e.target.getPosition())
        })
      }) 
      var options1 = {
      timeout: 3000,
      enableHighAccuracy: true,
      maximumAge: 60000
    }
    that.watchID1 = navigator.geolocation.watchPosition(onSuccess1, onError1, options1);
    function onSuccess1(position) {
      // alert('Latitude: '          + position.coords.latitude          + '\n' +
      //   'Longitude: '         + position.coords.longitude         + '\n' +
      //   'Altitude: '          + position.coords.altitude          + '\n' +
      //   'Accuracy: '          + position.coords.accuracy          + '\n' +
      //   'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
      //   'Heading: '           + position.coords.heading           + '\n' +
      //   'Speed: '             + position.coords.speed             + '\n' +
      //   'Timestamp: '         + position.timestamp                + '\n');
      var gps1 = [position.coords.longitude, position.coords.latitude];
      AMap.convertFrom(gps1, 'gps', function (status, result) {         
        var lnglats2 = result.locations[0];
        marker.setPosition(lnglats2)
      });
    };
    function onError1(error) {
      // alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }    
    });

    
  };
  function onError(error) {
    // alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
  }

  AMapUI.loadUI(['overlay/SvgMarker'], function(SvgMarker) {


    if (!SvgMarker.supportSvg) {
      alert('当前环境不支持SVG');
    }

    axios.get('/getAssemblyList',{}).then((response) => {
      assList1 = response.data.results;
      console.log(assList1)
      for(var i=0;i<assList1.length;i++){
        positionAss[i] = new AMap.LngLat(assList1[i].Longitude, assList1[i].Latitude)
        console.log(positionAss[i])
        markerAss[i] = new SvgMarker(
          new SvgMarker.Shape.IconFont({
            symbolJs: null,
            icon: 'icon-changguan',
            size: 50,
            offset: [-25, -50],
            fillColor: 'grey'
          }), {
            map: mapObj,
            position: positionAss[i],
            showPositionPoint: {
              color: 'red'
            }
          }
          );
        markerAss[i].assinfo = assList1[i];
        markerAss[i].on('click',function(){
          var thisMarkerAss = this;
          AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
            var infoWindow = new SimpleInfoWindow({
              infoTitle: '<strong>' + thisMarkerAss.assinfo.LocationName+ '</strong>',
              infoBody: "<div style=\"padding:0px 0px 0px 4px;\">"+thisMarkerAss.assinfo.Description+'</div>',
              offset: new AMap.Pixel(0, -20),
              autoMove: true                 
            })
            infoWindow.open(mapObj, thisMarkerAss.C.position)
          })
        })
      }
    }).catch(function(error){
      console.log("error",error);
    })

    axios.get('/getHosList',{}).then((response) => {
      hosList1 = response.data.results;
      console.log(hosList1)
      for(var i=0;i<hosList1.length;i++){
        positionHos[i] = new AMap.LngLat(hosList1[i].Longitude, hosList1[i].Latitude)
        console.log(positionHos[i])
        markerHos[i] = new SvgMarker(
          new SvgMarker.Shape.IconFont({
            symbolJs: null,
            icon: 'icon-hospital',
            size: 50,
            offset: [-25, -50],
            fillColor: 'red'
          }), {
            map: mapObj,
            position: positionHos[i],
            showPositionPoint: {
              color: 'red'
            }
          });
        markerHos[i].hosinfo = hosList1[i];
        markerHos[i].searchresult = that.hosList[i].searchresult
        markerHos[i].time = that.hosList[i].Time
        markerHos[i].on('click',function(){
          var thisMarkerHos = this;
          console.log(this);
          // that.selectform = "3" 
          // that.HOSNO = thisMarkerHos.hosinfo.OrganizationCode
          // that.Select()
          console.log(that.hosList);
          that.Drivingrender.autoRender({
            data: thisMarkerHos.searchresult,
            map: mapObj
          });
          AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
                var infoWindow = new SimpleInfoWindow({
                  infoTitle: '<strong>' + thisMarkerHos.hosinfo.OrganizationName+ '</strong>',
                  infoBody: "<div style=\"padding:0px 0px 0px 4px;\">"+thisMarkerHos.hosinfo.LocationDescription+'<br>'+thisMarkerHos.time+'</div>',
                  offset: new AMap.Pixel(0, -20),
                  autoMove: true
                });
                infoWindow.open(mapObj, thisMarkerHos.C.position);
              })
          
        })
      }
    }).catch(function(error){
      console.log("error",error);
    })

    axios.get('/getCarList',{}).then((response) => {
      carList1 = response.data.results;
      console.log(carList1)
      for(var i=0;i<carList1.length;i++){
        if(carList1[i].Longitude!=null && carList1[i].Latitude!=null){
          if(carList1[i].CarStatus == 0){
            carList1[i].CarStatus='空闲'
          }
          else{
            carList1[i].CarStatus='忙碌'
          }
          positionCar[i] = new AMap.LngLat(carList1[i].Longitude, carList1[i].Latitude)
          console.log(positionCar[i])
          markerCar[i] = new SvgMarker(
            new SvgMarker.Shape.IconFont({
              symbolJs: null,
              icon: 'icon-emergencycar',
              size: 50,
              offset: [-25, -50],
              fillColor: 'blue'
            }), {
              map: mapObj,
              position: positionCar[i],
              showPositionPoint: {
                color: 'red'
              }
            });
          markerCar[i].carinfo = carList1[i];
          markerCar[i].on('click',function(){
            console.log(this)
            var thisMarkerCar = this;
            // that.selectform = "2" 
            // that.CARNO = thisMarkerCar.carinfo.CarNo
            // that.Select()
            AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {

              var infoWindow = new SimpleInfoWindow({
                infoTitle: '<strong>' + thisMarkerCar.carinfo.CarName+ '</strong>',
                infoBody: "<div style=\"padding:0px 0px 0px 4px;\">"+'编号：'+thisMarkerCar.carinfo.CarNo+'<br>车牌号：'+thisMarkerCar.carinfo.CarId+'<br>状态：'+thisMarkerCar.carinfo.CarStatus+'</div>',
                offset: new AMap.Pixel(0, -20),
                autoMove: true
              })
              infoWindow.open(mapObj, thisMarkerCar.C.position)
            })
          })
        }
      }
      that.intervalid1 = setInterval(() => { 
        console.log("正在获取新位置")
        axios.get('/getCarList',{}).then((response) => {
          carList1 = response.data.results;
          console.log(carList1)
          for(var i=0;i<carList1.length;i++){
            if(carList1[i].Longitude!=null && carList1[i].Latitude!=null){
              if(carList1[i].CarStatus == 0){
                carList1[i].CarStatus='空闲'
              }
              else{
                carList1[i].CarStatus='忙碌'
              }
              positionCar[i] = new AMap.LngLat(carList1[i].Longitude, carList1[i].Latitude)
              console.log(positionCar[i])
              markerCar[i].carinfo = carList1[i];
              markerCar[i].setPosition(positionCar[i])
            }
          }
        }).catch(function(error){
          console.log("error",error);
        })
      }, 100000)
    }).catch(function(error){
      console.log("error",error);
    })
  }) 
}
}
};
</script>




