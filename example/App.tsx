import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput } from 'react-native';
import {useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';

import * as Torch from 'expo-torch';

export default function App() {
  const torchStrengthArray = [0,1,2,3,4,5]

  useEffect(() => {
    const getTorchStrength = async () => {
      const torchMaxStrength = await Torch.getMaxLevel();
      const torchStrength = await Torch.getCurrentLevel();
      const defaultTorchStrength = await Torch.getDefaultLevel();
      console.log({defaultTorchStrength, torchMaxStrength, torchStrength});
    }
    getTorchStrength();
  }, [])


  return (
    <View style={styles.container}>
      <Text></Text>
      <TouchableOpacity style={{ width: 100, height: 100, backgroundColor:'red' }} onPress={() => Torch.setMode(true)} />
      <TouchableOpacity style={{ width: 100, height: 100, backgroundColor:'green' }} onPress={() => Torch.setMode(false)} />
      <TouchableOpacity style={{ width: 100, height: 100, backgroundColor:'blue' }} onPress={async() => {
        const torchStrength = await Torch.getCurrentLevel();
        console.log({torchStrength});
      }} />
      <View style={{flexDirection: 'row'}}>
        {torchStrengthArray.map((val) => {
          return <TouchableOpacity style={{width: 60, height: 60, backgroundColor:'yellow', borderWidth: 1}} onPress={() => Torch.turnOnWithLevel(val)}>
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

// TODO - Add exception when somebody tries to call turnOnWithStrengthLevel(arg < 1)
// Add warning if somebody tries to call getMaxStrengthLevel and getDefaultStrengthLevel without android 13 (33)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
