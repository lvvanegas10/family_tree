import React from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'containers/Auth';
import axios from 'axios';

// Antd
import Timeline from 'antd/lib/timeline';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import 'antd/lib/timeline/style/index.less';

// Semantic
import { Dimmer, Loader, Segment, Header } from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
class MyTimeline extends React.Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
  };

  state = {
    isLoading: false,
    dataTree: [],
  };

  componentDidMount = () => {
    this.loadTree();
  };

  loadTree = async () => {
    this.setState({ isLoading: true });
    const {
      userData: {
        session: { token },
      },
    } = this.props;
    try {
      const {
        data: { trees },
      } = await axios.get('https://back-p2.herokuapp.com/tree', {
        headers: {
          token,
        },
      });
      if (trees[0].tree.length > 0) {
        this.setState({ dataTree: trees[0].tree });
      } else {
        this.setState({ dataTree: [] });
      }
    } catch (error) {
      console.log(error.response);
      message.error('An error has ocurred. Please, try again.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading, dataTree } = this.state;
    console.log(dataTree);
    return (
      <Dimmer.Dimmable dimmed={isLoading} style={{ minHeight: '300px' }}>
        <Dimmer active={isLoading} inverted>
          <Loader />
        </Dimmer>
        {!isLoading && dataTree.length > 0 ? (
          <Timeline mode="alternate">
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item color="green">
              Solve initial network problems 2015-09-01
            </Timeline.Item>
            <Timeline.Item
              dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </Timeline.Item>
            <Timeline.Item color="red">
              Network problems being solved 2015-09-01
            </Timeline.Item>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item
              dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}
            >
              Technical testing 2015-09-01
            </Timeline.Item>
          </Timeline>
        ) : (
          []
        )}
        {!isLoading && dataTree.length === 0 ? (
          <Segment basic padded="very" textAlign="center">
            <Header as="h1">Not there is family tree yet</Header>
          </Segment>
        ) : (
          []
        )}
      </Dimmer.Dimmable>
    );
  }
}

export default Auth(MyTimeline);
