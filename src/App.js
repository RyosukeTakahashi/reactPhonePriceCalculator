import React, {Component} from 'react';
import './App.css';
import QuestionForm from './QuestionForm'
import {Container, Row, Col} from 'react-grid-system';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header"/>
        
        <div className="App-main">
          
          <Container>
            <Row>
              <Col md={2}/>
              <Col xs={12} sm={12} md={8}>
                <div className="form-box">
                  
                  <div className="App-title">
                    うそっ、私のケータイ料金、高すぎ？
                  </div>
                  <p className="App-intro">
                    ・・・なのかどうかを知りたい方のためのアプリです。<br/><br/>
                    フォームを入力して最後のボタンを押すだけ。<br/>
                    格安SIMだと1,2,4年でどれくらい安くなるか、グラフ付きで分かります。<br/><br/>
                    注意）データは2016年初頭、D社の価格を参照にしてます。<br/>
                    従って今使える正確な数値は出ませんが、おおよその傾向は出ます。<br/>
                    こちらを使ったことによって生じた損失については責任を負いかねます。<br/>
                  </p>
                  
                  <QuestionForm/>
                </div>
              </Col>
            </Row>
          </Container>
          <div className="App-footer">
            The data collected could be used for service improvement but not for personal data collection.
          </div>
        
        </div>
      
      </div>
    );
  }
}

export default App;