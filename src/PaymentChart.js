// eslint-disable-next-line
import React, {Component, PropTypes} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CustomizedAxisTick from './CustomizedAxisTick'
import CustomizedLabel from './CustomizedLabel'

class PaymentChart extends Component {
  
  //cst for constructor
  //sfc for stateless functional component
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      result: {},
    };
  }
  
  handleClose = () => {
    // this.setState({open: false});
    this.props.onCloseClick();
    console.log("close state")
  };
  
  
  render() {
    
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
    
    const customContentStyle = {
      width: '100%',
      maxWidth: 'none',
    };
    
    
    return (
      <MuiThemeProvider>
        <div className="chart">
          
          <Dialog
            title="比較結果"
            actions={actions}
            open={this.props.open}
            contentStyle={customContentStyle}
            autoScrollBodyContent={true}
            autoDetectWindowHeight={true}
          >
            <ResponsiveContainer minWidth={300} minHeight={300}>
              <LineChart data={this.props.result.chartData}
                         margin={{top: 5, right: 30, left: 0, bottom: 5}}>
                <XAxis dataKey="name" height={80} tick={<CustomizedAxisTick/>} padding={{left: 20, right: 20}}/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="simFree" stroke="#8884d8" label={<CustomizedLabel/>}/>
                <Line type="monotone" dataKey="docomo" stroke="#82ca9d" label={<CustomizedLabel/>}/>
              </LineChart>
            </ResponsiveContainer>
            <br/>
            <div>
              <dl style={{lineHeight: "150%"}}>
                <dt>simFree:</dt>
                <dd>{this.props.result.simDescription}</dd>
                <dt>docomo:</dt>
                <dd>{this.props.result.docomoDescription}</dd>
              </dl>
              {this.props.result.fourYearDifference + "円 の違いが4年間で発生します。"}<br/><br/>
              {"格安SIMを使えば、浮いた" + this.props.result.fourYearDifference + "円で、" + this.props.result.buy}
            </div>
          
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

PaymentChart.propTypes = {};
PaymentChart.defaultProps = {};

export default PaymentChart;

