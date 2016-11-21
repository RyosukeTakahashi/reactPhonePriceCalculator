import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import AndroidIcon from 'material-ui/svg-icons/hardware/phone-android'
import {orange500, blue500} from 'material-ui/styles/colors';

import PaymentChart from './PaymentChart'
import Formsy from 'formsy-react'
// eslint-disable-next-line
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
  FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';


import Calculator from './Calculator'

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
    options: [],
    hintText: "半角数字のみ入力"
  },
  {
    type: "text",
    name: "dataUsageSize",
    title: "月のデータ通信量は何GB欲しいですか？",
    options: [],
    hintText: "半角数字のみ入力"
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
  },
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },
  
};


class QuestionForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      contractType: questions[0].options[0],
      deviceName: questions[1].options[0],
      needPhoneNumber: false,
      talkTime: 0,
      dataUsageSize: 0,
      u25: false,
      contractLength: questions[6].options[0],
      canSubmit: true,
      openModal: false,
      result: {},
    };
  }
  
  handleRadioChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  
  handleCheckBoxChange(e) {
    this.setState({
      [e.target.name] : e.target.checked
    })
  }
  
  handleInputBoxChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  
  handleOpen() {
    console.log(this.state);
    const calc = new Calculator('計算機');
    var result = calc.calculatePayment(this.state);
    
    this.setState({
      openModal: true,
      result: result
    })
  }
  
  handleCloseClick() {
    this.setState({
      openModal: false,
    });
    console.log("below is openModal state");
    console.log(this.state.openModal)
  }
  
  
  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }
  
  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }
  
  
  radioButton(question) {
    return (
      <RadioButtonGroup
        name={question.name}
        defaultSelected={question.options[0]}
        onChange={this.handleRadioChange.bind(this)}
      >
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
      <FormsyText
        type="text"
        name={question.name}
        key={question.title}
        validations={"isNumeric"}
        errorStyle={styles.errorStyle}
        hintText={question.hintText}
        defaultValue={0}
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
          questionComponent = this.radioButton(question);
          break;
        
        case "checkbox":
          questionComponent = this.checkBox(question);
          break;
        
        case "text":
          questionComponent = this.textField(question);
          break;
        
        default:
          break;
      }
      
      return (
        <div className="question" key={index} style={styles.question}>
          <div className="questionTitle">
            {question.title}
          </div>
          {questionComponent}
        </div>
      )
    });
    
    
    return (
      <MuiThemeProvider>
        <div className="QuestionForm">
          <Formsy.Form
            onValid={this.enableButton.bind(this)}
            onInvalid={this.disableButton.bind(this)}
          >
            {questionNodes}
            <RaisedButton
              onTouchTap={this.handleOpen.bind(this)}
              type="submit"
              label="比較結果を出す"
              labelPosition="before"
              primary={true}
              icon={<AndroidIcon/>}
              style={{marginTop: "30px"}}
              disabled={!this.state.canSubmit}
            />
            
            <PaymentChart
              open={this.state.openModal}
              result={this.state.result}
              onCloseClick={this.handleCloseClick.bind(this)}
            />
          
          </Formsy.Form>
        
        </div>
      </MuiThemeProvider>
    
    );
  }
}

QuestionForm.propTypes = {};
QuestionForm.defaultProps = {};

export default QuestionForm;
