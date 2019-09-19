import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { colors, device, fonts, gStyle } from '../constants';

// components
import RequestRideType from '../components/RequestRideType';
import SelectRideType from '../components/SelectRideType';
import TouchIcon from '../components/TouchIcon';
import TouchText from '../components/TouchText';
// import WhereTo from '../components/WhereTo';

// icons
import SvgQRCode from '../components/icons/Svg.QRCode';
import SvgCheckShield from '../components/icons/Svg.CheckShield';
import SvgMenu from '../components/icons/Svg.Menu';

const { PROVIDER_GOOGLE } = MapView;

const types = {
  main: {
    image: 'carSm',
    imageLg: 'carLg',
    text: 'Select Destination',
    coordinate: {
      latitude: -2,
      longitude: 118,
      latitudeDelta: 56,
      longitudeDelta: 53
    }
  },
  java: {
    image: 'bikeSm',
    imageLg: 'bikeLg',
    text: 'Java',
    coordinate: {
      latitude: -7,
      longitude: 111,
      latitudeDelta: 16,
      longitudeDelta: 13
    }
  },
  sulawesi: {
    image: 'bikeSm',
    imageLg: 'bikeLg',
    text: 'Sulawesi',
    coordinate: {
      latitude: -2,
      longitude: 121,
      latitudeDelta: 16,
      longitudeDelta: 13
    }
  },
  sumatera: {
    image: 'bikeSm',
    imageLg: 'bikeLg',
    text: 'Sumatera',
    coordinate: {
      latitude: 0,
      longitude: 102,
      latitudeDelta: 16,
      longitudeDelta: 13
    }
  },
  papua: {
    image: 'bikeSm',
    imageLg: 'bikeLg',
    text: 'Papua',
    coordinate: {
      latitude: -4,
      longitude: 138,
      latitudeDelta: 16,
      longitudeDelta: 13
    }
  },
  kalimantan: {
    image: 'bikeSm',
    imageLg: 'bikeLg',
    text: 'Kalimantan',
    coordinate: {
      latitude: 1,
      longitude: 114,
      latitudeDelta: 16,
      longitudeDelta: 13
    }
  }
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'main',
      selectType: false,
      showMap: false
    };

    this.toggleTypeModal = this.toggleTypeModal.bind(this);
    this.changeRideType = this.changeRideType.bind(this);
  }

  async componentDidMount() {
    this.setState({
      showMap: true
    });
  }

  toggleTypeModal() {
    this.setState(prevState => ({
      selectType: !prevState.selectType
    }));
  }

  changeRideType(type) {
    this.setState({
      type
    });
    clearTimeout(this.regionTimeout);
    this.regionTimeout = setTimeout(() => {
      const { coordinate } = types[type];
      this.map.animateToRegion(
        {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: coordinate.latitudeDelta,
          longitudeDelta: coordinate.longitudeDelta
        },
        500
      );
    }, 10);
  }

  render() {
    const { navigation } = this.props;
    const { type, selectType, showMap } = this.state;

    return (
      <View style={gStyle.container}>
        {showMap && (
          <MapView
            ref={map => (this.map = map)}
            provider={PROVIDER_GOOGLE}
            // mapType={'satellite'}
            initialRegion={types.main.coordinate}
            style={styles.map}
          />
        )}

        {type === 'java' && (
          <View style={styles.rightContainer}>
            <View style={styles.icons}>
              <TouchIcon
                icon={<SvgQRCode />}
                iconSize={20}
                onPress={() =>
                  navigation.navigate('ModalQRCode', {
                    name: this.state.type
                  })
                }
                style={[styles.icon, styles.iconQRCode]}
              />
              <TouchIcon
                icon={<SvgCheckShield />}
                iconSize={20}
                onPress={() =>
                  navigation.navigate('ModalTutorialBike', {
                    name: this.state.type
                  })
                }
                style={[styles.icon, styles.iconShield]}
              />
            </View>
          </View>
        )}

        <View style={styles.header}>
          <TouchIcon
            icon={<SvgMenu />}
            iconSize={32}
            onPress={() => navigation.toggleDrawer()}
          />
          <RequestRideType
            image={types[type].image}
            onPress={this.toggleTypeModal}
            text={types[type].text}
          />

          {type === 'main' && <View style={styles.placeholder} />}
          {type === 'java' && (
            <TouchText
              onPress={() => navigation.navigate('ModalHelp')}
              style={styles.help}
              text="Help"
            />
          )}
        </View>

        <SelectRideType
          data={types}
          onClose={this.toggleTypeModal}
          onSelect={this.changeRideType}
          visible={selectType}
        />

        {/* {type === 'car' && <WhereTo />} */}
      </View>
    );
  }
}

Home.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  map: {
    height: device.height,
    position: 'absolute',
    width: device.width
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: device.iPhoneX ? 58 : 34
  },
  help: {
    textAlign: 'center',
    width: 32
  },
  placeholder: {
    height: 32,
    width: 32
  },
  rightContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    width: 40
  },
  icon: {
    borderRadius: 18,
    height: 36,
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    width: 36
  },
  iconQRCode: {
    backgroundColor: colors.blue,
    marginBottom: 16
  },
  iconShield: {
    backgroundColor: colors.white
  }
});

export default Home;
