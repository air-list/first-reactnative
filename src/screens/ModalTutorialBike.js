import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, FlatList, StyleSheet, Image } from 'react-native';
import { gStyle } from '../constants';

const detail = {
  java: {
    list: ['Do 1', 'Do 2', 'Do 3'],
    image: ''
  }
};

const ModalTutorialBike = ({ navigation }) => (
  <View style={gStyle.container}>
    <Image
      source={require('/home/Kenshi/Pictures/java.jpg')}
      // style={{ width: 200, height: 200 }}
    />
    <Text style={{ margin: 10 }}>{navigation.getParam('name', 'NO-ID')}</Text>
    <View>
      <FlatList
        data={detail[navigation.getParam('name', 'NO-ID')].list}
        // style={styles.flatlist}
        renderItem={({ item, i }) => (
          <Text style={styles.text} key={i}>
            {item}
          </Text>
        )}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  text: {},
  flatlist: {
    alignItems: 'stretch'
  }
});

ModalTutorialBike.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default ModalTutorialBike;
