import React ,{Component} from 'react';

class ImgFigure extends Component { 
	constructor(){
		super()
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		if(this.props.arrange.isCenter){
			this.props.inverse();
		}
		else{
			this.props.center();
		}
		e.stopPropagation();
		e.preventDefault();
	}
	render(){
		var arrange = this.props.arrange;
		var styleObj = {};

		//如果props中指定了图片的位置，则使用
		if(arrange.pos){
			styleObj.left = arrange.pos.left;
			styleObj.top = arrange.pos.top;
		}

		// 如果props中的旋转角度存在且不为0，则使用
		if(arrange.rotate){
			styleObj["transform"] = 'rotate(' + arrange.rotate + 'deg)';
		}

		//保证居中的图片不被覆盖
		if(arrange.isCenter){
			styleObj.zIndex = '11';
		}
		var imgFigureClassName = 'img-figure';
			imgFigureClassName += (arrange.isInverse ? ' is-inverse' : '');

		return(
			<figure className = {imgFigureClassName}
					style = {styleObj}
					ref = "figure"
					onClick = {this.handleClick}
			>
				<img src = {this.props.data.imgUrl}
					 alt = {this.props.data.title}
				/>
				<figcaption >
					<h3 className = 'img-title'>{this.props.data.title}</h3>
					<div className = 'img-back'>
						<p>{this.props.data.desc}</p>
					</div>
				</figcaption>
			</figure>
		)
	}
}
export default ImgFigure;