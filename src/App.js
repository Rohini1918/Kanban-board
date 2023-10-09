import './App.css';
import NavHeader from './header/header'
import Content from './Content/Content';
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Grouping : 0,
      Ordering : 0
    }
    this.callBack = this.callBack.bind(this);
  }

  callBack = (groupingValue,orderingValue) =>  {
    this.setState({
      Grouping : groupingValue,
      Ordering : orderingValue
    })
  }

  render() {
    return (
      <div>
        <NavHeader parentCallBack =  {this.callBack}/>
        <Content Grouping = {this.state.Grouping} Ordering = {this.state.Ordering}/>
      </div>
    )
  }
}

export default App;
