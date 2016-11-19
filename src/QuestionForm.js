/**
 * Created by ramun on 2016/11/09.
 */
/* eslint-disable */
import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PaymentChart from './PaymentChart'
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
  FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';

const questions = [
  
  {
    type: "radio",
    title: "契約形態",
    name: "contractType",
    options: [
      "新規",
      "MNP（のりかえ）",
      "機種変更",
    ]
  },
  {
    type: "radio",
    title: "欲しい機種をお選びください。",
    name: "deviceName",
    options: [
      "iPhone6S 16GB",
      "iPhone6S 64GB",
      "iPhone6S 128GB",
      "iPhone6S Plus 16GB",
      "iPhone6S Plus 64GB",
      "iPhone6S Plus 128GB",
      "XperiaZ5",
      "XperiaZ5 Compact",
      "XperiaZ5 Premium"
    ]
  },
  {
    type: "checkbox",
    title: "090,080 番号は必要ですか？",
    name: "needPhoneNumber",
    options: [
      "090番号が必要",
    ]
  },
  {
    type: "text",
    name: "talkTime",
    title: "090,080番号を使った通話時間は月、何分くらいですか？ ？",
    options: []
  },
  {
    type: "text",
    name: "dataUsageSize",
    title: "月のデータ通信量は何GB欲しいですか？",
    options: []
  },
  {
    type: "checkbox",
    name: "u25",
    title: "25歳以下の方は、チェックを入れてください",
    options: [
      "25歳以下です",
    ]
  },
  {
    type: "radio",
    name: "contractLength",
    title: "Docomoとの今までの継続契約期間は",
    options: [
      "10年未満",
      "10～15年",
      "15年以上",
    ]
  },


];


const styles = {
  block: {
    maxWidth: 250,
  },
  question: {
    padding: "16px 0 10px"
  },
  radioButton: {
    marginTop: 17,
    marginLeft: 17,
    marginBottom: 16
  },
  checkbox: {
    marginLeft: 17,
    marginTop: 17,
    marginBottom: 16
  },
  textField: {
    marginLeft: 17,
    marginTop: 6,
    marginBottom: 16
  }
  
};


class QuestionForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      contractType: undefined,
      deviceName: undefined,
      needPhoneNumber: false,
      talkTime: 0,
      dataUsageSize: 0,
      u25: false,
      contractLength: undefined
    };
  }
  
  handleRadioChange(e) {
    this.state[e.target.name] = e.target.value
  }
  
  handleCheckBoxChange(e) {
    this.state[e.target.name] = e.target.checked
  }
  
  handleInputBoxChange(e) {
    this.state[e.target.name] = e.target.value
  }
  
  radioButton(question) {
    return (
      <RadioButtonGroup name={question.name}
                        onChange={this.handleRadioChange.bind(this)}>
        {question.options.map((option, index) => {
          return (
            <RadioButton
              value={option}
              label={option}
              style={styles.radioButton}
              key={index}
            />
          )
        })}
      </RadioButtonGroup>
    )
  }
  
  checkBox(question) {
    return (
      question.options.map((option, index) => {
        return (
          <Checkbox
            name={question.name}
            label={option}
            style={styles.checkbox}
            key={index}
            onCheck={this.handleCheckBoxChange.bind(this)}
          />
        )
      })
    )
  }
  
  textField(question) {
    return (
      <TextField
        type="text"
        name={question.name}
        key={question.title}
        hintText="Your Answer"
        style={styles.textField}
        onChange={this.handleInputBoxChange.bind(this)}
      />
    )
  }
  
  render() {
    
    let questionNodes = questions.map((question, index) => {
      
      var questionComponent;
      
      switch (question.type) {
        case "radio":
          questionComponent = this.radioButton(question)
          break;
        
        case "checkbox":
          questionComponent = this.checkBox(question)
          break;
        
        case "text":
          questionComponent = this.textField(question)
          break;
      }
      
      var requiredAsterisk;
      
      if(question.type){
        requiredAsterisk
      }
      
      return (
        <div className="question" key={index} style={styles.question}>
          <div className="questionTitle">
            {question.title}
          </div>
          {questionComponent}
        </div>
      )
    })
    
    
    return (
      <MuiThemeProvider>
        <div className="QuestionForm">
          {questionNodes}
          <PaymentChart open={false} form={this.state}/>
        </div>
      </MuiThemeProvider>
    
    );
  }
}

QuestionForm.propTypes = {};
QuestionForm.defaultProps = {};

export default QuestionForm;
