/**
 * Created by ramun on 2016/11/09.
 */
/* eslint-disable */
import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import AndroidIcon from 'material-ui/svg-icons/hardware/phone-android'

import PaymentChart from './PaymentChart'
import Formsy from 'formsy-react'
import {
  FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
  FormsySelect, FormsyText, FormsyTime, FormsyToggle
} from 'formsy-material-ui/lib';

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
      contractLength: undefined,
      canSubmit: false,
      openModal: false,
      result: {},
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
  
  handleOpen() {
    var result = this.calculatePayment(this.state)
    console.log("below is openModal state")
    console.log(this.state.openModal)
    
    this.setState({
      openModal: true,
      result: result
    })
  }
  
  handleCloseClick() {
    this.setState({
      openModal: false,
    })
    console.log("below is openModal state")
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
      <FormsyText
        type="text"
        name={question.name}
        key={question.title}
        validations={"isNumeric"}
        required
        hintText={question.hintText}
        style={styles.textField}
        onChange={this.handleInputBoxChange.bind(this)}
      />
    )
  }
  
  calculatePayment = (form) => {
    
    var deviceName = form.deviceName;
    var needPhoneNumber = form.needPhoneNumber;
    var talkTime = form.talkTime;
    var dataUsageSize = form.dataUsageSize;
    var contractType = form.contractType;
    var u25 = form.u25;
    var contractLength = form.contractLength;
    
    var devicePrices = [{
      "id": 1,
      "deviceName": "iPhone6S 16GB",
      "docomoDevicePrice": 93312,
      "newContractMonthlyDiscount": 2808,
      "mnpMonthlyDiscount": 3456,
      "expansysDevicePrice": 81875
    }, {
      "id": 2,
      "deviceName": "iPhone6S 64GB",
      "docomoDevicePrice": 99792,
      "newContractMonthlyDiscount": 2538,
      "mnpMonthlyDiscount": 3186,
      "expansysDevicePrice": 94130
    }, {
      "id": 3,
      "deviceName": "iPhone6S 128GB",
      "docomoDevicePrice": 99792,
      "newContractMonthlyDiscount": 1998,
      "mnpMonthlyDiscount": 2646,
      "expansysDevicePrice": 104090
    }, {
      "id": 4,
      "deviceName": "iPhone6S Plus 16GB",
      "docomoDevicePrice": 99792,
      "newContractMonthlyDiscount": 2538,
      "mnpMonthlyDiscount": 3186,
      "expansysDevicePrice": 91835
    }, {
      "id": 5,
      "deviceName": "iPhone6S Plus 64GB",
      "docomoDevicePrice": 99792,
      "newContractMonthlyDiscount": 1998,
      "mnpMonthlyDiscount": 2646,
      "expansysDevicePrice": 108685
    }, {
      "id": 6,
      "deviceName": "iPhone6S Plus 128GB",
      "docomoDevicePrice": 99792,
      "newContractMonthlyDiscount": 1458,
      "mnpMonthlyDiscount": 2106,
      "expansysDevicePrice": 122470
    }, {
      "id": 7,
      "deviceName": "XperiaZ5",
      "docomoDevicePrice": 93312,
      "newContractMonthlyDiscount": 1755,
      "mnpMonthlyDiscount": 3456,
      "expansysDevicePrice": 68855
    }, {
      "id": 8,
      "deviceName": "XperiaZ5 Compact",
      "docomoDevicePrice": 84888,
      "newContractMonthlyDiscount": 1890,
      "mnpMonthlyDiscount": 1890,
      "expansysDevicePrice": 53300
    }, {
      "id": 9,
      "deviceName": "XperiaZ5 Premium",
      "docomoDevicePrice": 93312,
      "newContractMonthlyDiscount": 918,
      "mnpMonthlyDiscount": 2248,
      "expansysDevicePrice": 73800
    }];
    
    //配列から特定のKeyが特定の値を持つオブジェクトを探し、そのオブジェクトの別のkeyの値を出す。
    let requestedDevicePrices = devicePrices.filter((devicePrice) => {
      return devicePrice.deviceName === deviceName
    })[0];
    
    var docomoPrice = requestedDevicePrices.docomoDevicePrice;
    var expansysPrice = requestedDevicePrices.expansysDevicePrice;
    var supportNewContract = requestedDevicePrices.newContractMonthlyDiscount;
    var supportMNP = requestedDevicePrices.mnpMonthlyDiscount;
    var changeDiscount = 0; //のりかえ割
    var deviceDiscount = 0; //端末割引
    var studentDiscount = 0; //学割
    var thankYouDiscount = 0; //長期間利用による割引
    
    var docomoDescription = "ドコモに" + contractType + "で申し込み、";
    var simDescription = "格安SIM（IIJmio）で";
    
    var support;
    
    if (contractType === "新規" || contractType === "機種変更") {
      support = supportNewContract; //monthly
    } else if (contractType === "MNP（のりかえ）") {
      support = supportMNP;
      deviceDiscount = 21600
    }
    
    if (/iPhone/.test(deviceName) && contractType === "MNP（のりかえ）") {
      changeDiscount = 1350; //monthly
    }
    
    if (/iPhone/.test(deviceName) === false && u25 === "２５歳以下です") {
      if (dataUsageSize >= 5) {
        studentDiscount = 800; //monthly
        // var discount25 = "U25割引を適用して、"; //message
      }
    }
    console.log("契約は" + contractType);
    
    var basicPrice;
    if (talkTime < 30) {
      basicPrice = 1700;
      docomoDescription += "カケホーダイライトプラン、"
      
    } else {
      basicPrice = 2700; //データプランのみとなるのでdocomoDescription説明不要
    }
    console.log("基本料は" + basicPrice + "通話時間は" + talkTime);
    
    var dataPriceSim = 0;
    
    if (dataUsageSize <= 3) {
      dataPriceSim = 900;
      simDescription += "3GBのSIM"
      
    } else if (dataUsageSize <= 5) {
      dataPriceSim = 1520;
      simDescription += "5GBのSIM"
      
    } else if (dataUsageSize > 5) {
      simDescription += "10GBのSIM";
      dataPriceSim = 2560
    }
    
    if (needPhoneNumber === true) {
      dataPriceSim += 700;
      simDescription += "（090番号付き）を契約して、Expansysで端末を買った場合の推移です。"
    }
    
    //docomo dataPrice
    var dataPrice = 0;
    
    if (dataUsageSize <= 3 && basicPrice === 2700) {
      dataPrice = 3500;
      docomoDescription += "データSパック（2GB）を契約した場合の推移です。"
    } else if (dataUsageSize <= 3 && basicPrice === 1700) {
      dataPrice = 5000;
      //dataUsageSize = 5;
      docomoDescription += "データMパック（5GB）を契約した場合の推移です。"
    } else if (dataUsageSize <= 5) {
      dataPrice = 5000;
      docomoDescription += "データMパック（5GB）を契約した場合の推移です。"
    } else if (dataUsageSize <= 8) {
      dataPrice = 6700;
      docomoDescription += "データLパック（8GB）を契約した場合の推移です。"
      
    } else if (dataUsageSize > 8) {
      dataPrice = 9500;
      docomoDescription += "データフラットを契約した場合の推移です。"
    }
    
    console.log("docomoデータ通信料金：" + dataPrice);
    
    //thankYouDiscount for heavy user
    if (/iPhone/.test(deviceName)) {
      if (contractLength === "10~15年") {
        if (dataPrice >= 5000) {
          thankYouDiscount = 600
        }
      } else if (contractLength === "15年以上") {
        if (dataPrice >= 5000) {
          thankYouDiscount = 800
        } else {
          thankYouDiscount = 600
        }
      }
    } else {//Android
      if (contractLength === "10~15年") {
        if (dataPrice >= 5000) {
          thankYouDiscount = 400 + 600
        }
      } else if (contractLength === "15年以上") {
        if (dataPrice >= 5000) {
          thankYouDiscount = 400 + 800
        } else {
          thankYouDiscount = 400 + 600
        }
      }
    }
    
    var tax = 1.08;
    
    var monthlyPaymentDocomo = (docomoPrice - deviceDiscount) / 24 +
      (basicPrice + dataPrice + 300 -
      changeDiscount - studentDiscount - thankYouDiscount) * tax - support;
    var oneYearPaymentDocomo = monthlyPaymentDocomo * 12;
    var twoYearPaymentDocomo = monthlyPaymentDocomo * 24;
    var fourYearPaymentDocomo = monthlyPaymentDocomo * 48;
    
    var initialCost = 3160 + expansysPrice;
    var monthlyPaymentSim = Math.floor(dataPriceSim * tax);
    var oneYearPaymentSim = monthlyPaymentSim * 12 + initialCost;
    var twoYearPaymentSim = monthlyPaymentSim * 24 + initialCost;
    var threeYearPaymentSim = monthlyPaymentSim * 36 + initialCost;
    var fourYearPaymentSim = monthlyPaymentSim * 48 + initialCost;
    
    var buy;
    var fourYearDifference = fourYearPaymentDocomo - fourYearPaymentSim;
    
    if ((fourYearDifference) < 30000) {
      buy = "WiiU買えますね。"
    } else if ((fourYearDifference) < 50000) {
      buy = "安いクロスバイク買えますね。"
    } else if ((fourYearDifference) < 70000) {
      buy = "4Kの液晶買えますね。"
    } else if ((fourYearDifference) < 90000) {
      buy = "iPhone6 Plusが買えます。"
    } else if ((fourYearDifference) < 110000) {
      buy = "安いロードバイクが買えます。"
    } else if ((fourYearDifference) < 120000) {
      buy = "結構いいMacbook Proが買えます。"
    } else if ((fourYearDifference) < 150000) {
      buy = "真空チルド R-F520E（めちゃいい冷蔵庫）が買えます。"
    } else if ((fourYearDifference) > 150000) {
      buy = "一人暮らしの準備ができそう。"
    }
    
    var chartData = [
      {name: '0ヶ月目', docomo: 0, simFree: initialCost},
      {name: '12ヶ月目', docomo: oneYearPaymentDocomo, simFree: oneYearPaymentSim},
      {name: '24ヶ月目', docomo: twoYearPaymentDocomo, simFree: twoYearPaymentSim},
      {name: '36ヶ月目', docomo: oneYearPaymentDocomo * 3, simFree: threeYearPaymentSim},
      {name: '48ヶ月目', docomo: fourYearPaymentDocomo, simFree: fourYearPaymentSim},
    ];
    
    var result = {
      deviceName: deviceName,
      chartData: chartData,
      fourYearDifference: fourYearDifference,
      buy: buy,
      docomoDescription: docomoDescription,
      simDescription: simDescription,
      oneYearPaymentSim: oneYearPaymentSim,
      oneYearPaymentDocomo: oneYearPaymentDocomo
    };
    
    console.log(result);
    
    return result
  };
  
  
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
      
      if (question.type) {
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
