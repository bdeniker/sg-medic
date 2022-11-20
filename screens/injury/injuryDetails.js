import React from 'react';
import {StyleSheet, View} from 'react-native';
import Body from '../../components/Body';
import Heading from '../../components/Heading';
import Title from '../../components/Title';

const InjuryDetails = ({wound}) => {
  if (wound === undefined || wound === null) {
    return <View />;
  }
  const bc = wound.isRed ? 'red' : 'gold';
  return (
    <View style={{...styles.injury, borderColor: bc}}>
      <Title>{wound.name}</Title>
      <Heading>Symptoms</Heading>
      <Body>{wound.symptoms}</Body>
      <Heading>Until Treated</Heading>
      <Body>{wound.untilTreated}</Body>
    </View>
  );
};

const styles = StyleSheet.create({
  injury: {
    margin: 10,
    marginTop: 30,
    padding: 10,
    borderStyle: 'dotted',
    borderWidth: 3,
    borderRadius: 10,
  },
});

export default InjuryDetails;
