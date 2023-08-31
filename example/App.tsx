import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {useEffect} from 'react';
import Slider from '@react-native-community/slider';

import * as Torch from 'expo-torch';

export default function App() {
  const torchStrengthArray = [0,1,2,3,4,5]

  const showTorchLevels = async() => {
    const torchMaxStrength = await Torch.getMaxLevel();
    const torchStrength = await Torch.getCurrentLevel();
    const defaultTorchStrength = await Torch.getDefaultLevel();
    console.log({defaultTorchStrength, torchMaxStrength, torchStrength});
  }

  const turnOn = () => {
    Torch.setMode(true);
  }

  const turnOff = () => {
    Torch.setMode(false);
  }

  useEffect(() => {
    showTorchLevels();
  }, [])

  return (
    <View style={styles.container}>
      <Text></Text>
      <TouchableOpacity style={[styles.rect, { backgroundColor:'green' }]} onPress={turnOn} />
      <TouchableOpacity style={[styles.rect, { backgroundColor:'red' }]} onPress={turnOff} />
      <TouchableOpacity style={[styles.rect, { backgroundColor:'blue' }]} onPress={showTorchLevels} />
      <View style={{flexDirection: 'row'}}>
        {torchStrengthArray.map((val) => {
          return <TouchableOpacity style={[styles.rect, { backgroundColor:'yellow' }]} onPress={() => Torch.turnOnWithLevel(val)}>
            <Text style={{fontSize: 50}}>{val}</Text>
          </TouchableOpacity>
        })}
      </View>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={1}
        step={0.1}
        onValueChange={(value) => {
          Torch.turnOnWithLevel(value)
        }}
        minimumTrackTintColor="#00FF00"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rect: { width: 100, height: 100 }
});
