var Net = require("Net")
var Global = require("Global")
cc.Class({
    extends: cc.Component,
//init
    properties: {
        lblName:cc.Label,
        lblMoney:cc.Label,
        lblGems:cc.Label,
        lblID:cc.Label,
        sprHeadImg:cc.Sprite,
        userinfo:cc.Node,
        settingsWin: cc.Node,
        service: cc.Node,
        paihangbangPrefab:cc.Prefab,

        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    initNetHandlers: function () {
        var self = this;
    },
//onLoad
    onLoad: function () {
        this.getlv();
        cc.find("Canvas/top/right_bottom/Score/jb").getComponent(cc.Label).string = this.getConvert(cc.vv.userMgr.coins);
        cc.find("Canvas/top/right_bottom/Gold/jt").getComponent(cc.Label).string = this.getConvert(cc.vv.userMgr.jintiao);
        cc.find("Canvas/top/right_bottom/RoomCard/roomcard").getComponent(cc.Label).string = this.getConvert(cc.vv.userMgr.coins);
        this.initLabels();
        var imgLoader = this.sprHeadImg.node.getComponent("ImageLoader");
        imgLoader.setUserID(cc.vv.userMgr.userId);
        cc.vv.utils.addClickEvent(this.sprHeadImg.node, this.node, "Hall", "onBtnClicked");


        this.addComponent("UserInfoShow");


    },
//onClick
    onBtnClicked: function (event) {
        cc.vv.userMgr.zhuangtai=true;
        if (event.target.name == "btn_setting") {
            var jushuxuanze = cc.sys.localStorage.getItem("jushuxuanze");
                this.settingsWin = cc.find("Canvas/settings");
                this.settingsWin.active = true;
                if(jushuxuanze=="true"){
                    this.settingsWin.getChildByName("zhendong").getChildByName("kai1").active=true;
                    this.settingsWin.getChildByName("zhendong").getChildByName("guan1").active=false;
                }else{
                    this.settingsWin.getChildByName("zhendong").getChildByName("kai1").active=false;
                    this.settingsWin.getChildByName("zhendong").getChildByName("guan1").active=true;
                }
        }
        else if (event.target.name == "btn_help") {
            this.helpWin.active = true;
        }
        else if (event.target.name == "btn_xiaoxi") {
            this.xiaoxiWin.active = true;
        }
        else if (event.target.name == "head") {
            cc.vv.userinfoShow.show(cc.vv.userMgr.userName, cc.vv.userMgr.userId, this.sprHeadImg, cc.vv.userMgr.sex, cc.vv.userMgr.ip, cc.vv.userMgr.charm, cc.vv.userMgr.lv, cc.vv.userMgr.jinbichangnum, cc.vv.userMgr.jinbichangshenglv, cc.vv.userMgr.coins, cc.vv.userMgr.jintiao);
        }else if (event.target.name == "btn_ok3") {
            this.roomwindow.active = true;
            var seq = cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1), cc.callFunc(function () {
                this.roomwindow.getComponent("RoomWindow").getrooms();
            }, this, 0));
            this.roomwindow.runAction(seq);

            // this.roomwindow.getComponent("RoomWindow").getrooms();

        }else if (event.target.name == "btn_service") {
            cc.vv.userMgr.zhuangtai=true;
            this.service.active = true;
        }else if(event.target.name=="btn_paihang"){
            cc.vv.userMgr.zhuangtai=true;
            var game = cc.find("Canvas/paihangbang");
            game.active=true;
            var data={
                ok:"ok",
                userid:cc.vv.userMgr.userId,
            }

            var self = this;
            var onCreate = function(ret){
                if(ret == ""){
                    console.log(ret.errmsg);
                }
                else{
                    cc.vv.userMgr.zhuangtai=true;
                    //排行榜
                    console.log(ret);
                    var is="";
                    var paihangbangco= cc.find("Canvas/paihangbang/jfph/ph/view/content");
                    paihangbangco.removeAllChildren();
                    for(var i = 0;i<ret.ret.length;i++){
                        if(ret.ret[i].userid==cc.vv.userMgr.userId){
                            is=i;
                        }
                        var daili=cc.instantiate(self.paihangbangPrefab);
                        var name=ret.ret[i].name;
                        var id=ret.ret[i].userid;
                        var jf=ret.ret[i].lv;
                        daili.getComponent("paihangbang").init(name,id,jf,i);
                        paihangbangco.addChild(daili);
                    }
                    var ren = cc.find("Canvas/paihangbang/ren");
                    ren.getChildByName("name").getComponent(cc.Label).string = cc.vv.userMgr.userName;
                    ren.getChildByName("id").getComponent(cc.Label).string = "ID:"+cc.vv.userMgr.userId;
                    ren.getChildByName("jifen").getComponent(cc.Label).string = cc.vv.userMgr.lv;
                    if(is==0&&is!==""){
                        ren.getChildByName("jiangbei").getChildByName("one").active = true;
                        ren.getChildByName("jiangbei").getChildByName("two").active = false;
                        ren.getChildByName("jiangbei").getChildByName("Three").active = false;
                        ren.getChildByName("jiangbei").getChildByName("diji").active = false;
                        cc.find("Canvas/paihangbang/ren/tishi").getComponent(cc.Label).string="第"+(is+1)+"名！恭喜！";
                    }else if(is==1&&is!=""){
                        ren.getChildByName("jiangbei").getChildByName("one").active = false;
                        ren.getChildByName("jiangbei").getChildByName("two").active = true;
                        ren.getChildByName("jiangbei").getChildByName("Three").active = false;
                        ren.getChildByName("jiangbei").getChildByName("diji").active = false;
                        cc.find("Canvas/paihangbang/ren/tishi").getComponent(cc.Label).string="第"+(is+1)+"名！恭喜！";
                    }else if(is==2&&is!=""){
                        ren.getChildByName("jiangbei").getChildByName("one").active = false;
                        ren.getChildByName("jiangbei").getChildByName("two").active = false;
                        ren.getChildByName("jiangbei").getChildByName("Three").active = true;
                        ren.getChildByName("jiangbei").getChildByName("diji").active = false;
                        cc.find("Canvas/paihangbang/ren/tishi").getComponent(cc.Label).string="第"+(is+1)+"名！恭喜！";
                    }else if(is>2&is<11&&is!=""){
                        ren.getChildByName("jiangbei").getChildByName("one").active = false;
                        ren.getChildByName("jiangbei").getChildByName("two").active = false;
                        ren.getChildByName("jiangbei").getChildByName("Three").active = false;
                        ren.getChildByName("jiangbei").getChildByName("diji").active = true;
                        ren.getChildByName("jiangbei").getChildByName("diji").getChildByName("dengji").getComponent(cc.Label).string = is+1;
                        cc.find("Canvas/paihangbang/ren/tishi").getComponent(cc.Label).string="第"+(is+1)+"名！恭喜！";
                    }else{
                        ren.getChildByName("jiangbei").getChildByName("diji1").getChildByName("one").active=false;
                        ren.getChildByName("jiangbei").getChildByName("diji1").getChildByName("two").active=false;
                        ren.getChildByName("jiangbei").getChildByName("diji1").getChildByName("Three").active=false;
                        ren.getChildByName("jiangbei").getChildByName("diji1").getChildByName("dengji").active = true;
                        ren.getChildByName("jiangbei").getChildByName("diji1").getChildByName("dengji").getComponent(cc.Label).string="未上榜"
                    }
                }
            };
            cc.vv.http.sendRequest("/paihangbang",data,onCreate);
            console.log(data);
        }else if(event.target.name=="btn_service"){

        }
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
    },
    /**
     * 实名认证
     */
    onShiMing:function(event){
        cc.vv.userMgr.zhuangtai=true;
        if(event.target.name == "shiming") {
            this.userinfo.getChildByName("shiming").active=true;
        }else if(event.target.name == "hbg"){
            this.userinfo.getChildByName("shiming").active=false;
        }else if(event.target.name == "hshiming"){
            this.userinfo.getChildByName("shiming").active=false;
        } else if(event.target.name == "qhzhanghao"){


            cc.vv.alert.show("提示","是否要切换账号！",function(){
                cc.sys.localStorage.removeItem("wx_account");
                cc.sys.localStorage.removeItem("wx_sign");
                cc.director.loadScene("login");
            }.bind(this),true);




        }


    },

    closeUserInfo: function () {
        this.userinfo.active = false;
    },

    onClickClose: function(event){
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        if (event.target.name == "close_userinfo") {
            this.userinfo.active = false;
        }else if (event.target.name == "btn_serviceClose") {
            this.service.active = false;
        }else if (event.target.name == "houtui") {
            var game = cc.find("Canvas/paihangbang");
            game.active=false;
        }
    },

    onDaiKaiRoomClicked1: function (event) {
        cc.vv.userMgr.zhuangtai=true;
        cc.vv.audioMgr.playSFX("doudizhu/button/anniu.mp3");
        cc.find("Canvas/lianxi").active = true;
    },
//fucntion
    initLabels: function () {
        this.lblName.string = cc.vv.userMgr.userName;
        //  this.lblMoney.string = cc.vv.userMgr.coins;

        // if (this.lblGems != null) {
        //     this.lblGems.string = cc.vv.userMgr.coins;
        // } else if (this.lblGems1 != null) {
        //     this.lblGems1.string = cc.vv.userMgr.gems;
        // }
        this.lblID.string = "ID:" + cc.vv.userMgr.userId;
    },
    getlv: function () {
        var zs = cc.find("Canvas/top/top_left/headinfo/lblLv").getComponent(cc.Label);
        if (cc.vv.userMgr.lv <= 1000) {
            zs.string = "初出茅庐";
        } else if (cc.vv.userMgr.lv <= 3000) {
            zs.string = "渐入佳境";
        } else if (cc.vv.userMgr.lv <= 10000) {
            zs.string = "千锤百炼";
        } else if (cc.vv.userMgr.lv <= 50000) {
            zs.string = "融会贯通";
        } else if (cc.vv.userMgr.lv <= 100000) {
            zs.string = "炉火纯青";
        } else if (cc.vv.userMgr.lv <= 500000) {
            zs.string = "登峰造极";
        } else if (cc.vv.userMgr.lv > 500000) {
            zs.string = "最强斗神";
        }
    },
    getConvert: function(num){
        if(num>=100000000){
            return Math.floor(num/100000000*100)/100+"亿";
        }else if(num>=10000){
            return Math.floor(num/10000*100)/100+"万";
        }else if(num<10000){
            return num;
        }
    },
});
