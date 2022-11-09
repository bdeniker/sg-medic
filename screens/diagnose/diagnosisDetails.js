import React from 'react';
import {StyleSheet, View} from 'react-native';
import Body from '../../components/Body';
import Heading from '../../components/Heading';
import Subtitle from '../../components/Subtitle';
import Title from '../../components/Title';

const DiagnosisDetails = ({wound}) => {
  if (wound === undefined || wound === null) {
    return <View />;
  }
  const bc = wound.isRed ? 'red' : 'yellow';
  return (
    <View style={{...styles.diagnosis, borderColor: bc}}>
      <Title>{wound.name}</Title>
      <Subtitle>{wound.category}</Subtitle>
      <Subtitle>{wound.specialisation}</Subtitle>
      <Heading>Diagnosis</Heading>
      <Body>{wound.diagnosis}</Body>
      <Body mechanics>{wound.mechanics}</Body>
      <Heading>Failed Surgery Effect</Heading>
      <Body>{wound.failure}</Body>
    </View>
  );
};

const styles = StyleSheet.create({
  diagnosis: {
    margin: 10,
    marginTop: 30,
    padding: 10,
    borderStyle: 'dotted',
    borderWidth: 3,
    borderRadius: 10,
  },
});

export default DiagnosisDetails;
