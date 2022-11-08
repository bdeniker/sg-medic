import {Slider} from '@miblanchard/react-native-slider';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NfcManager from 'react-native-nfc-manager';
import RNPickerSelect from 'react-native-picker-select';
import {SwipeListView} from 'react-native-swipe-list-view';
import uuid from 'react-native-uuid';

import BigButton from '../../components/BigButton';
import Row from '../../components/Row';
import complicationJSON from '../../resources/complications.json';
import problemJSON from '../../resources/problems.json';
import addComplications from '../../util/addComplications';
import getProblemsForWoundCard from '../../util/problemsForWound';
import getWoundCardID from '../../util/readNFC';

const rowTranslateAnimatedValues = {};

function Diagnose() {
  const [problemNames] = useState(problemJSON.map(p => ({label: p, value: p})));
  const [complicationNames] = useState([
    {label: 'Random complication', value: 'random'},
    ...complicationJSON.map(c => ({label: c, value: c})),
  ]);
  const [problems, setProblems] = useState([]);
  const [complications, setComplications] = useState([]);
  const [complicatedProblems, setComplicatedProblems] = useState([]);
  const [surgeries, setSurgeries] = useState(0);
  const [nfcScanning, setNFCScanning] = useState(false);

  function addProblems(problemsToAdd = []) {
    const addToState = problemsToAdd.map(problemToAdd => {
      const newId = uuid.v4();
      rowTranslateAnimatedValues[newId] = new Animated.Value(1);
      return {value: problemToAdd, key: newId};
    });
    setProblems([...problems, ...addToState]);
  }

  function updateProblem(keyToReplace, newProblem) {
    setProblems(
      problems.map(problem =>
        problem.key === keyToReplace
          ? {...problem, value: newProblem}
          : problem,
      ),
    );
  }

  function updateComplication(keyToReplace, newComplication) {
    setComplications(
      complications.map(compl =>
        compl.key === keyToReplace ? {...compl, value: newComplication} : compl,
      ),
    );
  }

  const renderItem =
    isComplication =>
    ({item}) => {
      let entry;
      if (isComplication) {
        entry = (
          <RNPickerSelect
            onValueChange={value => updateComplication(item.key, value)}
            items={complicationNames}
            style={selectStyles}
            value={item.value}
          />
        );
      } else {
        entry = (
          <RNPickerSelect
            onValueChange={value => updateProblem(item.key, value)}
            items={problemNames}
            style={selectStyles}
            value={item.value}
          />
        );
      }
      return (
        <Animated.View
          style={[
            styles.rowFrontContainer,
            {
              height: rowTranslateAnimatedValues[item.key].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 50],
              }),
            },
          ]}>
          {entry}
        </Animated.View>
      );
    };

  const onSwipeValueChange =
    isComplication =>
    ({key, value}) => {
      if (value < -Dimensions.get('window').width && !this.animationIsRunning) {
        this.animationIsRunning = true;
        Animated.timing(rowTranslateAnimatedValues[key], {
          toValue: 0,
          duration: 200,
        }).start(() => {
          if (isComplication) {
            setComplications(complications.filter(compl => compl.key !== key));
          } else {
            setProblems(problems.filter(problem => problem.key !== key));
          }
          this.animationIsRunning = false;
        });
      }
    };

  useEffect(() => {
    setComplicatedProblems(
      addComplications(
        problems.map(pr => pr.value),
        surgeries,
      ),
    );
  }, [problems, surgeries]);

  return (
    <View style={styles.homeView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={nfcScanning}
        onRequestClose={() => {
          NfcManager.cancelTechnologyRequest();
          setNFCScanning(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator />
            <Text style={styles.modalText}>Scan an NFC tag</Text>
          </View>
        </View>
      </Modal>
      <SwipeListView
        disableRightSwipe
        data={problems}
        renderItem={renderItem(false)}
        renderHiddenItem={() => (
          <View style={styles.rowBack}>
            <Text style={styles.textBack}>⬅️ Swipe to Delete</Text>
          </View>
        )}
        rightOpenValue={-Dimensions.get('window').width}
        onSwipeValueChange={onSwipeValueChange(false)}
        useNativeDriver={false}
      />
      <SwipeListView
        disableRightSwipe
        data={complications}
        renderItem={renderItem(true)}
        renderHiddenItem={() => (
          <View style={styles.rowBack}>
            <Text style={styles.textBack}>⬅️ Swipe to Delete</Text>
          </View>
        )}
        rightOpenValue={-Dimensions.get('window').width}
        onSwipeValueChange={onSwipeValueChange(true)}
        useNativeDriver={false}
      />
      <Row>
        <BigButton
          title="+ Problem"
          onPress={() => {
            const newId = uuid.v4();
            rowTranslateAnimatedValues[newId] = new Animated.Value(1);
            setProblems([...problems, {value: null, key: newId}]);
          }}
        />
        <BigButton
          title="Scan wound card"
          disabled={nfcScanning}
          onPress={() => {
            setNFCScanning(true);
            getWoundCardID().then(id => {
              addProblems(getProblemsForWoundCard(id));
              setNFCScanning(false);
            });
          }}
        />
        <BigButton
          title="+ Complication"
          onPress={() => {
            const newId = uuid.v4();
            rowTranslateAnimatedValues[newId] = new Animated.Value(1);
            setComplications([...complications, {value: 'random', key: newId}]);
          }}
        />
      </Row>
      <Text style={styles.textBack}>Previous surgeries: {surgeries}</Text>
      <Slider
        value={surgeries}
        maximumValue={10}
        step={1}
        onValueChange={value => setSurgeries(+value)}
      />
      <BigButton
        title={`Start ${complicatedProblems.length} card problem`}
        onPress={() => console.log(`${JSON.stringify(complicatedProblems)}`)}
        disabled={problems.length < 1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    margin: 5,
  },
  homeView: {
    margin: 10,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  // backTextWhite: {
  //   color: '#aaa',
  // },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  textBack: {
    color: 'grey',
    fontWeight: 'bold',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});
const selectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#F2F2F2',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Diagnose;
