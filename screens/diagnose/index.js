import React, {useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import uuid from 'react-native-uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import {SwipeListView} from 'react-native-swipe-list-view';
import BigButton from '../../components/BigButton';
import Row from '../../components/Row';
import problemJSON from '../../resources/problems.json';

const rowTranslateAnimatedValues = {};

function Diagnose() {
  const [problemNames] = useState(problemJSON.map(p => ({label: p, value: p})));
  const [problems, setProblems] = useState([]);
  const [surgeries, setSurgeries] = useState(0);

  function openDropdown(idToOpen, isOpen) {
    console.log(`before\n${JSON.stringify(problems)}`);
    if (isOpen) {
      // if opening, close others
      setProblems(
        problems.map(problem =>
          problem.id === idToOpen
            ? {...problem, open: isOpen}
            : {...problem, open: false},
        ),
      );
    } else {
      // otherwise leave as is
      setProblems(
        problems.map(problem =>
          problem.id === idToOpen ? {...problem, open: isOpen} : problem,
        ),
      );
    }
    console.log(`after\n${JSON.stringify(problems)}`);
  }
  function updateProblem(idToReplace, newProblem) {
    setProblems(
      problems.map(problem =>
        problem.id === idToReplace ? {...problem, value: newProblem} : problem,
      ),
    );
  }

  function renderItem({item}) {
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
        <DropDownPicker
          key={`dropdown-${item.id}`}
          open={item.open}
          value={item.value}
          items={problemNames}
          setOpen={isOpen => openDropdown(item.id, isOpen)}
          setValue={newProblem => updateProblem(item.id, newProblem)}
          searchable={true}
        />
      </Animated.View>
    );
  }

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    if (value < -Dimensions.get('window').width && !this.animationIsRunning) {
      this.animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
      }).start(() => {
        const newData = [...problems];
        const prevIndex = problems.findIndex(item => item.key === key);
        newData.splice(prevIndex, 1);
        setProblems(newData);
        this.animationIsRunning = false;
      });
    }
  };

  return (
    <View style={styles.homeView}>
      <SwipeListView
        disableRightSwipe
        data={problems}
        renderItem={renderItem}
        renderHiddenItem={() => (
          <View style={styles.rowBack}>
            <Text style={styles.textBack}>⬅️ Swipe to Delete</Text>
          </View>
        )}
        rightOpenValue={-Dimensions.get('window').width}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
      />
      <Row>
        <BigButton
          title="Add Problem"
          onPress={() => {
            let newId = uuid.v4();
            setProblems([
              ...problems,
              {value: null, open: false, id: newId, key: newId},
            ]);
            rowTranslateAnimatedValues[newId] = new Animated.Value(1);
          }}
        />
        <BigButton
          title="Add wound card"
          onPress={() => console.log(problems)}
        />
      </Row>
      <Text>Previous surgeries: {surgeries}</Text>
      <Slider
        value={surgeries}
        maximumValue={10}
        step={1}
        onValueChange={value => setSurgeries(value)}
      />
      <BigButton
        title={`Start ${problems.length} card problem`}
        onPress={() => Alert.alert('To do: actual function 🤷')}
        disabled={problems.length < 1} // Y U no work?!
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeView: {
    margin: 10,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  textBack: {
    // color: 'red',
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
});

export default Diagnose;
