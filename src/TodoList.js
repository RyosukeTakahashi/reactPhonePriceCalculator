// eslint-disable-next-line
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import CheckboxIconChecked from 'material-ui/svg-icons/toggle/check-box'
import CheckboxIconUnchecked from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import IconButton from 'material-ui/IconButton'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const muiTheme = getMuiTheme({

})


class TodoList extends Component {
  
  handleDeleteButtonClick(todoId){
    // propsを使って下位階層のコンポーネントにfuncを持ってきている。
    // これで、上位階層が（Appクラス）持っているstateを更新
    console.log("Delete button clicked. Task ID: " + todoId)
    this.props.onDeleteButtonClick(todoId)
  }

  handleDoneButtonClick(todoId){
    console.log("Done button clicked. Task ID: " + todoId)
    this.props.onDoneButtonClick(todoId)
  }

  handleInputBoxClick(todoId){
    console.log("Input box clicked. Task ID: " + todoId)
    this.props.onInputBoxClick(todoId)
  }

  handleInputBoxChange(todoId, event){
    console.log("now editing")
    this.props.onTaskNameEdit(todoId, event.target.value)
    console.log(event.target.value)
  }
  

  render() {

    let todoNodes = this.props.todos.map((todo) => {

      let checkBoxIcon = todo.completed ? <CheckboxIconChecked /> : <CheckboxIconUnchecked />
      let lineThrough = {
        textDecoration: "line-through",
      };
      return (

          <MuiThemeProvider muiTheme={muiTheme} key={todo.id}>
            <div key={todo.id}>
            <IconButton
              onClick={() => {this.handleDoneButtonClick(todo.id)}}
              style={{top: "6px"}}
            >
              {checkBoxIcon}
            </IconButton>
          

            <TextField
              type="text"
              value={todo.taskName}//ここに + して何かを加えると、変化を検知してレンダリングした際文字列が足される。
              onClick={() =>{this.handleInputBoxClick(todo.id)}}
              onChange={this.handleInputBoxChange.bind(this, todo.id)}
              inputStyle={todo.completed ? lineThrough : null}
              key={todo.id}
              id={String(todo.id)}
            />
              
            <RaisedButton
              onClick={() => {this.handleDeleteButtonClick(todo.id)}}
              label="Delete"
              labelPosition="before"
              icon={<DeleteIcon />}
              primary={true}
              style={{marginLeft:"18px"}}
            />
            </div>
  
          </MuiThemeProvider>


      );
    });

    return (
      <div className="TodoList">
        {todoNodes}
      </div>
    );
  }
}

TodoList.propTypes = {};
TodoList.defaultProps = {};

export default TodoList;