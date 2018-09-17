import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { CirclePicker } from 'react-color';

// Style
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';

import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/select/style/index.less';
import 'antd/lib/date-picker/style/index.less';
import 'antd/lib/form/style/index.less';
import 'antd/lib/input/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/spin/style/index.less';
const Option = Select.Option;

class NodeDetail extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSexChange = this.handleSexChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleDateChange(date) {
    this.props.onDateChange(date);
    console.log(date);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  handleSexChange(value) {
    this.props.onSexChange(value);
  }

  handleColorChange(color, event) {
    const fill = color.hex;
    switch (fill) {
      case '#f44336':
        return this.props.onColorChange('#f44336');
      case '#e91e63':
        return this.props.onColorChange('#e91e63');
      case '#9c27b0':
        return this.props.onColorChange('#9c27b0');
      case '#673ab7':
        return this.props.onColorChange('#673ab7');
      case '#3f51b5':
        return this.props.onColorChange('#3f51b5');
      case '#2196f3':
        return this.props.onColorChange('#2196f3');
      case '#03a9f4':
        return this.props.onColorChange('#03a9f4');
      case '#00bcd4':
        return this.props.onColorChange('#00bcd4');
      case '#009688':
        return this.props.onColorChange('#009688');
      case '#4caf50':
        return this.props.onColorChange('#4caf50');
      case '#8bc34a':
        return this.props.onColorChange('#8bc34a');
      case '#cddc39':
        return this.props.onColorChange('#cddc39');
      case '#ffeb3b':
        return this.props.onColorChange('#ffeb3b');
      case '#ffc107':
        return this.props.onColorChange('#ffc107');
      case '#ff9800':
        return this.props.onColorChange('#ff9800');
      case '#ff5722':
        return this.props.onColorChange('#ff5722');
      case '#795548':
        return this.props.onColorChange('#795548');
      case '#607d8b':
        return this.props.onColorChange('#607d8b');
      default:
        return 'transparent';
    }
  }

  setStartDate(date) {
    const dateObj = new Date(date);
    const momentObj = moment(dateObj);
    return momentObj;
  }

  render() {
    return (
      <div>
        <Input
          className="element-panel"
          placeholder="Basic usage"
          type="text"
          value={this.props.actualNode.n}
          onChange={this.handleNameChange}
        />

        <Select
          onChange={this.handleSexChange}
          defaultValue={this.props.actualNode.s}
          className="element-panel"
        >
          <Option key="M" value="M">
            Male
          </Option>
          <Option key="F" value="F">
            Female
          </Option>
        </Select>

        <DatePicker
          className="element-panel"
          selected={this.setStartDate(this.props.actualNode.date)}
          onChange={this.handleDateChange}
        />

        <div id="color-content">
          <CirclePicker
            className="element-panel"
            onChange={this.handleColorChange}
          />
        </div>
      </div>
    );
  }
}

export default NodeDetail;
