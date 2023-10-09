import React, { Component } from 'react';
import './ColumnTypeComponent.css';
import Cautionary from '../icons/cautionary.png'
import Plus from '../icons/plus.png'
import ThreeDots from '../icons/three_dots.png'
import Human from '../icons/human.jpeg'

class StatusTypeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            titles: [],
            dataList: [],
            icons: [],
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                titles: this.props.titles,
                dataList: this.props.data,
                icons: this.props.icons,
            })
        }
    }

    renderData(index) {
        var data = this.state.dataList[index];
        return (<div>
            {data.map(value => {
                return <div id="individualBox">
                    <text>{value.id}</text>&nbsp;&nbsp;
                    <img className = "Human_text" src={Human} alt=''/>
                    <br/>
                    <text>{value.title.substring(0,40)}....</text><br /><br />
                    <div className='cautionary_f'>
                    <img className="cau" src={Cautionary} alt = ""></img>&nbsp;&nbsp;
                    <text>{value.tag[0]}</text>
                    </div>
                </div>
            })}
        </div>)
    }

    renderColumn(title, index) {
        return (<div id="CollectionBoxes">
            <div id="imageAndTitle">
                <img src={this.state.icons[index]} alt="" />
                <h4 id="individualElements"> {title} {this.state.dataList[index].length}</h4>
                <div className='Plus_Three'>
                <img className='plus' src={Plus} alt="" />
                <img className='three_d'src={ThreeDots} alt="" />
                </div>
            </div>
            {this.renderData(index)}
        </div>)
    }

    render() {
        return (
            <div className='row-items'>
                {this.state.titles.map((title, index) => {
                    return this.renderColumn(title, index)
                })}
            </div>
        )
    }

}

export default StatusTypeComponent;