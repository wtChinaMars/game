cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _chatRoot:null,
        _tabQuick:null,
        _tabEmoji:null,
        _iptChat:null,
        
        _quickChatInfo:null,
        _btnChat:null,
    },

    // use this for initialization
    onLoad: function () {
        if(cc.vv == null){
            return;
        }
        
        cc.vv.chat = this;
        
        this._btnChat = this.node.getChildByName("btn_chat");
        this._btnChat.active = cc.vv.replayMgr.isReplay() == false;
        
        this._chatRoot = this.node.getChildByName("chat");
        this._chatRoot.active = false;
        
        this._tabQuick = this._chatRoot.getChildByName("quickchatlist");
        this._tabEmoji = this._chatRoot.getChildByName("emojis");
        
        this._iptChat = this._chatRoot.getChildByName("iptChat").getComponent(cc.EditBox);
        
        
        this._quickChatInfo = {};
        if(cc.vv.userMgr.sex==2){
            this._quickChatInfo["item0"] = {index:0,content:"快点啊，都等到我花儿都谢了！",sound:"fix_msg_1_nv.mp3"};
            this._quickChatInfo["item1"] = {index:1,content:"不怕神一样的对手，就怕猪一样的队友！",sound:"fix_msg_3_nv.mp3"};
            this._quickChatInfo["item2"] = {index:2,content:"来啊，来啊，互相伤害啊！",sound:"fix_msg_4_nv.mp3"};
            this._quickChatInfo["item3"] = {index:3,content:"你这牌打的真没谁了！",sound:"fix_msg_5_nv.mp3"};
            this._quickChatInfo["item4"] = {index:4,content:"别吵，让我想想！",sound:"fix_msg_6_nv.mp3"};
            this._quickChatInfo["item5"] = {index:5,content:"出来混，迟早要还的",sound:"fix_msg_2_nv.mp3"};
            this._quickChatInfo["item6"] = {index:6,content:"跑得急不一定就跑的掉！",sound:"fix_msg_7_nv.mp3"};
            this._quickChatInfo["item7"] = {index:7,content:"我已经使用了洪荒之力了。",sound:"fix_msg_8_nv.mp3"};
            this._quickChatInfo["item8"] = {index:8,content:"我走过最长的路，就是你的套路！",sound:"fix_msg_9_nv.mp3"};
            this._quickChatInfo["item9"] = {index:9,content:"意不意外，惊不惊喜？",sound:"fix_msg_10_nv.mp3"};
        }else{
            this._quickChatInfo["item0"] = {index:0,content:"快点啊，都等到我花儿都谢了！",sound:"fix_msg_1_nan.mp3"};
            this._quickChatInfo["item1"] = {index:1,content:"不怕神一样的对手，就怕猪一样的队友！",sound:"fix_msg_3_nan.mp3"};
            this._quickChatInfo["item2"] = {index:2,content:"来啊，来啊，互相伤害啊！",sound:"fix_msg_4_nan.mp3"};
            this._quickChatInfo["item3"] = {index:3,content:"你这牌打的真没谁了！",sound:"fix_msg_5_nan.mp3"};
            this._quickChatInfo["item4"] = {index:4,content:"别吵，让我想想！",sound:"fix_msg_6_nan.mp3"};
            this._quickChatInfo["item5"] = {index:5,content:"出来混，迟早要还的",sound:"fix_msg_2_nan.mp3"};
            this._quickChatInfo["item6"] = {index:6,content:"跑得急不一定就跑的掉！",sound:"fix_msg_7_nan.mp3"};
            this._quickChatInfo["item7"] = {index:7,content:"我已经使用了洪荒之力了。",sound:"fix_msg_8_nan.mp3"};
            this._quickChatInfo["item8"] = {index:8,content:"我走过最长的路，就是你的套路！",sound:"fix_msg_9_nan.mp3"};
            this._quickChatInfo["item9"] = {index:9,content:"意不意外，惊不惊喜？",sound:"fix_msg_10_nan.mp3"};
        }

   
    },
    getQuickChatInfo(index,sex){
        var key = "item" + index;
        if(sex==2){
            this._quickChatInfo["item0"] = {index:0,content:"快点啊，都等到我花儿都谢了！",sound:"fix_msg_1_nv.mp3"};
            this._quickChatInfo["item1"] = {index:1,content:"不怕神一样的对手，就怕猪一样的队友！",sound:"fix_msg_3_nv.mp3"};
            this._quickChatInfo["item2"] = {index:2,content:"来啊，来啊，互相伤害啊！",sound:"fix_msg_4_nv.mp3"};
            this._quickChatInfo["item3"] = {index:3,content:"你这牌打的真没谁了！",sound:"fix_msg_5_nv.mp3"};
            this._quickChatInfo["item4"] = {index:4,content:"别吵，让我想想！",sound:"fix_msg_6_nv.mp3"};
            this._quickChatInfo["item5"] = {index:5,content:"出来混，迟早要还的",sound:"fix_msg_2_nv.mp3"};
            this._quickChatInfo["item6"] = {index:6,content:"跑得急不一定就跑的掉！",sound:"fix_msg_7_nv.mp3"};
            this._quickChatInfo["item7"] = {index:7,content:"我已经使用了洪荒之力了。",sound:"fix_msg_8_nv.mp3"};
            this._quickChatInfo["item8"] = {index:8,content:"我走过最长的路，就是你的套路！",sound:"fix_msg_9_nv.mp3"};
            this._quickChatInfo["item9"] = {index:9,content:"意不意外，惊不惊喜？",sound:"fix_msg_10_nv.mp3"};
        }else{
            this._quickChatInfo["item0"] = {index:0,content:"快点啊，都等到我花儿都谢了！",sound:"fix_msg_1_nan.mp3"};
            this._quickChatInfo["item1"] = {index:1,content:"不怕神一样的对手，就怕猪一样的队友！",sound:"fix_msg_3_nan.mp3"};
            this._quickChatInfo["item2"] = {index:2,content:"来啊，来啊，互相伤害啊！",sound:"fix_msg_4_nan.mp3"};
            this._quickChatInfo["item3"] = {index:3,content:"你这牌打的真没谁了！",sound:"fix_msg_5_nan.mp3"};
            this._quickChatInfo["item4"] = {index:4,content:"别吵，让我想想！",sound:"fix_msg_6_nan.mp3"};
            this._quickChatInfo["item5"] = {index:5,content:"出来混，迟早要还的",sound:"fix_msg_2_nan.mp3"};
            this._quickChatInfo["item6"] = {index:6,content:"跑得急不一定就跑的掉！",sound:"fix_msg_7_nan.mp3"};
            this._quickChatInfo["item7"] = {index:7,content:"我已经使用了洪荒之力了。",sound:"fix_msg_8_nan.mp3"};
            this._quickChatInfo["item8"] = {index:8,content:"我走过最长的路，就是你的套路！",sound:"fix_msg_9_nan.mp3"};
            this._quickChatInfo["item9"] = {index:9,content:"意不意外，惊不惊喜？",sound:"fix_msg_10_nan.mp3"};
        }
        return this._quickChatInfo[key];   
    },
    
    onBtnChatClicked:function(){
        this._chatRoot.active = true;
    },
    
    onBgClicked:function(){
        this._chatRoot.active = false;
    },
    
    onTabClicked:function(event){
        if(event.target.name == "tabQuick"){
            this._tabQuick.active = true;
            this._tabEmoji.active = false;
        }
        else if(event.target.name == "tabEmoji"){
            this._tabQuick.active = false;
            this._tabEmoji.active = true;
        }
    },
    
    onQuickChatItemClicked:function(event){
        this._chatRoot.active = false;
        var info = this._quickChatInfo[event.target.name];
        var data = {
            index:info.index,
            sex:cc.vv.userMgr.sex,
        }
        
        cc.vv.net.send("quick_chat",data); 
    },
    
    onEmojiItemClicked:function(event){
        console.log(event.target.name);
        this._chatRoot.active = false;
        cc.vv.net.send("emoji",event.target.name);
    },
    
    onBtnSendChatClicked:function(){
        this._chatRoot.active = false;
        if(this._iptChat.string == ""){
            return;
        }
        cc.vv.net.send("chat",this._iptChat.string);
        this._iptChat.string = "";
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
