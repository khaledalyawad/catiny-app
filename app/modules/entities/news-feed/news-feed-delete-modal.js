import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';

import NewsFeedActions from './news-feed.reducer';

import styles from './news-feed-styles';

function NewsFeedDeleteModal(props)
{
  const {visible, setVisible, entity, navigation, testID} = props;

  const deleteEntity = () =>
  {
    props.deleteNewsFeed(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('NewsFeed');
  };
  return (
    <Modal animationType='slide' transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete NewsFeed {entity.id}?</Text>
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
    newsFeed: state.newsFeeds.newsFeed,
    fetching: state.newsFeeds.fetchingOne,
    deleting: state.newsFeeds.deleting,
    errorDeleting: state.newsFeeds.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    getNewsFeed: (id) => dispatch(NewsFeedActions.newsFeedRequest(id)),
    getAllNewsFeeds: (options) => dispatch(NewsFeedActions.newsFeedAllRequest(options)),
    deleteNewsFeed: (id) => dispatch(NewsFeedActions.newsFeedDeleteRequest(id)),
    resetNewsFeeds: () => dispatch(NewsFeedActions.newsFeedReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedDeleteModal);
