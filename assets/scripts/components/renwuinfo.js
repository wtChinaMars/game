cc.Class({
    extends: cc.Component,

    properties: {
        task_info:cc.Label,
        task_reward1:cc.Node,
        task_reward2:cc.Node,
        task_reward3:cc.Node,
        task_rewardSum1:cc.Label,
        task_rewardSum2:cc.Label,
        task_rewardSum3:cc.Label,
        task_Num:cc.Label,
        task_linqu:cc.Node,
        task_jiangli:"",
    
    },
    onLoad: function () {
    },
	init:function(title,reward1,rewardSum1,reward2,rewardSum2,reward3,rewardSum3,ZongNum,Num,jiangli){
        this.task_info.string=title;
        if(reward1=="sbjf"){
            this.task_reward1.getChildByName("sbjf").active = true;
            this.task_reward1.getChildByName("bpk").active = false;
            this.task_reward1.getChildByName("jf").active = false;
        //    this.task_reward1.getChildByName("sbjf").active = true;
        
            this.task_rewardSum1.string = rewardSum1;
        }else if(reward1 == "jf"){
            this.task_reward1.getChildByName("sbjf").active = false;
            this.task_reward1.getChildByName("bpk").active = false;
            this.task_reward1.getChildByName("jf").active = true;
            this.task_rewardSum1.string = rewardSum1;
        }else if(reward1 == "bqk"){
            this.task_reward1.getChildByName("sbjf").active = false;
            this.task_reward1.getChildByName("bpk").active = true;
            this.task_reward1.getChildByName("jf").active = false;
            this.task_rewardSum1.string = rewardSum1;
        }

        if(reward2=="sbjf"){
            this.task_reward2.getChildByName("sbjf").active = true;
            this.task_reward2.getChildByName("bpk").active = false;
            this.task_reward2.getChildByName("jf").active = false;
            this.task_rewardSum2.string = rewardSum2;
        }else if(reward2 == "jf"){
            this.task_reward2.getChildByName("sbjf").active = false;
            this.task_reward2.getChildByName("bpk").active = false;
            this.task_reward2.getChildByName("jf").active = true;
            this.task_rewardSum2.string = rewardSum2;
        }else if(reward2 == "bqk"){
            this.task_reward2.getChildByName("sbjf").active = false;
            this.task_reward2.getChildByName("bpk").active = true;
            this.task_reward2.getChildByName("jf").active = false;
            this.task_rewardSum2.string = rewardSum2;
        }

        if(reward3=="sbjf"){
            this.task_reward3.getChildByName("sbjf").active = true;
            this.task_reward3.getChildByName("bpk").active = false;
            this.task_reward3.getChildByName("jf").active = false;
            this.task_rewardSum3.string = rewardSum3;
        }else if(reward3 == "jf"){
            this.task_reward3.getChildByName("sbjf").active = false;
            this.task_reward3.getChildByName("bpk").active = false;
            this.task_reward3.getChildByName("jf").active = true;
            this.task_rewardSum3.string = rewardSum3;
        }else if(reward3 == "bqk"){
            this.task_reward3.getChildByName("sbjf").active = false;
            this.task_reward3.getChildByName("bpk").active = true;
            this.task_reward3.getChildByName("jf").active = false;
            this.task_rewardSum3.string = rewardSum3;
        }
        this.task_Num.string = Num+"/"+ZongNum;
        if(Num==ZongNum){
            this.task_linqu.active = true;
            this.task_jiangli=jiangli;
        }else{
            this.task_linqu.active = false;
        }
    },
    onquzuorenwu:function(){
        cc.find("Canvas/task").active = false;
    },
    onlingqujiangli:function(){
        var onCreate=function(ret){
            cc.vv.alert.show("提示","奖励100金币");
        }
       var data={
           coins:100,
           userid:cc.vv.userMgr.userId,
       };
        cc.vv.http.sendRequest("/renwujinglu",data,onCreate);  
    }
});
