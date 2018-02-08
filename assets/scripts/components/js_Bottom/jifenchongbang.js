cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _overTime:null,
        hours:cc.Label,
        minutes:cc.Label,
        seconds:cc.Label,
        endTime:cc.Label,
    },

    // use this for initialization
    onLoad: function () {
       
        this.getNowDate();
        // var myDate = new Date();
        // myDate.getYear();        //获取当前年份(2位)
        // myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        // myDate.getMonth();       //获取当前月份(0-11,0代表1月)
        // myDate.getDate();        //获取当前日(1-31)
        // myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
        // myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
        // myDate.getHours();       //获取当前小时数(0-23)
        // myDate.getMinutes();     //获取当前分钟数(0-59)
        // myDate.getSeconds();     //获取当前秒数(0-59)
        // myDate.getMilliseconds();    //获取当前毫秒数(0-999)
        // myDate.toLocaleDateString();     //获取当前日期
        // var mytime=myDate.toLocaleTimeString();     //获取当前时间
        // myDate.toLocaleString(); 
      
      
        
    },
//function
    getNowDate :function (){
        var data={
            ok:"ok",
         }
         var onCreate = function(ret){
             if(ret == ""){
                 console.log(ret.errmsg);

             }
             else{
                this.endTime=ret.end_time;
                //this._overTime-myDate.getTime(); 
                
             }
         }.bind(this);
         cc.vv.http.sendRequest("/overTime",data,onCreate);

    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // if(!this.endTime){
            var myDate = new Date();
            var eneDate =new Date(2018,0,15);
            //console.log(myDate);
            //console.log(eneDate);
            var lostTime = eneDate.getTime()-myDate.getTime();
           // console.log(lostTime)
            if(lostTime>0){
                var nowDate = new Date(lostTime);
                this.hours.string   = Math.floor((lostTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))+ Math.floor(lostTime / (1000 * 60 * 60 * 24)*24);
                this.minutes.string = Math.floor((lostTime % (1000 * 60 * 60)) / (1000 * 60));
                this.seconds.string = Math.floor((lostTime % (1000 * 60)) / 1000);
            }
            
            // console.log("this.hours:"+ this.hours.string);
            // console.log("this.minutes:"+ this.minutes.string);
            // console.log("this.seconds"+ this.seconds.string);
        }
    // },
});
