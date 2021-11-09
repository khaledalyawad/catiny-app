import React from 'react';
import {ScrollView, Text} from 'react-native';
// Styles
import RoundedButton from '../../shared/components/rounded-button/rounded-button';

import styles from './entities-screen.styles';

export default function EntitiesScreen({navigation})
{
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID='entityScreenScrollList'>
      <Text style={styles.centerText}>JHipster Entities will appear below</Text>
      <RoundedButton text='MessageGroup' onPress={() => navigation.navigate('MessageGroup')} testID='messageGroupEntityScreenButton' />
      <RoundedButton
        text='MessageContent'
        onPress={() => navigation.navigate('MessageContent')}
        testID='messageContentEntityScreenButton'
      />
      <RoundedButton text='HanhChinhVN' onPress={() => navigation.navigate('HanhChinhVN')} testID='hanhChinhVNEntityScreenButton' />
      <RoundedButton text='MasterUser' onPress={() => navigation.navigate('MasterUser')} testID='masterUserEntityScreenButton' />
      <RoundedButton text='UserProfile' onPress={() => navigation.navigate('UserProfile')} testID='userProfileEntityScreenButton' />
      <RoundedButton text='AccountStatus' onPress={() => navigation.navigate('AccountStatus')} testID='accountStatusEntityScreenButton' />
      <RoundedButton text='DeviceStatus' onPress={() => navigation.navigate('DeviceStatus')} testID='deviceStatusEntityScreenButton' />
      <RoundedButton text='Friend' onPress={() => navigation.navigate('Friend')} testID='friendEntityScreenButton' />
      <RoundedButton text='FollowUser' onPress={() => navigation.navigate('FollowUser')} testID='followUserEntityScreenButton' />
      <RoundedButton text='FollowGroup' onPress={() => navigation.navigate('FollowGroup')} testID='followGroupEntityScreenButton' />
      <RoundedButton text='FollowPage' onPress={() => navigation.navigate('FollowPage')} testID='followPageEntityScreenButton' />
      <RoundedButton text='FileInfo' onPress={() => navigation.navigate('FileInfo')} testID='fileInfoEntityScreenButton' />
      <RoundedButton text='PagePost' onPress={() => navigation.navigate('PagePost')} testID='pagePostEntityScreenButton' />
      <RoundedButton text='PageProfile' onPress={() => navigation.navigate('PageProfile')} testID='pageProfileEntityScreenButton' />
      <RoundedButton text='GroupPost' onPress={() => navigation.navigate('GroupPost')} testID='groupPostEntityScreenButton' />
      <RoundedButton text='Post' onPress={() => navigation.navigate('Post')} testID='postEntityScreenButton' />
      <RoundedButton text='PostComment' onPress={() => navigation.navigate('PostComment')} testID='postCommentEntityScreenButton' />
      <RoundedButton text='PostLike' onPress={() => navigation.navigate('PostLike')} testID='postLikeEntityScreenButton' />
      <RoundedButton text='GroupProfile' onPress={() => navigation.navigate('GroupProfile')} testID='groupProfileEntityScreenButton' />
      <RoundedButton text='NewsFeed' onPress={() => navigation.navigate('NewsFeed')} testID='newsFeedEntityScreenButton' />
      <RoundedButton text='RankUser' onPress={() => navigation.navigate('RankUser')} testID='rankUserEntityScreenButton' />
      <RoundedButton text='RankGroup' onPress={() => navigation.navigate('RankGroup')} testID='rankGroupEntityScreenButton' />
      <RoundedButton text='Notification' onPress={() => navigation.navigate('Notification')} testID='notificationEntityScreenButton' />
      <RoundedButton text='Album' onPress={() => navigation.navigate('Album')} testID='albumEntityScreenButton' />
      <RoundedButton text='Video' onPress={() => navigation.navigate('Video')} testID='videoEntityScreenButton' />
      <RoundedButton text='Image' onPress={() => navigation.navigate('Image')} testID='imageEntityScreenButton' />
      <RoundedButton text='VideoStream' onPress={() => navigation.navigate('VideoStream')} testID='videoStreamEntityScreenButton' />
      <RoundedButton
        text='VideoLiveStreamBuffer'
        onPress={() => navigation.navigate('VideoLiveStreamBuffer')}
        testID='videoLiveStreamBufferEntityScreenButton'
      />
      <RoundedButton text='TopicInterest' onPress={() => navigation.navigate('TopicInterest')} testID='topicInterestEntityScreenButton' />
      <RoundedButton text='TodoList' onPress={() => navigation.navigate('TodoList')} testID='todoListEntityScreenButton' />
      <RoundedButton text='Event' onPress={() => navigation.navigate('Event')} testID='eventEntityScreenButton' />
      <RoundedButton text='BaseInfo' onPress={() => navigation.navigate('BaseInfo')} testID='baseInfoEntityScreenButton' />
      <RoundedButton text='Permission' onPress={() => navigation.navigate('Permission')} testID='permissionEntityScreenButton' />
      <RoundedButton text='ClassInfo' onPress={() => navigation.navigate('ClassInfo')} testID='classInfoEntityScreenButton' />
      <RoundedButton text='HistoryUpdate' onPress={() => navigation.navigate('HistoryUpdate')} testID='historyUpdateEntityScreenButton' />
      {/* jhipster-react-native-entity-screen-needle */}
    </ScrollView>
  );
}
