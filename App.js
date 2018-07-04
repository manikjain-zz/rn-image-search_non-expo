// 

import React from 'react';
import { StyleSheet, View, TextInput, StatusBar, ScrollView, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Images from './images';
// import { Button } from 'react-native-elements';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeywords: ''
    };
  }

  static navigationOptions =
    {
      title: 'Home',
      headerStyle: {
        backgroundColor: '#FFC107'
      },
      headerTintColor: '#fff',
    };

  FunctionToOpenSecondActivity = () => {

    this.props.navigation.navigate('Second', {
      searchQuery: this.state.searchKeywords
    });
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <ScrollView keyboardShouldPersistTaps="never">
          <TextInput
            style={styles.input}
            value={this.state.searchKeywords}
            onChangeText={searchKeywords => this.setState({ searchKeywords })}
            ref={ref => { this._nameInput = ref }}
            placeholder="Type a keyword(s)"
            autoFocus={true}
            autoCapitalize="words"
            autoCorrect={true}
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={this._next}
            blurOnSubmit={false}
          />
          <Button
            borderRadius={2}
            containerViewStyle={{ borderRadius: 2 }}
            buttonStyle={{ height: 40, width: 200, alignSelf: 'center', marginVertical: 8, backgroundColor: '#E17139' }}
            onPress={this.FunctionToOpenSecondActivity}
            title={'Search Images'}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Project = createStackNavigator(
  {
    First: { screen: App },
    Second: { screen: Images }
  });

const styles = StyleSheet.create({
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  text: {
    borderWidth: 1,
    padding: 25,
    borderColor: 'black',
    backgroundColor: 'red',
  },
});

