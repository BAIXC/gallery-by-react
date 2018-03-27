import React , {Component} from 'react';

import ImgFigure from './ImgFigure';
import ControllerUnit from './ControllerUnit';


/* 将图片数据中的fileName转化成图片路径 */
let imgDatas_arr = require('../data/imageData.json')

let imgDatas = imgDatas_arr.map(function(singleImgData,index){
	singleImgData.imgUrl = require('../img/' + singleImgData.fileName);
	singleImgData.key = index;
	return singleImgData;
})

/*
 * 获取某个区间内的随机值
 */
function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

/*
 *获取0~30之间任意的一个正负值
 */
function get30DegRandom() {
	return (Math.random() > 0.5 ? '' : '-') + (Math.ceil(Math.random() * 30))
}

class Gallery extends Component {
	constructor(){
		super();
		//确定各区域的取值范围
		this.Range = {
			centerPos : { //中心区域的位置
				left : 0,
				top : 0
			},

			hPosRange : { //左右区域的取值范围
				leftSecX : [0,0],
				rightSecX: [0,0],
				y: [0,0]
			},

			vPosRange : { //上分区的取值范围
				x : [0,0],
				topY : [0,0]
			}
		}
		this.state = {
			imgArrangeArr : [
				/* {
				 	pos : {
				 		left : '0',
				 		right : '0'
				 	},
				 	rotate : '0', //图片旋转角度
				  	isInverse : false, //图片正反面
				  	isCenter: false
				}*/ 
			],
			initImgIndex : 13
		}
	}
	//组件加载进来之后计算每张图片的位置范围
	componentDidMount(){
		//获取舞台大小
		var stageDom = this.refs.stage,
			stageW = stageDom.scrollWidth,
			stageH = stageDom.scrollHeight,
			halfStageW = Math.ceil(stageW/2),
			halfStageH = Math.ceil(stageH/2);
			
		//获取每一张图片的大小
		var imgFigureDom = this.refs.imgFigure0.refs.figure,
			imgW = imgFigureDom.scrollWidth,
			imgH = imgFigureDom.scrollHeight,
			halfImgW = Math.ceil(imgW/2),
			halfImgH = Math.ceil(imgH/2);
			
		//计算中心点的位置
		this.Range.centerPos.left = halfStageW - halfImgW;
		this.Range.centerPos.top = halfStageH - halfImgH;

		//计算左右侧区域图片位置的取值范围
        this.Range.hPosRange.leftSecX[0] = -halfImgW;
        this.Range.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Range.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Range.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Range.hPosRange.y[0] = -halfImgH;
        this.Range.hPosRange.y[1] = stageH - halfImgH;

        //计算上侧区域图片位置的取值范围
        this.Range.vPosRange.topY[0] = -halfImgH;
        this.Range.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Range.vPosRange.x[0] = halfStageW - imgW;
        this.Range.vPosRange.x[1] = halfStageW;
        
		this.reArrange(this.state.initImgIndex);
	}

	//组件加载进来之前检查state是否存在，不存在就初始化state
	componentWillMount(){
		for(var i=0;i<imgDatas.length;i++){
			if(!this.state.imgArrangeArr[i]){
				let temp_arr = this.state.imgArrangeArr;
				temp_arr[i] = {
					pos : {
						left : '20px',
						top  : '10px'
					},
					rotate : 0,
					isInverse : false,
					isCenter: true
				};
				this.setState({imgArrangeArr : temp_arr})
			}
			
		}
	}
	/*
	*翻转图片
	*此处使用闭包保存index
	*@param index 正在被执行inverse操作的那张图片在imgArrangeArr中所对应的索引
	*/
	inverse(index){
		return function(){
			var imgArrangeArr = this.state.imgArrangeArr;
			imgArrangeArr[index].isInverse = !imgArrangeArr[index].isInverse;
			this.setState({imgArrangeArr:imgArrangeArr});
		}.bind(this);
	}

	/*
	* 居中对应index图片
	*@param index 需要被居中的图片的
	*/
	center(index){
		return function(){
			this.reArrange(index);
		}.bind(this);
	}

	/*
	*重新布局所有图片
	*@param centerIndex 指定哪张图片居中
	*/
	reArrange(centerIndex) {
		//先定义一些需要用到的值
		var imgArrangeArr = this.state.imgArrangeArr,
		    Range = this.Range,
		    centerPos = Range.centerPos,
		    hPosRange = Range.hPosRange,
		    vPosRange = Range.vPosRange,
		    hPosRangeLeftSecX = hPosRange.leftSecX,
		    hPosRangeRightSecX = hPosRange.rightSecX,
		    vPosRangeTopY = vPosRange.topY,
		    vPosRangeX = vPosRange.x,

		    imgsArrangeTopArr = [],
		    //中心图片的状态信息
		    imgsArrangeCenterArr = imgArrangeArr.splice(centerIndex, 1),
		    //上侧图片的索引信息（先随便赋一个值，这里赋为0，不赋值也行）
		    topImgSpliceIndex = 0,
		    //上侧图片的数量，0或者1(取一个或者不取)
		    topImgNum = Math.floor(Math.random() * 2);

		    //获取上侧图片的状态信息
		    topImgSpliceIndex = Math.ceil(Math.random() * (imgArrangeArr.length - topImgNum));
		    imgsArrangeTopArr = imgArrangeArr.splice(topImgSpliceIndex, topImgNum);
	        //布局上侧图片
	        imgsArrangeTopArr.forEach(function (value, index) {
	    		imgsArrangeTopArr[index] = {
		    		pos : {
						top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
						left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
		    		},
		    		rotate : get30DegRandom(),
					isInverse: imgArrangeArr[index].isInverse,
					isCenter: false

	    		}
	        });

		    //布局中心图片(中心图片不旋转)
		    imgsArrangeCenterArr[0] = {
				pos: centerPos,
				rotate : 0,
				isInverse: imgsArrangeCenterArr[0].isInverse,
				isCenter: true
		    }

		    //布局左右两侧的图片
		    for (var i = 0, j = imgArrangeArr.length, k = j / 2; i < j; i++) {
				var hPosRangeLORX = 0; //左区域或者右区域的取值范围

				//前半部分布局左边，右半部分布局右边
				if (i < k) {
					hPosRangeLORX = hPosRangeLeftSecX;
				} 
				else {
					hPosRangeLORX = hPosRangeRightSecX;
				}
				imgArrangeArr[i] = {
					pos : {
						top: getRangeRandom(hPosRange.y[0], hPosRange.y[1]),
						left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
					},
					rotate : get30DegRandom(),
					isInverse: imgArrangeArr[i].isInverse,
					isCenter: false
				};
		    }

		    //把取出来的图片放回去
		    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
				imgArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
			}
			imgArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
			

			this.setState({
				imgArrangeArr: imgArrangeArr
			});
	}

	render(){
		/* 以数组形式生成多个子组件 */
		//生成图片组件（数组形式）
		let imgFigures = imgDatas.map(function(value,index){
			return <ImgFigure 
					data = {value}
					key = {value.key}
					ref = {'imgFigure' + index}
					arrange = {this.state.imgArrangeArr[index]} 
					inverse = {this.inverse(index)}
					center = {this.center(index)}/>
		}.bind(this));

		//生成控制组件（数组形式）
		let ControllerUnits = imgDatas.map(function(value,index){
			return <ControllerUnit
					key = {index}
					arrange = {this.state.imgArrangeArr[index]} 
					inverse = {this.inverse(index)}
					center = {this.center(index)}
					/>
		}.bind(this))
		return(
				<section className="stage" ref = "stage">
					<section className="img-sec">
						 {imgFigures}
					</section>
					<nav className="controller-nav">
						{ControllerUnits}
					</nav>
				</section>
			)
		}
}
export default Gallery;