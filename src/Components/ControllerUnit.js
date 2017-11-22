import React , { Component } from 'react';

class ControllerUnit extends Component {
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){

		//如果点击的是居中的图片，则翻转图片，否则将图片居中
		if(this.props.arrange.isCenter){
			this.props.inverse()
		}
		else {
			this.props.center();
		}
		e.stopPropagation();
		e.preventDefault();
	}
	render(){
		var arrange = this.props.arrange;
		var controllerUnitClassName = 'controller-unit';
		//如果对应的是居中的图片，显示控制按钮的居中态
		if(arrange.isCenter){
			controllerUnitClassName += ' is-center';
			if(arrange.isInverse){
				controllerUnitClassName += ' is-inverse';
			}
		}
		return (
			<span className = {controllerUnitClassName} onClick = {this.handleClick}></span>
		)
	}
}
export default ControllerUnit;