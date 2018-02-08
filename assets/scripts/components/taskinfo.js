cc.Class({
    extends: cc.Component,

    properties: {
        tsinfo:cc.Label,
        task:cc.Node,
        
        
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
    },

    // use this for initialization
    onLoad: function () {

    },
	init:function(title,time,id,info,wupin,isread){
        //初始化邮件信息
        this.biaoti.string = title;
        this.time1.string = time;
        this.xiaoxi_id=id;
        this.xiaoxi_info=info;
        this.xiaoxi_wupin=wupin;
        this.xiaoxi_title=title;
        this.xiaoxi_time=time;
       // return;
	},
    intmailinfo:function(){
        var xiaoxi=cc.find("Canvas/xiaoxi1/news/xiaoxi");
        var xiaoxi1=cc.find("Canvas/xiaoxi1/news");
        var info1=cc.find("Canvas/xiaoxi1/news/xiaoxi/nr/view/content");
        xiaoxi1.active=true;
        xiaoxi.getChildByName("shijian").getComponent(cc.Label).string = this.xiaoxi_time;
        xiaoxi.getChildByName("info").getComponent(cc.Label).string = this.xiaoxi_title;

        info1.getChildByName("sj").getComponent(cc.Label).string="收件人 : ("+123+")";
        info1.getChildByName("info").getComponent(cc.Label).string=this.xiaoxi_info;
    },

});
