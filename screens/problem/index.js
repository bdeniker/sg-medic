import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import BigButton from '../../components/BigButton';
import Body from '../../components/Body';
import Heading from '../../components/Heading';

function Problem({route}) {
  const {problems, failure, doubled} = route.params;
  const [problemList, setProblemList] = useState(
    problems.map(p => ({name: p, revealed: false, solved: false})),
  );
  const [allDone, setAllDone] = useState(false);

  const renderProblem = ({item}) => {
    let itemStyle;
    if (item.revealed) {
      if (item.solved) {
        itemStyle = styles.done;
      } else {
        itemStyle = styles.current;
      }
    } else {
      itemStyle = styles.unrevealed;
    }

    return (
      <View style={styles.item}>
        <Text style={itemStyle}>{item.revealed ? item.name : '???'}</Text>
      </View>
    );
  };
  const nextCard = () => {
    let advancedProblems = [...problemList];
    let currentId = advancedProblems.findIndex(p => p.revealed && !p.solved);
    if (currentId !== -1) {
      advancedProblems[currentId].solved = true;
    }
    if (currentId + 1 !== advancedProblems.length) {
      advancedProblems[currentId + 1].revealed = true;
    } else {
      setAllDone(true);
    }
    setProblemList(advancedProblems);
  };
  return (
    <>
      <ScrollView style={styles.page}>
        {doubled && (
          <Heading>Remember all your cards take twice as long!</Heading>
        )}
        <FlatList
          data={problemList}
          keyExtractor={item => item.name}
          renderItem={renderProblem}
        />
        <View style={{margin: 10}}>
          <Heading>If Failed</Heading>
          <Body>{failure}</Body>
        </View>
        {/* TODO
      - if doubled, add warning
      - bottom align big button?
       */}
      </ScrollView>
      <View style={styles.bottomView}>
        <BigButton
          title={'Reveal next card'}
          onPress={nextCard}
          disabled={allDone}
        />
      </View>
    </>
  );
}

export default Problem;

const styles = StyleSheet.create({
  page: {
    margin: 10,
    height: '80%',
    width: '95%',
    top: 0,
    position: 'absolute',
  },
  item: {
    backgroundColor: '#E6E6E6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  done: {
    fontSize: 28,
    color: '#434343',
    textDecorationLine: 'line-through',
  },
  current: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  unrevealed: {
    fontSize: 32,
    color: 'black',
  },
  bottomView: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
