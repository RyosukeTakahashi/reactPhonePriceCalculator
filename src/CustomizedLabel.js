// eslint-disable-next-line
import React, {Component, PropTypes} from 'react';

class CustomizedLabel extends Component {
  
  //cst for constructor
  //sfc for stateless functional component
  
  
  render() {
    const {x, y, stroke, payload} = this.props;
    
    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{payload.value}</text>
  }
  
  
}

CustomizedLabel.propTypes = {};
CustomizedLabel.defaultProps = {};

export default CustomizedLabel;

