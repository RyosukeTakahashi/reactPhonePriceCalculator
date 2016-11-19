// eslint-disable-next-line
import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import AddIcon from 'material-ui/svg-icons/av/playlist-add'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

class TaskForm extends Component {
  
  //cst for constructor
  //sfc for stateless functional component

  constructor(props) {
    super(props);
    this.state = {taskName:''};
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputBoxChange = this.handleInputBoxChange.bind(this)
  }

  handleInputBoxChange(e){
    this.setState({taskName: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    let taskName = this.state.taskName.trim();
    if(!taskName){
      return
    }
    //propsを使って下位階層のコンポーネントにfuncを持ってきている。これで、上位階層が（Appクラス）持っているstateを更新
    this.props.onTaskSubmit({
      taskName: taskName,
      id: Date.now,
      completed: false
    });
    this.setState({taskName:''});
  }

  //left 34px
  render() {
    return (
      <form className="TaskForm" onSubmit={this.handleSubmit}>
        <MuiThemeProvider muiTheme={getMuiTheme({})}>
          <TextField
            type="text"
            placeholder="New Task name"
            value={this.state.taskName}
            onChange={this.handleInputBoxChange}
            style={{
            marginLeft:"58px",
            width:"240px"}}
            name="addTask"
          />
        </MuiThemeProvider>

        <MuiThemeProvider>
          <RaisedButton
            type="submit"
            label="Add Task"
            labelPosition="before"
            icon={<AddIcon />}
            style={{marginLeft:"24px"}}
          />
        </MuiThemeProvider>


      </form>
    );
  }
}

//TaskForm.propTypes = {};
//TaskForm.defaultProps = {};

export default TaskForm;
