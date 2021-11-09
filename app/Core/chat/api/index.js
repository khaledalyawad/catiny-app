// Uncomment these if you want to remove firebase and add your own custom backend:
import * as channelManager from './local/channel';
import ChannelsTracker from './local/channelsTracker';
import SingleChannelTracker from './local/singleChannelTracker';

// Remove these lines if you want to remove firebase and a different custom backend:
// import * as channelManager from './firebase/channel';
// import ChannelsTracker from './firebase/channelsTracker';
// import SingleChannelTracker from './firebase/singleChannelTracker';

export {channelManager, ChannelsTracker, SingleChannelTracker};
