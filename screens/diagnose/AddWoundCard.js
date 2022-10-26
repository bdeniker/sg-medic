import React from 'react';
import BigButton from '../../components/BigButton';
import getWoundCardID from '../../util/readNFC';

function AddWoundCard() {
  return (
    <BigButton
      title="Add wound card"
      onPress={() => getWoundCardID().then(id => console.log(id))}
    />
  );
}

export default AddWoundCard;
