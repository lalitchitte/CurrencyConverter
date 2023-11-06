import {View, Text} from 'react-native';
import React from 'react';
import type {PropsWithChildren} from 'react';

type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

const CurrencyButton = (props: CurrencyButtonProps) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{fontSize: 28, color: 'white'}}>{props.flag}</Text>
      <Text style={{fontSize: 14, color: '#8B78E6'}}>{props.name}</Text>
    </View>
  );
};

export default CurrencyButton;
