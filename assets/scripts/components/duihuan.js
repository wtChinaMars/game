cc.Class({
    extends: cc.Component,

    properties: {
        la: cc.Label,
    },

    onLoad: function () {
    },
    init: function (event) {
        var wupin = cc.find("Canvas/duihuan/wupin/view/content");
        if (event.target.name == "wupin1") {

            if (cc.vv.userMgr.zuanshi < 100) {
                cc.vv.alert.show("提示", "钻石不足！");
                return;
            } else {
                cc.vv.alert.show("提示", "是否兑换1000金币", function () {
                    this.postDuihuan(event.target.name, 100);
                }.bind(this), true);
            }
        } else if (event.target.name == "wupin2") {

            if (cc.vv.userMgr.zuanshi < 100) {
                cc.vv.alert.show("提示", "钻石不足！");
                return;
            } else {
                cc.vv.alert.show("提示", "是否兑换1000金币", function () {
                    this.postDuihuan(event.target.name, 100);
                }.bind(this), true);
            }


        } else if (event.target.name == "wupin3") {

            if (cc.vv.userMgr.zuanshi < 100) {
                cc.vv.alert.show("提示", "钻石不足！");
                return;
            } else {
                cc.vv.alert.show("提示", "是否兑换1000金币", function () {
                    this.postDuihuan(event.target.name, 100);
                }.bind(this), true);
            }
        } else if (event.target.name == "wupin4") {

            if (cc.vv.userMgr.zuanshi < 100) {
                cc.vv.alert.show("提示", "钻石不足！");
                return;
            } else {
                cc.vv.alert.show("提示", "是否兑换1000金币", function () {
                    this.postDuihuan(event.target.name, 100);
                }.bind(this), true);
            }
        } else if (event.target.name == "wupin5") {

            if (cc.vv.userMgr.zuanshi < 100) {
                cc.vv.alert.show("提示", "钻石不足！");
                return;
            } else {
                cc.vv.alert.show("提示", "是否兑换1000金币", function () {
                    this.postDuihuan(event.target.name, 100);
                }.bind(this), true);
            }
        } else if (event.target.name == "wupin6") {

            if (cc.vv.userMgr.zuanshi < 100) {
                cc.vv.alert.show("提示", "钻石不足！");
                return;
            } else {
                cc.vv.alert.show("提示", "是否兑换1000金币", function () {
                    this.postDuihuan(event.target.name, 100);
                }.bind(this), true);
            }
        }
    },
    isZsNum: function (wupin, Num) {
        if (wupin == "wupin1" && Num < 100) {
            cc.vv.alert.show("提示", "钻石不足！");
            return;
        } else if (wupin == "wupin2" && Num < 100) {
            cc.vv.alert.show("提示", "钻石不足！");
            return;
        } else if (wupin == "wupin3" && Num < 100) {
            cc.vv.alert.show("提示", "钻石不足！");
            return;
        } else if (wupin == "wupin4" && Num < 100) {
            cc.vv.alert.show("提示", "钻石不足！");
            return;
        } else if (wupin == "wupin5" && Num < 100) {
            cc.vv.alert.show("提示", "钻石不足！");
            return;
        } else if (wupin == "wupin6" && Num < 100) {
            cc.vv.alert.show("提示", "钻石不足！");
            return;
        }
    },
    postDuihuan: function (wupin, Num) {
        var data = {
            wupin: wupin,
            Num: Num,
            userid: cc.vv.userMgr.userId,
        };
        var onGet = function (ret) {

            cc.vv.alert.show("提示", "购买成功！");
            cc.vv.userMgr.zuanshi -= 100;

        }
        cc.vv.http.sendRequest("/postDuihuan", data, onGet);
    },
    initduihuanjilv: function (duihuan) {
        //  this.lateUpdate.string=duihuan;
        //  cc.find("jilv/duihuanl",this.node).getComponent(cc.Label).string = duihuan;
        this.node.children[0].string = duihuan;
    },

});
