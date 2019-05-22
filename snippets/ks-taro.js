import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './${1:页面名称}.scss'

/**
 * 页面名称：${1:页面名称}
 * 注意事项：
 */
export default class ${1:页面名称} extends Component {

  config = {
    navigationBarTitleText: '${2:导航栏名称}'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className=''>
        <Text>${1:页面名称}</Text>
      </View>
    )
  }
}
