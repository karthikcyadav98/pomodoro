import React from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from '../stylesheet';

let list = [];
for (let i = 0; i < 60; i++) {
  list.push(i.toString());
}

export default class Menu extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: '#527e5d', borderRadius: 15, height: 50}}>
        <Picker
          style={styles.menu}
          mode="dropdown"
          onValueChange={this.props.onValueChange}
          selectedValue={this.props.selected}>
          {list.map(num => {
            return <Picker.Item label={num} value={num} key={num} />;
          })}
        </Picker>
      </View>
    );
  }
}
