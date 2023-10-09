import React from "react";
import './header.css';

class header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDowns: false,
      dropDowns: [
        {
          show: false,
          name: "Grouping",
          choices: ["Status", "User", "Priority"],
          selectedValue: 0
        },
        {
          show: false,
          name: "Ordering",
          choices: ["Priority", "Title"],
          selectedValue: 0
        }
      ]
    };
    this.flipShowDropDowns = this.flipShowDropDowns.bind(this);
  }

  notifyparent() {
    var currentState = this.state.dropDowns;
    this.props.parentCallBack(currentState[0].selectedValue,currentState[1].selectedValue)
  }

  flipShowDropDowns() {
    var currentState = this.state;
    this.setState({
      showDropDowns : !currentState.showDropDowns,
      dropDowns: currentState.dropDowns
    })
  }

  selectChoice(dropdownIndex,choiceIndex) {
    var currentState = this.state.dropDowns;
    currentState.forEach((dropdown, index) => {
      if (index === dropdownIndex) {
        dropdown.selectedValue = choiceIndex
      }
    });
    this.setState(currentState)
    this.notifyparent();
  }

  renderdropdowns() {
    return (
      <div className="groupOfdropdown">
        {this.state.dropDowns.map((dropdown, index) => {
          return (
            <div className = "Dropdown">
              <text className="type_drop">{dropdown.name}</text>
              <select onChange = {(e) => {this.selectChoice(index,Number(e.target.value))}}> {dropdown.choices[dropdown.selectedValue]} 
              {dropdown.choices.map(((choice,choiceIndex) => {
                return <option value = {choiceIndex}>{choice}</option>
              }))}</select>
            </div>
          );
        })}
      </div>
    )
  }

  render() {
    return (
      <div className = "MainDropdown">
        <div>
        <div className="mainDropdownButton"><button className="displayIconButton" onClick={this.flipShowDropDowns}>display&nbsp;&nbsp;</button></div>
        </div>
        {this.state.showDropDowns ? this.renderdropdowns() : null }
      </div>
    );
  }
}

export default header;