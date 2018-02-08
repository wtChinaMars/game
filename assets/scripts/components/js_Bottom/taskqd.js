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
        datelayOut: cc.Node,
        jindutiao: cc.Node,
        yiqiandao: cc.Node,
        bqcount: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        //0未签到 1已签到 2 补签到
        var arry = [0,0,1,1,2,0,0,
                    0,0,0,0,2,0,0,
                    0,0,0,1,2,0,0,
                    0,0,0,0,0,0,0,
                    1,1,1,1,1,1,1,
                    ]
        this.showTime(arry);
    },
//onclick
    onClicked: function(event){
        if(event.target.name="btn_qd"){
            // this.getQiandao();
            this.yiqiandao.active=true;
        }
    },
    onClicked1: function(event){
        if(event.target.name="btn_bq"){
            // this.getBuQian();
            console.log("buqianbuqianbuqian")
            this.bqcount.string="补签(0)"
        }
    },
//function
    showTime:function(arry){
        var startDate = new Date(2017,3,1);
        var count = 0;
        var today = 0;
        var buqiancount = 2
        //是否可签到
        if(arry[today]==0){
            this.yiqiandao.active=false;
        }
        this.bqcount.string="补签("+buqiancount+")";
        for (var i=0;i<42;i++){
            if(startDate.getDay()==i){
                for(var j = 0; j<this.getMaxDay(startDate.getMonth(),startDate.getFullYear()) ; j++){
                    if(arry[j]==0){
                        this.datelayOut.getChildByName("day"+i).getChildByName("lbldate").getComponent(cc.Label).string=j+1;
                        this.datelayOut.getChildByName("day"+i).getChildByName("lbldate").active=true;
                        this.datelayOut.getChildByName("day"+i).getChildByName("bu").active=false;
                        this.datelayOut.getChildByName("day"+i).getChildByName("duihao").active=false;
                    }else if(arry[j]==1){
                        this.datelayOut.getChildByName("day"+i).getChildByName("lbldate").getComponent(cc.Label).string=j+1;
                        this.datelayOut.getChildByName("day"+i).getChildByName("lbldate").active=false;
                        this.datelayOut.getChildByName("day"+i).getChildByName("bu").active=false;
                        this.datelayOut.getChildByName("day"+i).getChildByName("duihao").active=true;
                        count+=1;
                    }else if(arry[j]==2){
                        this.datelayOut.getChildByName("day"+i).getChildByName("lbldate").getComponent(cc.Label).string=j+1;
                        this.datelayOut.getChildByName("day"+i).getChildByName("bu").active=true;
                        this.datelayOut.getChildByName("day"+i).getChildByName("lbldate").active=false;
                        this.datelayOut.getChildByName("day"+i).getChildByName("duihao").active=false;
                        count+=1;
                    }
                    if(j!=this.getMaxDay(startDate.getMonth(),startDate.getFullYear())-1){
                        i++;                    
                    }
                    console.log("j"+j+"i"+i);
                    
                }
                
            }else{
                this.datelayOut.getChildByName("day"+i).getChildByName("bu").active=false;
                this.datelayOut.getChildByName("day"+i).getChildByName("duihao").active=false;
                this.datelayOut.getChildByName("day"+i).getChildByName("lbldate").active=false;
            }
            
        }
        // Canvas/bottom/task/meiriqiandao/jindutiao
        this.jindutiao.getChildByName("jindutiao").width=630*(count/this.getMaxDay(startDate.getMonth(),startDate.getFullYear()));
    },
    getMaxDay: function (month,year){
        var d = new Date(year, month, 0);
        return d.getDate();
   },
   getQianDao: function(){

   },
   getBuQian: function(){
    
   },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
