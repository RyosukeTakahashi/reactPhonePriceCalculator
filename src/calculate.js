/**
 * Created by ramun on 2016/11/18.
 */
function calculatePayment() {
  
  //var form = this.props.form;
  
  var form = {
    contractLength: "10年未満",
    contractType: "新規",
    dataUsageSize: 3,
    deviceName: "iPhone6S 16GB",
    needPhoneNumber: true,
    talkTime: 10,
    u25: true
    
  };
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
      var discount25 = "U25割引を適用して、"; //message
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
    
  } else if (dataUsageSize <= 10) {
    simDescription += "10GBのSIM";
    dataPriceSim = 2560
  }
  
  if (needPhoneNumber === "090番号が必要") {
    dataPriceSim += 700;
    simDescription += "（090番号付き）を契約して、Expansysで端末を買った場合の価格です。"
  }
  
  //docomo dataPrice
  var dataPrice = 0;
  
  if (dataUsageSize <= 3 && basicPrice === 2700) {
    dataPrice = 3500;
    docomoDescription += "データSパック（2GB）を契約した場合の価格です。"
  } else if (dataUsageSize <= 3 && basicPrice === 1700) {
    dataPrice = 5000;
    //dataUsageSize = 5;
    docomoDescription += "データMパック（5GB）を契約した場合の価格です。"
  } else if (dataUsageSize <= 5) {
    dataPrice = 5000;
    docomoDescription += "データMパック（5GB）を契約した場合の価格です。"
  } else if (dataUsageSize <= 8) {
    dataPrice = 6700;
    docomoDescription += "データLパック（8GB）を契約した場合の価格です。"
    
  } else if (dataUsageSize > 8) {
    dataPrice = 9500
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
  var threeYearPaymentSim = monthlyPaymentSim * 36 + initialCost
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
    buy: buy,
    docomoDescription: docomoDescription,
    simDescription: simDescription,
    oneYearPaymentSim: oneYearPaymentSim,
    oneYearPaymentDocomo: oneYearPaymentDocomo
  }
  
  console.log(result)
  
  return result
}


calculatePayment()
