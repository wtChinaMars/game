cc.Class({
	extends: cc.Component,

	properties: {

		pointer: {
			default: null,
			type: cc.Sprite

		},

		pointerButton: {
			default: null,
			type: cc.Node

		},

		awardWords: {
			default: null,
			type: cc.Label


		},
		amount: {
			default: null,
			type: cc.Label

		},
		


	},



	pointerButtonClick: function () {
		this.pointerButton.on(cc.Node.EventType.TOUCH_START, this.pointerButtonStartControl, this);
		this.pointerButton.on(cc.Node.EventType.TOUCH_UP, this.pointerButtonUpControl, this);

	},

	pointerButtonStartControl: function () {
		var _this = this;
		var clickTimes = 6; //设置转盘指针多时间
		var rounds = 10;	//设置转盘指针多少圈	     
		_this.pointer.node._rotationY=0;
		_this.pointer.node._rotationX=0;


		//Math.random() * X   +  Y  // Y:是 固定 角度  X 是随即数  
		var awardAngle01 = parseInt(Math.random() * 35 + 5); //1   
		var awardAngle02 = parseInt(Math.random() * 35 + 47); //2
		var awardAngle03 = parseInt(Math.random() * 35 + 92); //3 
		var awardAngle04 = parseInt(Math.random() * 35 + 137); //4
		var awardAngle05 = parseInt(Math.random() * 35 + 182); //5
		var awardAngle06 = parseInt(Math.random() * 35 + 227); //6
		var awardAngle07 = parseInt(Math.random() * 35 + 272); //7
		var awardAngle08 = parseInt(Math.random() * 35 + 317); //8        


		var awardMapping = {  // 转盘 会 根据 angleVlue 进行判断，angleVlue 是重要参数，angleVlue 同事涉及对 转盘角度的控制
			0: {
				attitude: '',
				awardWords: '',
				amount: '',
				angleVlue: '0'
			},
			1: {
				attitude: '',
				awardWords: '美女给你',
				amount: '一个吻',
				angleVlue: '1'
			},
			2: {
				attitude: '',
				awardWords: '美女给你',
				amount: '两个吻',
				angleVlue: '2'

			},
			3: {
				attitude: '',
				awardWords: '美女给你',
				amount: '三个吻',
				angleVlue: '3'

			},
			4: {
				attitude: '',
				awardWords: '美女给你',
				amount: '四个吻',
				angleVlue: '4'

			},
			5: {
				attitude: '',
				awardWords: '美女给你',
				amount: '五个吻',
				angleVlue: '5'
			},
			6: {
				attitude: '',
				awardWords: '美女给你',
				amount: '六个吻',
				angleVlue: '6'
			},

			7: {
				attitude: '',
				awardWords: '美女给你',
				amount: '七个吻',
				angleVlue: '7'
			},

			8: {
				attitude: '',
				awardWords: '南塔斯',
				amount: '跳钢管舞',
				angleVlue: '8'
			}
		};
	

		_this.getPrize(awardMapping);

		//var url = cc.url.raw('resources/textures/query.json');

		var data = {
			userid: cc.vv.userMgr.userId,
			award: awardMapping,
		}

		var _this = this;
		var onCreate = function (ret) {
			if (ret == ""&&ret !=0) {
				console.log(ret);
			}
			else {
				var adWords = awardMapping[ret].awardWords; //获取奖励弹出框显示文字
				var adAmount = awardMapping[ret].amount;     //获取奖励弹出框显示值
				var adValue = awardMapping[ret].angleVlue;  //获取 角度 根据 角度来判断
				//var leftTimes = res.chance;
				//cc.log(res,adValue);
				_this.getPrize(awardMapping);
	
				function inforDelayShow() {
					_this.scheduleOnce(function () {
						//console.log("test");
						_this.awardWords.string = adWords;
						_this.amount.string = adAmount;
						var data1={
							chouzhong:adAmount,
							userid:cc.vv.userMgr.userId,
							name:cc.vv.userMgr.userName,
						}
						cc.vv.http.sendRequest("/chouzhong", data1,onCreate);
						
					}, clickTimes + 0.5);
				}
	
				if (adValue == 1) {
					// console.log("findNode");
					var rotateBy01 = cc.rotateBy(clickTimes, awardAngle01 + 360 * rounds);
					var actionStepA = _this.pointer.node.runAction(rotateBy01).easing(cc.easeCubicActionOut(clickTimes));
					_this.pointerButton.destroy();
					inforDelayShow();
					
				}
				else if (adValue == 2) {
	
					var rotateBy02 = cc.rotateBy(clickTimes, awardAngle02 + 360 * rounds);
					_this.pointer.node.runAction(rotateBy02).easing(cc.easeCubicActionOut(clickTimes));
					_this.pointerButton.destroy();
					inforDelayShow();
	
				}
				else if (adValue == 3) {
	
					var rotateBy03 = cc.rotateBy(clickTimes, awardAngle03 + 360 * rounds);
					_this.pointer.node.runAction(rotateBy03).easing(cc.easeCubicActionOut(clickTimes));
					_this.pointerButton.destroy();
					inforDelayShow();
	
				}
				else if (adValue == 4) {
	
					var rotateBy04 = cc.rotateBy(clickTimes, awardAngle04 + 360 * rounds);
					_this.pointer.node.runAction(rotateBy04).easing(cc.easeCubicActionOut(clickTimes));
					_this.pointerButton.destroy();
					inforDelayShow();
	
				}
				else if (adValue == 5) {
	
					var rotateBy05 = cc.rotateBy(clickTimes, awardAngle05 + 360 * rounds);
					_this.pointer.node.runAction(rotateBy05).easing(cc.easeCubicActionOut(clickTimes));
					_this.pointerButton.destroy();
					inforDelayShow();
	
				}
				else if (adValue == 6) {
	
					var rotateBy06 = cc.rotateBy(clickTimes, awardAngle06 + 360 * rounds);
					_this.pointer.node.runAction(rotateBy06).easing(cc.easeCubicActionOut(clickTimes));
					_this.pointerButton.destroy();
					inforDelayShow();
	
				}
				else if (adValue == 7) {
	
					var rotateBy07 = cc.rotateBy(clickTimes, awardAngle07 + 360 * rounds);
					_this.pointer.node.runAction(rotateBy07).easing(cc.easeCubicActionOut(clickTimes));
					_this.pointerButton.destroy();
					inforDelayShow();
	
				}
				else if (adValue == 8) {
	
					var rotateBy08 = cc.rotateBy(clickTimes, awardAngle08 + 360 * rounds);
					_this.pointer.node.runAction(rotateBy08).easing(cc.easeCubicActionOut(clickTimes))
					_this.pointerButton.destroy();
					inforDelayShow();
	
	
				}
	
			}
		};
		cc.vv.http.sendRequest("/Prize", data, onCreate);
		console.log(data);

	},

	getPrize:function (awardMapping) {
	
	},

	pointerButtonUpControl: function () {

	},



	// use this for initialization
	onLoad: function () {
		this.pointerButtonClick();

	},

	// called every frame, uncomment this function to activate update callback
	// update: function (dt) {

	// },
});
