import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import {Vibration} from 'react-native';


export default class App extends React.Component {
  
  constructor() {
    super();

    this.countBegins = false;

    this.state = {
      work: true,
      minute: 25,
      second: 0,
      firstTime: true,
    }
  }

  decreaseTime = () => {
    this.setState(prevState => ({
      minute: prevState.minute,
      second: prevState.second - 1,
    }));
  }

  handleStart = () => {
    if (this.state.work) {
      this.countBegins = true;
      this.setState(prevState => ({
        firstTime: true,
        minute: 25,
        second: 0,
      }));
    } else {
      this.countBegins = true;
      this.setState(prevState => ({
        firstTime: true,
        minute: 5,
        second: 0,
      }))
    }

    const Id = setInterval(this.decreaseTime, 1000);
  
    this.setState({
      id: Id,
    });
  }

  handlePause = () => {
    clearInterval(this.state.id);
  }

  handleReset = () => {
    this.handlePause();
    
    if (this.state.work) {
      this.countBegins = false;
      this.setState(prevState => ({
        firstTime: true,
        minute: 25,
        second: 0,
      }));
    } else {
      this.countBegins = false;
      this.setState(prevState => ({
        firstTime: true,
        minute: 5,
        second: 0,
      }))
    }
  }

  componentDidUpdate() {
    if (this.state.minute === 0 && this.state.second === 0 && this.countBegins) {
      Vibration.vibrate([500, 500, 500]);
      this.handlePause();
      this.countBegins = false;
      this.setState(prevState => ({
        work: !prevState.work,
      }));
    }

    if (this.countBegins) {
      if (this.state.firstTime) {
        if (this.state.second === 0) {
          this.setState(prevState => ({
            minute: prevState.minute - 1,
            second: 59,
            firstTime: false,
          }));
        }
      } else {
        if (this.state.second === -1) {
          this.setState(prevState => ({
            minute: prevState.minute - 1,
            second: 59,
          }));
        }
      }
    }
  }

  render() {
    return (
      <View style={[styles.container, (this.state.work) ? styles.workc : styles.restc]}>
        
        {/* Top Head */}
        <Pressable 
          style={styles.sessionPress}
          onPress={() => this.setState(prevState => ({work: !prevState.work}))}
        >
          <Text style={[styles.session, (this.state.work) ? styles.work : styles.rest]}>
            {this.state.work ? 'Work' : 'Rest'}<Text style={styles.span}> (tap to change)</Text>
          </Text>
        </Pressable>

        {/* Counter */}
        <View style={styles.timerHolder}>
          <Text style={styles.timerText}>
            {this.state.minute >= 10 ? this.state.minute : `0${this.state.minute}`}:{this.state.second >= 10 ? this.state.second : `0${this.state.second}`}
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonHolder}>
          <Pressable style={[styles.button, styles.buttonStart]} onPress={this.handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </Pressable>
        
          <Pressable style={[styles.button, styles.buttonPause]} onPress={this.handlePause}>
            <Text style={styles.buttonText}>Pause</Text>
          </Pressable>
        
          <Pressable style={[styles.button, styles.buttonReset]} onPress={this.handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  workc: {
    backgroundColor: '#b0ffa8',
  },
  restc: {
    backgroundColor: '#ffef96',
  },
  sessionPress: {
    width: "100%",
  },
  session: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    marginTop: Constants.statusBarHeight,
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    color: "white",
    position: "relative"
  },
  span: {
    fontSize: 10,
  },
  work: {
    backgroundColor: "#68e637",
  },
  rest: {
    backgroundColor: "#ffdd1f",
  },
  timerHolder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "white",
  },
  buttonHolder: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  button: {
    padding: 10,
    alignItems: "center",
  },
  buttonStart: {
    backgroundColor: "#8000ff",
    borderRadius: 12,
  },
  buttonPause: {
    backgroundColor: "#ff642b",
    borderRadius: 12,
  },
  buttonReset: {
    backgroundColor: "#ff2b2b",
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  }
});
