import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const dismissImage = require('../../../CoreAssets/dismiss-rounded.png');

export default function IMDismissButton()
{
  return (
    <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
      <Image
        style={{
          resizeMode: 'cover',
          width: 40,
          height: 40,
          tintColor: this.props.tintColor,
        }}
        source={dismissImage}
      />
    </TouchableOpacity>
  );
}

IMDismissButton.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func,
};
