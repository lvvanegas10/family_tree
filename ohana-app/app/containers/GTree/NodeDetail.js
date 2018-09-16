import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class NodeDetail extends Component {

    constructor(props) {
        super(props)
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSexChange = this.handleSexChange.bind(this);

        this.nameInput = React.createRef();
    }

    handleDateChange(date) {
        this.props.onDateChange(date);
        console.log(date);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    handleSexChange(event) {
        this.props.onSexChange(event.target.value);
    }

    setStartDate(date) {
        var dateObj = new Date(date);
        var momentObj = moment(dateObj);
        return momentObj;
    }

    render() {
        return (
            <div>
                <form>
                    <input type="text" ref={this.nameInput} value={this.props.actualNode.n} onChange={this.handleNameChange} />
                    <select onChange={this.handleSexChange} defaultValue={this.props.actualNode.s}>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                    <DatePicker
                        selected={this.setStartDate(this.props.actualNode.date)}
                        onChange={this.handleDateChange}
                    />
                </form>
            </div>
        );
    }

}

export default NodeDetail;
