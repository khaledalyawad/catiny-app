import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchBarContainer: {
    width: Platform.OS === 'ios' ? '120%' : '100%',
  },
  // cancelButtonText: {
  //   color: AppStyles.colorSet[colorScheme].mainSubtextColor,
  //   fontSize: 18,
  // },
  searchInput: {
    fontSize: 17,
  },
  tabNavigatorIcon: {
    width: 25,
    height: 25,
  },
});

export default styles;
