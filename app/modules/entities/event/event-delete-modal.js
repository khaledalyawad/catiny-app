import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import EventActions from './event.reducer';

import styles from './event-styles';

function EventDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteEvent(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Event');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Event {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() =>
              {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID='deleteButton'>
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) =>
{
  return {
    event: state.events.event,
    fetching: state.events.fetchingOne,
    deleting: state.events.deleting,
    errorDeleting: state.events.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getEvent: (id) => dispatch(EventActions.eventRequest(id)),
    getAllEvents: (options) => dispatch(EventActions.eventAllRequest(options)),
    deleteEvent: (id) => dispatch(EventActions.eventDeleteRequest(id)),
    resetEvents: () => dispatch(EventActions.eventReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDeleteModal);
