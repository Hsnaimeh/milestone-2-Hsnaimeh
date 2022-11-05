import { StyleSheet, Text, View } from 'react-native';


import RegisterScreen from './app/screens/Register'

export default function App() {
  return (
    <View style={styles.container}>
      <RegisterScreen />

    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  // flex: 1,
  // backgroundColor: '#fff',
  // alignItems: 'center',
  // justifyContent: 'center',
  // },
});


// export default App;