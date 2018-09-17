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
    return this.props.onColorChange(fill);
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
          {/*className="element-panel"*/}
          placeholder="Basic usage"
          type="text"
          value={this.props.actualNode.n}
          onChange={this.handleNameChange}
        />

        <Select
          onChange={this.handleSexChange}
          defaultValue={this.props.actualNode.s}
          {/*className="element-panel"*/}
        >
          <Option key="M" value="M">
            Male
          </Option>
          <Option key="F" value="F">
            Female
          </Option>
        </Select>

        <DatePicker
          {/*className="element-panel"*/}
          selected={this.setStartDate(this.props.actualNode.date)}
          onChange={this.handleDateChange}
        />

        <div id="color-content">
          <CirclePicker
            {/*className="element-panel"*/}
            onChange={this.handleColorChange}
          />
        </div>
      </div>
    );
  }
}

export default NodeDetail;
