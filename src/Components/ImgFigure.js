import React ,{Component} from 'react';

class ImgFigure extends Component {
	render(){
		return(
			<figure className = 'img-figure'
					style = {this.props.inlineStyle}
					ref = "figure"
			>
				<img src = {this.props.data.imgUrl}
					 alt = {this.props.data.title}
				/>
				<figcaption className = 'img-title'>
					{this.props.data.title}
				</figcaption>
			</figure>
		)
	}
}
export default ImgFigure;