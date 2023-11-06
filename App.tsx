import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {currencyByRupee} from './src/constants';
import CurrencyButton from './src/components/CurrencyButton';

const App = () => {
  const [inputvalue, setInputValue] = useState('');
  const [resultvalue, setResultValue] = useState('');
  const [targetcurr, setTargetCurr] = useState('');

  const buttonPress = (targetValue: Currency) => {
    if (!inputvalue) {
      Snackbar.show({
        text: 'Enter Values to Convert',
        backgroundColor: '#F3B431',
        textColor: 'black',
      });
    }
    const inputAmount = parseFloat(inputvalue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurr(targetValue.name);
    } else {
      Snackbar.show({
        text: 'Not a Valid Number to Convert',
        backgroundColor: '#E44236',
        textColor: 'black',
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                paddingLeft: 15,
                elevation: 5,
                fontSize: 20,
                shadowColor: 'black',
                borderColor: 'black',
                width: 300,
              }}
              placeholder="Enter Amount in Rupees"
              maxLength={14}
              value={inputvalue}
              clearButtonMode="always"
              onChangeText={setInputValue}
              keyboardType="number-pad"></TextInput>
          </View>
          {resultvalue && <Text style={styles.resultTxt}>{resultvalue}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
                key={item.name}
                style={[
                  styles.button,
                  targetcurr === item.name && styles.selected,
                ]}
                onPress={() => buttonPress(item)}>
                <Text style={{fontSize: 25, color: 'white'}}>{item.flag}</Text>
                <Text style={{fontSize: 16, color: 'black'}}>{item.name}</Text>
              </Pressable>
            )}></FlatList>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74B9FF',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    fontSize: 25,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 2,
  },
  button: {
    flex: 1,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
