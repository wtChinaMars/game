cc.Class({
    extends: cc.Component,

    properties: {
        daili:cc.Node,
        zsfk:cc.Node,
        dailiPrefab:cc.Prefab,
        dailiqian17:cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },
    onchengjiao:function(event){
        if(event.target.name == "chengzhaodaili"){
            cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
            cc.find("Canvas/FK/bottom_left/fk_bottom/daili/qwe").active=true;
            this.daili.getChildByName("nr").getChildByName("zhedang").active = true;
            this.daili.getChildByName("nr").getChildByName("dailihuadong").active = false;
            this.daili.getChildByName("nr").getChildByName("dian").active = true;
            this.dailiinfo();
      
        }else if(event.target.name == "x"){
            cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");            
            cc.find("Canvas/FK/bottom_left/fk_bottom/daili/qwe").active=false;
        }
    },
    dailiinfo:function(){
        var data={
            ok:"ok",
        }

        var self = this;
        var onCreate = function(ret){
            if(ret.errcode !== 0){
                console.log(ret.errmsg);
            }
            else{
                self.dailiqian17.removeAllChildren(); 
                console.log(ret);
             
                for(var i = 0;i<32;i++){
                    var daili=cc.instantiate(self.dailiPrefab);
                    daili.getComponent("dailiinfo").init(ret.info[i].quyu,ret.info[i].wei);
                    self.dailiqian17.addChild(daili);
                }
            }
        };
        
        
        cc.vv.http.sendRequest("/dailiinfo",data,onCreate);   
    },


    onzsfk:function(event){ //赠送钥匙
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        if(event.target.name == "ok"){
            var fksum = this.zsfk.getChildByName("fasum").getComponent(cc.EditBox).string;
            var name = this.zsfk.getChildByName("name").getComponent(cc.EditBox).string;
            if(!(/^[\d]+$/).test(name)){
                cc.vv.alert.show("提示","输入账号错误请重新输入！");
                return false;
            }else if(cc.vv.userMgr.gems<fksum){
                cc.vv.alert.show("提示","你的钥匙不足！");
                return false;
            }if(name==""){
                cc.vv.alert.show("提示","用户ID不允许为空，请重新输入！");
                return false;
            }
            var str='您是否赠送ID:['+name+']'+'钥匙'+fksum+'张！';
            cc.vv.alert.show("提示",str,function(){
                var fkinfo = {
                    fksum1:fksum,
                    name1:name,
                    myId1:cc.vv.userMgr.userId,
                }
                var self = this;
                cc.vv.userMgr.gems-=fksum;
                var zsfk=function(ret){
                    if(ret.errcode !== 0){
                        cc.vv.alert.show("提示","赠送失败！");
                    }else{
                        if(ret.ret=true){
                            cc.vv.alert.show("提示","赠送钥匙成功！");
                            self.onRefushCoin();
                            self.zsfk.getChildByName("fasum").getComponent(cc.EditBox).string="";
                            self.zsfk.getChildByName("name").getComponent(cc.EditBox).string="";
                        }else{
                            cc.vv.alert.show("提示","赠送钥匙失败！");
                        }
                    }
                }
                cc.vv.http.sendRequest("/zs_fk_info",fkinfo,zsfk);  
            }.bind(this),true);;
         }else if(event.target.name == "x"){
             this.zsfk.active=false;
         }else if(event.target.name = "zensongfangka"){
             this.zsfk.active=true;
             cc.find("Canvas/FK/bottom_left/fk_bottom/zsfk/zsfk/info").getComponent(cc.Label).string=cc.vv.userMgr.gems;
         }
        
    },
    onGuanbizsfk:function(){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        this.zsfk.active = false;
    },
    onzsfkhqid:function(){
            cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
            var name = this.zsfk.getChildByName("name").getComponent(cc.EditBox).string;
            if(!(/^[\d]+$/).test(name)){
                cc.vv.alert.show("提示","请输入正确的用户ID！");
                return false;
            }
            if(name==""){
                cc.vv.alert.show("提示","用户ID不允许为空，请重新输入！");
                return false;
            }
            var fkinfo = {
                name1:name,
            }
                var zsfk=function(ret){
                    if(ret.errcode !== 0){
                        cc.vv.alert.show("提示","赠送失败！");
                    }else{
                        cc.find("Canvas/FK/bottom_left/fk_bottom/zsfk/zsfk/name1").getComponent(cc.Label).string = ret.info
                    }
                }
                cc.vv.http.sendRequest("/get_name",fkinfo,zsfk);  
    },
    onSheZhi:function(event){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        if(event.target.name == "guan"){
            this.shezhi.getChildByName("jingyin").getChildByName("kai").active=true;
            this.shezhi.getChildByName("jingyin").getChildByName("guan").active=true;
        }else if(event.target.name == "kai"){
            this.shezhi.getChildByName("jingyin").getChildByName("kai").active=false;
            this.shezhi.getChildByName("jingyin").getChildByName("guan").active=true;
        }else if(event.target.name == "guan1"){
            this.shezhi.getChildByName("zhendong").getChildByName("kai1").active=true;
            this.shezhi.getChildByName("zhendong").getChildByName("guan1").active=false;
        }else if(event.target.name == "kai1"){
            this.shezhi.getChildByName("zhendong").getChildByName("kai1").active=false;
            this.shezhi.getChildByName("zhendong").getChildByName("guan1").active=true;
        }else if(event.target.name == "btn_hhz"){
            this.daili.getChildByName("btn").getChildByName("btn_hhz").active=false;
            this.daili.getChildByName("btn").getChildByName("btn_kf").active=false;
            this.daili.getChildByName("btn").getChildByName("btn_hz").active=true;
            this.daili.getChildByName("btn").getChildByName("btn_hkf").active=true;
            this.daili.getChildByName("nr").active=false;
            this.daili.getChildByName("nr1").active=true;
        }else if(event.target.name == "btn_hkf"){
           this.daili.getChildByName("btn").getChildByName("btn_hhz").active=true;
           this.daili.getChildByName("btn").getChildByName("btn_kf").active=true;
           this.daili.getChildByName("btn").getChildByName("btn_hz").active=false;
           this.daili.getChildByName("btn").getChildByName("btn_hkf").active=false;
           this.daili.getChildByName("nr").active=true;
           this.daili.getChildByName("nr1").active=false;
        }
    },
    onBtnClicked:function(event){
        if(event.target.name == 'hzah'){
            cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
            cc.find("Canvas/FK/bottom_left/fk_bottom/daili/qwe/hzsalert").active = false;
        }
    },
    onRefushCoin:function(){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        var data = {
            userid:cc.vv.userMgr.userId,
        }
        var self = this;
        var getMoney = function(ret){
            console.log("ret",ret);
            cc.find("Canvas/xyzp/renwu/jt/jtsl").getComponent(cc.Label).string = ret[0].jintiao;
            cc.find("Canvas/xyzp/renwu/zs/zssl").getComponent(cc.Label).string = ret[0].coins;
            cc.find("Canvas/top/right_bottom/Score/jb").getComponent(cc.Label).string = ret[0].gems;
            cc.vv.userMgr.coins=ret[0].coins;
            cc.vv.userMgr.jintiao=ret[0].jintiao;
            cc.vv.userMgr.gems=ret[0].gems;
        };
        cc.vv.http.sendRequest("/get_money",data,getMoney);
        
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
