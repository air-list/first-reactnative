import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { colors, device, fonts, func, gStyle, images } from '../constants';

// components
import ModalHeader from '../components/ModalHeader';

class ModalQRCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDateTimePickerVisible: false,
      isTimePickerVisible: false,
      date1: '',
      date2: ''
    };
  }
  showDateTimePicker = () => {
    if (this.state.date1 == '') this.setState({ date1: new Date() });
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setState({ date1: date, date2: date });
    this.hideDateTimePicker();
  };
  showTimePicker = () => {
    if (this.state.date1 == '') this.setState({ date2: new Date() });
    else this.setState({ date2: this.state.date1 });
    this.setState({ isTimePickerVisible: true });
  };

  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  };

  handleTimePicked = date => {
    this.setState({ date2: date });
    this.hideTimePicker();
  };

  render() {
    const { navigation } = this.props;
    const place = navigation.getParam('name', 'NO-ID');

    return (
      <View style={gStyle.container}>
        <Text>{place}</Text>
        <Text>
          Departing Date :{' '}
          {this.state.date1 ? this.state.date1.toDateString() : 'Choose'}
        </Text>
        <Text>
          Return Date :{' '}
          {this.state.date2 ? this.state.date2.toDateString() : 'Choose'}
        </Text>
        <Button title="Departing Date" onPress={this.showDateTimePicker} />
        <DateTimePicker
          date={this.state.date1}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <Button title="Return Date" onPress={this.showTimePicker} />
        <DateTimePicker
          date={this.state.date2}
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this.handleTimePicked}
          onCancel={this.hideTimePicker}
        />
      </View>
    );
  }
}

ModalQRCode.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  barcodeScanner: {
    height: device.height,
    position: 'absolute',
    width: device.width
  },
  overlay: {
    height: device.height,
    width: device.width
  },
  modalHeader: {
    backgroundColor: colors.black70
  },
  containerBar: {
    alignItems: 'center',
    backgroundColor: colors.black70,
    paddingVertical: 24
  },
  containerBarIcons: {
    flexDirection: 'row'
  },
  barWidth: {
    justifyContent: 'space-between',
    width: 240
  },
  containerIcon: {
    alignItems: 'center',
    width: 100
  },
  iconBike: {
    height: 41,
    marginRight: 48,
    width: 48
  },
  iconScooter: {
    height: 43,
    width: 48
  },
  iconBottom: {
    height: 64,
    width: 64
  },
  iconLabel: {
    color: colors.white,
    fontFamily: fonts.light,
    marginTop: 24
  },
  containerLabel: {
    alignItems: 'center',
    backgroundColor: colors.black70,
    paddingVertical: 8
  },
  label: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: 16
  },
  containerHelperBox: {
    flexDirection: 'row'
  },
  boxSpacer: {
    backgroundColor: colors.black70,
    flex: 1
  },
  box: {
    height: 200,
    width: 200
  }
});

export default ModalQRCode;
