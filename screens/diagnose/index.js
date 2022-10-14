import React, {useState} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import uuid from 'react-native-uuid';
import RNPickerSelect from 'react-native-picker-select';
import {SwipeListView} from 'react-native-swipe-list-view';
import BigButton from '../../components/BigButton';
import Row from '../../components/Row';
import problemJSON from '../../resources/problems.json';

const rowTranslateAnimatedValues = {};

function Diagnose() {
  const [problemNames] = useState(problemJSON.map(p => ({label: p, value: p})));
  const [problems, setProblems] = useState([]);
  const [surgeries, setSurgeries] = useState(0);

  function updateProblem(keyToReplace, newProblem) {
    setProblems(
      problems.map(problem =>
        problem.key === keyToReplace
          ? {...problem, value: newProblem}
          : problem,
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
        <RNPickerSelect
          onValueChange={value => updateProblem(item.key, value)}
          items={problemNames}
          style={selectStyles}
        />
      </Animated.View>
    );
  }

  const onSwipeValueChange = ({key, value}) => {
    if (value < -Dimensions.get('window').width && !this.animationIsRunning) {
      this.animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
      }).start(() => {
        setProblems(problems.filter(problem => problem.key !== key));
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
            setProblems([...problems, {value: null, key: newId}]);
            rowTranslateAnimatedValues[newId] = new Animated.Value(1);
          }}
        />
        <BigButton
          title="Add wound card"
          onPress={() => console.log(problemNames)}
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
        onPress={() =>
          // Alert.alert('TODO actual function 🤷')
          console.log(JSON.stringify(problems))
        }
        disabled={problems.length < 1} // TODO add disabled styling
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
