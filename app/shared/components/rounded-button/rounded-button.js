import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './rounded-button.styles';

// type RoundedButtonProps: {
//     onPress: PropTypes.func,
//     text: PropTypes.string,
//     children: PropTypes.string,
//     navigator: PropTypes.object,
//     testID: PropTypes.string,
// }

export default function RoundedButton(props)
{
  const {onPress, text, children, navigator, ...otherProps} = props;

  const getText = () =>
  {
    const buttonText = text || children || '';
    return buttonText.toUpperCase();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} {...otherProps}>
      <Text style={styles.buttonText}>{getText()}</Text>
    </TouchableOpacity>
  );
}
