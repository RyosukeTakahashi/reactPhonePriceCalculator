// eslint-disable-next-line
import React, {Component, PropTypes} from 'react';

class CustomizedAxisTick extends Component {
  
  //cst for constructor
  //sfc for stateless functional component
  
  render() {
    
    const {x,y,payload} = this.props
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}

CustomizedAxisTick.propTypes = {};
CustomizedAxisTick.defaultProps = {};

export default CustomizedAxisTick;
