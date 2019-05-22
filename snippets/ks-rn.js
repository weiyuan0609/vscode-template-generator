import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './${1:页面名称}Screen.style';
import { createNavigationOptions } from '../../services';
import * as templateCreators from '../../../actions/thunks/template-creator';

/**
 * 页面名称：${2}
 * 注意事项：
 */

const propTypes = {
  // 路由对象
  navigation: PropTypes.object.isRequired,
};

const defaultProps = {
  navigation: {},
};

class ${1:页面名称}Screen extends PureComponent {
  static navigationOptions() {
    return createNavigationOptions('${2:导航栏名称}');
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        ${3}
      </View>
    );
  }
}

${1:页面名称}Screen.propTypes = propTypes;
${1:页面名称}Screen.defaultProps = defaultProps;

export default ${1:页面名称}Screen;
