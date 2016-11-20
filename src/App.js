import React, {Component} from 'react';
import './App.css';
import QuestionForm from './QuestionForm'


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header" />
        
        <div className="App-main">
          
          <div className="form-box">
            
            <div className="App-title">
              うそっ？ケータイ料金比較
            </div>
            
            <p className="App-intro">
              キャリアで買うのと、SIMフリーで買うのとでは、どちらがお得か、計算します。<br/><br/>
              {/*ご利用の際、こちらにデータが送られ保存されます。今後のサービス向上のために利用させていただく場合がございます。それに同意できる方のみ、ご利用ください。*/}
            </p>
            
            <QuestionForm/>
          </div>
          
          <div className="App-footer">
            The data collected could be used for service improvement but not for personal data collection.
          </div>
        
        </div>
      
      </div>
    );
  }
}

export default App;