import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from './src/stylesheet';
import Menu from './src/components/menu';
import Buttons from './src/components/button';
import Timer from './src/components/timer';
import Label from './src/components/label';
import Info from './src/components/info';
import Picture from './src/components/picture';
import vibrate from './src/vibrate';
import BackgroundTimer from 'react-native-background-timer';
import CodePush from 'react-native-code-push';

// assets
import PlayIcon from './src/assets/play.png';
import PauseIcon from './src/assets/pause.png';
import ResetIcon from './src/assets/reset.png';

function leftPadding(n) {
  if (parseInt(n) < 10) {
    return '0' + n.toString();
  } else {
    return n.toString();
  }
}

function getTime(val) {
  return leftPadding(val) + ':00';
}

class App extends React.Component {
  constructor(props) {
    super(props),
      (this.state = {
        currentTime: '25:00',
        workTime: '25:00',
        breakTime: '05:00',
        working: true,
        timer: null,
        paused: false,
        playing: false,
      });
    this.setWorkTimer = this.setWorkTimer.bind(this);
    this.setBreakTimer = this.setBreakTimer.bind(this);
    this.playButton = this.playButton.bind(this);
    this.pauseButton = this.pauseButton.bind(this);
    this.resetButton = this.resetButton.bind(this);
    this.countdown = this.countdown.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  componentDidMount() {
    this.codePushUpdate();
    setTimeout(() => {
      this.setState({isSplashscreen: false});
    }, 1000);
  }

  codePushUpdate = () => {
    CodePush.sync({
      updateDialog: false,
      installMode: CodePush.InstallMode.IMMEDIATE,
    });
  };

  setWorkTimer(val) {
    let newTime = getTime(val);
    this.setState({
      workTime: newTime,
    });
    if (!this.state.timer) {
      this.setState({
        currentTime: newTime,
      });
    }
  }

  setBreakTimer(val) {
    let newTime = getTime(val);
    this.setState({
      breakTime: newTime,
    });
  }

  playButton() {
    if (this.state.paused === true || this.state.playing === false) {
      this.setState({
        // timer: setInterval(this.countdown, 1000),
        timer: BackgroundTimer.runBackgroundTimer(() => {
          this.countdown();
        }, 1000),
        paused: false,
        playing: true,
      });
    }
  }

  pauseButton() {
    if (this.state.paused === false && this.state.playing === true) {
      // clearInterval(this.state.timer);
      BackgroundTimer.stopBackgroundTimer();
      this.setState({
        paused: true,
        timer: null,
        playing: false,
      });
      console.log(this.state.paused);
    } else if (this.state.paused === true && this.state.playing === false) {
      this.playButton();
    }
  }

  resetButton() {
    this.pauseButton();
    this.setState({
      currentTime: this.state.workTime,
      playing: false,
      paused: false,
      working: true,
    });
  }

  countdown() {
    if (this.state.currentTime === '00:00' && this.state.playing === true) {
      console.log('finished');
      vibrate();
      this.toggleStatus();
    } else {
      let sec = this.state.currentTime.slice(3);
      let min = this.state.currentTime.slice(0, 2);
      if (sec === '00') {
        let newMin = leftPadding(parseInt(min) - 1);
        let newTime = newMin + ':59';
        this.setState({
          currentTime: newTime,
        });
      } else {
        let newSec = leftPadding(parseInt(sec) - 1);
        let newTime = min + ':' + newSec;
        this.setState({
          currentTime: newTime,
        });
      }
    }
  }

  toggleStatus() {
    if (this.state.working) {
      this.setState({
        working: false,
        currentTime: this.state.breakTime,
      });
    } else {
      this.setState({
        working: true,
        currentTime: this.state.workTime,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Timer currentTime={this.state.currentTime} />

        <View style={styles.menuContainer}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                padding: 10,
                fontSize: 20,
              }}>
              Study Time
            </Text>
            <Menu
              selected={Number(this.state.workTime.slice(0, 2)).toString()}
              onValueChange={this.setWorkTimer}
            />
          </View>

          <View
            style={{
              marginHorizontal: 10,
              height: 120,
              borderWidth: 1.5,
              borderColor: '#000',
            }}
          />

          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                padding: 10,
                fontSize: 20,
              }}>
              Break Time
            </Text>
            <Menu
              selected={Number(this.state.breakTime.slice(0, 2)).toString()}
              onValueChange={this.setBreakTimer}
            />
          </View>
        </View>

        <Label
          working={this.state.working}
          paused={this.state.paused}
          playing={this.state.playing}
        />

        <View style={{flexDirection: 'row'}}>
          {!this.state.playing ? (
            <TouchableOpacity activeOpacity={0.5} onPress={this.playButton}>
              <Image
                source={PlayIcon}
                style={{width: 70, height: 70, borderRadius: 35}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.5} onPress={this.pauseButton}>
              <Image
                source={PauseIcon}
                style={{width: 70, height: 70, borderRadius: 35}}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              paddingLeft: 20,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            activeOpacity={0.5}
            onPress={this.resetButton}>
            <Image
              source={ResetIcon}
              style={{width: 30, height: 30, borderRadius: 15}}
            />
          </TouchableOpacity>
          {/* <Buttons title="Play" onPress={this.playButton} />
          <Buttons title="Pause" onPress={this.pauseButton} />
          <Buttons title="Reset" onPress={this.resetButton} /> */}
        </View>

        {/* <Info /> */}
        {/* <Picture /> */}
      </View>
    );
  }
}

// export default App;
let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
};

export default App = CodePush(codePushOptions)(App);
