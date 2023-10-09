import React, { Component } from 'react';
import ColumnComponent from '../Column/ColumnTypeComponent';
import axios from 'axios';
import Backlog from '../icons/backlog.png'
import Todo from '../icons/todo.jpeg'
import Inprogress from '../icons/Inprogress.png'
import Done from '../icons/done.png'
import Cancelled from '../icons/canceled.jpg'
import Human from '../icons/human.jpeg'
import NoPriority from '../icons/no_priority.jpg'
import Urgent from '../icons/urgentjpg.jpg'
import High from '../icons/high.png'
import Medium from '../icons/medium.png'
import Low from '../icons/low.png'
import './Content.css';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            tickets: [],
            groupingType: this.props.Grouping,
            orderingType: this.props.Ordering,
            titles: ["", "", "", "", ""],
            data: [[], [], [], [], []],
            icons: ["", "", "", "", ""],
        }
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        var currentState = this.state;
        if (prevProps.Grouping !== this.props.Grouping) {
            this.FilterDataByGrouping(this.props.Grouping, currentState);
            this.sortDataByOrdering(currentState.orderingType, currentState);
            currentState.groupingType = this.props.Grouping;
            this.setState(currentState);
        }
        if (prevProps.Ordering !== this.props.Ordering) {
            this.sortDataByOrdering(this.props.Ordering, currentState)
            currentState.orderingType = this.props.Ordering;
            this.setState(currentState);
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    sortDataByOrdering(orderingType, currentState) {
        currentState.data.forEach((data) => {
            if (orderingType === 0) {
                data.sort((a, b) => ((a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0)))
            } else if (orderingType === 1) {
                data.sort((a, b) => ((a.title > b.title) ? 1 : ((a.title < b.title) ? -1 : 0)))
            }
        })
    }

    FilterDataByGrouping(groupingType, currentState) {

        if (groupingType === 0) {
            currentState.titles = ["Backlog", "Todo", "In progress", "Done", "Cancelled"]
            currentState.data = [[], [], [], [], []]
            currentState.icons = [Backlog, Todo, Inprogress, Done, Cancelled]
            currentState.tickets.forEach((ticket) => {
                let index = currentState.titles.findIndex((title) => title === ticket.status)
                currentState.data[index].push(ticket)
            })
        }
        else if (groupingType === 1) {
            currentState.dummytitles = ["usr-1", "usr-2", "usr-3", "usr-4", "usr-5"]
            currentState.data = [[], [], [], [], []]
            currentState.titles = []
            currentState.icons = [Human, Human, Human, Human, Human]
            currentState.dummytitles.forEach((dummytitle) => {
                let index = currentState.users.find((user) => user.id === dummytitle)
                currentState.titles.push(index.name)
            })
            currentState.tickets.forEach((ticket) => {
                let index = currentState.dummytitles.findIndex((title) => title === ticket.userId)
                currentState.data[index].push(ticket)
            })
        }
        else {
            currentState.dummytitles = [0, 4, 3, 2, 1]
            currentState.data = [[], [], [], [], []]
            currentState.icons = [NoPriority, Urgent, High, Medium, Low]
            currentState.titles = ["No priority", "Urgent", "High", "Medium", "Low"]
            currentState.tickets.forEach((ticket) => {
                let index = currentState.dummytitles.findIndex((title) => title === ticket.priority)
                currentState.data[index].push(ticket)
            })
        }
    }

    fetchData() {
        let url = "https://api.quicksell.co/v1/internal/frontend-assignment";

        if (this.state.tickets.length === 0 && this.state.users.length === 0) {
            axios.get(url).then((res) => {
                var currentState = this.state;
                currentState.tickets = res.data.tickets;
                currentState.users = res.data.users;
                currentState.titles = ["Backlog", "Todo", "In progress", "Done", "Cancelled"]
                currentState.data = [[], [], [], [], []]
                currentState.icons = [Backlog, Todo, Inprogress, Done, Cancelled]
                currentState.tickets.forEach((ticket) => {
                    let index = currentState.titles.findIndex((title) => title === ticket.status)
                    currentState.data[index].push(ticket)
                })
                if (this.props.Ordering === 0) {
                    currentState.data.forEach(data => {
                        data.sort((a, b) => {
                            return ((a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0))
                        })
                    })
                }
                this.setState(currentState)
            })
        }
    }

    render() {
        return <div className='ContentMainDiv'>
            <ColumnComponent titles={this.state.titles} data={this.state.data} icons={this.state.icons} />
        </div>
    }
}

export default Content;