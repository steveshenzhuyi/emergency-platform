<template>
  <div align="center">
    <mt-header style="font-size:20px" title="病人去向">
      <mt-button size="small" icon="back" slot="left"
        @click="$goRoute('/choosehospital')"><small>返回</small></mt-button>
      <hr>
    </mt-header>
    <h2>当前状态：{{state}}</h2>
    <h2>后送医院：{{hospital}}</h2>
    <h2>车号：{{carNo}}
      <!-- <mt-button size="normal">
        <img src="./icon/语音通话.png" height="40" width="40" slot="icon">
        视频通话</mt-button> -->
    </h2>
    <div id="map-container" class="map-root">
      放置地图
    </div>
    <router-view></router-view>
  </div>
</template>


<script>
import { Header } from 'mint-ui';
import axios from 'axios';
/* eslint-disable no-undef */
  // import AMap from 'AMap'
  // import AMapUI from 'AMapUI'

export default {
  data() {
    return {
      state: window.localStorage.getItem('STATE'),
      hospital:this.$route.params.HOSPITAL,
      carNo:this.$route.params.CARNO,
      intervalid1:null
    };
  },
  mounted () {
      this.initMap()
    },
  beforeDestroy () {
    console.log(this.intervalid1)
   clearInterval(this.intervalid1)
   this.intervalid1 = null
 },
  methods: {

    initMap () {
      var that = this
      var carList=[{},];
      var hosList=[{},];
      var assList=[{},];
      var positionHos = [];
      var positionAss = [];
      var positionCar = [];
      var markerCar=[];
      var markerHos = [];
      var markerAss = [];

      // 创建地图
        let mapObj = new AMap.Map('map-container', {
          center: [108.77431122925678, 32.62743450916755],
          zoom: 13
           //mapStyle: 'amap://styles/darkblue',
        })
        //mapObj.setMapStyle('amap://styles/385185c5427db60ec63616866ec59f7b');
        mapObj.plugin(['AMap.ToolBar','AMap.OverView', 'AMap.MapType'], function () {
          mapObj.addControl(new AMap.ToolBar())
          mapObj.addControl(new AMap.OverView({isOpen:true}))
          mapObj.addControl(new AMap.MapType({showTraffic: true, showRoad: false}))
        })

        mapObj.plugin(['AMap.Geolocation'], function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //  是否使用高精度定位，默认:true
            timeout: 10000, //  超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //  显示定位按钮，默认：true
            buttonPosition: 'LB',  // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: false, //  定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: false,  //  定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: false  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          mapObj.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', (result) => {
            mapObj.setCenter(result.position)
            console.log(result.position)
            // var marker = new AMap.Marker({
            //   position: result.position,
            //   map: mapObj
            // })
            // AMap.event.addListener(marker, 'click', (e) => {
            //   AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
            //     var infoWindow = new SimpleInfoWindow({
            //       infoTitle: '<strong>这是标题' + new Date() + '</strong>',
            //       infoBody: '<p>这是信息</p>',
            //       offset: new AMap.Pixel(0, -20),
            //       autoMove: true
            //     })
            //     infoWindow.open(mapObj, e.target.getPosition())
            //     // 最坑的就是这一步了，他的infowindow没有点击事件，所以infoWindow.get$Container()会返回这个infowindow（jquery）对象
            //     let infoEle = infoWindow.get$Container()
            //     // 给infowindow添加点击事件，并在回调函数中处理业务或者跳转等
            //     infoEle.on('click', (e) => {
            //       alert('你点击了' + JSON.stringify(el))
            //     })
            //   })
            // })
            
           
           AMapUI.loadUI(['overlay/SvgMarker'], function(SvgMarker) {

        if (!SvgMarker.supportSvg) {
            alert('当前环境不支持SVG');
        }
        //获取三类地点
        axios.get('/getCarList',{}).then((response) => {
        carList = response.data.results;
        console.log(carList)
        for(var i=0;i<carList.length;i++){
          if(carList[i].CarStatus == 0)carList[i].CarStatus='空闲'
            else carList[i].CarStatus='忙碌'
        positionCar[i] = new AMap.LngLat(carList[i].Longitude, carList[i].Latitude)
          console.log(positionCar[i])
        markerCar[i] = new SvgMarker(
            new SvgMarker.Shape.IconFont({
                //已经加载了相关的js文件my-iconfont2
                symbolJs: null,
                icon: 'icon-jiuhuche',
                size: 50,
                offset: [-25, -50],
                fillColor: 'green'
            }), {
                map: mapObj,
                position: positionCar[i],
                showPositionPoint: {
                    color: 'red'
                }
            });
        markerCar[i].carinfo = carList[i];
        markerCar[i].on('click',function(){
          console.log(this)
          var thisMarkerCar = this;
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
      //循环获取车辆位置
      that.intervalid1 = setInterval(() => {
       
       console.log("正在获取新位置")
        axios.get('/getCarList',{}).then((response) => {
        carList = response.data.results;
        console.log(carList)
        for(var i=0;i<carList.length;i++){
          if(carList[i].CarStatus == 0)carList[i].CarStatus='空闲'
            else carList[i].CarStatus='忙碌'
        positionCar[i] = new AMap.LngLat(carList[i].Longitude, carList[i].Latitude)
          console.log(positionCar[i])
          markerCar[i].carinfo = carList[i];
          markerCar[i].setPosition(positionCar[i])

        }
          }).catch(function(error){
        console.log("error",error);
      })
      }, 10000)//一分钟刷新一次


      }).catch(function(error){
        console.log("error",error);
      })
      

      axios.get('/getHosList',{}).then((response) => {
        hosList = response.data.results;
        console.log(hosList)
        for(var i=0;i<hosList.length;i++){
        positionHos[i] = new AMap.LngLat(hosList[i].Longitude, hosList[i].Latitude)
          console.log(positionHos[i])
        markerHos[i] = new SvgMarker(
            new SvgMarker.Shape.IconFont({
                //已经加载了相关的js文件my-iconfont2
                symbolJs: null,
                icon: 'icon-yiyuan-2',
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
        markerHos[i].hosinfo = hosList[i];
        markerHos[i].on('click',function(){
          console.log(this)
          var thisMarkerHos = this;
          AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {

                var infoWindow = new SimpleInfoWindow({
                  infoTitle: '<strong>' + thisMarkerHos.hosinfo.OrganizationName+ '</strong>',
                  infoBody: "<div style=\"padding:0px 0px 0px 4px;\">"+thisMarkerHos.hosinfo.LocationDescription+'</div>',
                  offset: new AMap.Pixel(0, -20),
                  autoMove: true
                })
                infoWindow.open(mapObj, thisMarkerHos.C.position)
              })
        })

      }
      }).catch(function(error){
        console.log("error",error);
      })
      axios.get('/getAssemblyList',{}).then((response) => {
        assList = response.data.results;
        console.log(assList)
         for(var i=0;i<assList.length;i++){
        positionAss[i] = new AMap.LngLat(assList[i].Longitude, assList[i].Latitude)
          console.log(positionAss[i])
        markerAss[i] = new SvgMarker(
            new SvgMarker.Shape.IconFont({
                //已经加载了相关的js文件my-iconfont2
                symbolJs: null,
                icon: 'icon-jianzhuwu',
                size: 50,
                offset: [-25, -50],
                fillColor: 'blue'
            }), {
                map: mapObj,
                position: positionAss[i],
                showPositionPoint: {
                    color: 'red'
                }
            });
        markerAss[i].assinfo = assList[i];
        markerAss[i].on('click',function(){
          console.log(this)
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








 var marker = new AMap.Marker({
              position: result.position,
              map: mapObj
            })
        
//cons
        AMap.event.addListener(marker, 'click', (e) => {
              AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
                var infoWindow = new SimpleInfoWindow({
                  infoTitle: '<strong>我在这里</strong>',
                  infoBody: '',
                  offset: new AMap.Pixel(0, -20),
                  autoMove: true
                })
                infoWindow.open(mapObj, e.target.getPosition())
                // // 最坑的就是这一步了，他的infowindow没有点击事件，所以infoWindow.get$Container()会返回这个infowindow（jquery）对象
                // let infoEle = infoWindow.get$Container()
                // // 给infowindow添加点击事件，并在回调函数中处理业务或者跳转等
                // infoEle.on('click', (e) => {
                //   alert('你点击了' + JSON.stringify(el))
                // })
              })
            })
})




          
          })  //  返回定位信息
          AMap.event.addListener(geolocation, 'error', (result) => {
            console.log(result)
          })  //  返回定位出错信息
        })
    }
  }
};
</script>
<style>
  .map-root{
    width:100%;
    height:500px;
    padding:5px;
    border:1px solid black;
    margin:0px;
  }  
</style>

