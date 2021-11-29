import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  timerView: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    borderWidth: 4,
    borderColor: '#527E5D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 40,
  },
  label: {
    fontSize: 40,
    marginBottom: 10,
    alignSelf: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  smallLabel: {
    fontSize: 25,
    marginTop: 10,
    alignSelf: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  labelContainer: {
    height: 60,
    justifyContent: 'flex-start',
  },
  button: {
    marginHorizontal: 5,
    marginBottom: 20,
  },
  menu: {
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    color: '#fff',
    fontWeight: 'bold',
  },
  menuContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  infoBox: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
  },
  infoText: {
    fontSize: 15,
  },
  image: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 8,
  },
});
