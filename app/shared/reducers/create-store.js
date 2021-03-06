import {applyMiddleware, compose as composeWithoutDevTools, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

import AppConfig from '../../config/app-config';
import RehydrationServices from '../services/rehydration.service';
import ReduxPersist from '../../config/redux-persist';
import WebsocketService from '../websockets/websocket.service';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const logger = createLogger();

const compose = AppConfig.debugMode ? composeWithDevTools : composeWithoutDevTools;
// creates the store
export default (rootReducer, rootSaga) =>
{
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = null;
  const sagaMiddleware = createSagaMiddleware({sagaMonitor});
  middleware.push(sagaMiddleware);
  const wsSagaMiddleware = createSagaMiddleware(WebsocketService.websocketSagas);
  middleware.push(wsSagaMiddleware);

  /* ------------- Thunk Middleware ------------- */
  middleware.push(thunk);
  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware /*, logger*/));

  const store = createStore(rootReducer, compose(...enhancers));

  // configure persistStore and check reducer version number
  if (ReduxPersist.active)
  {
    RehydrationServices.updateReducers(store);
  }

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga);
  let websocketSagaManager = wsSagaMiddleware.run(WebsocketService.websocketSagas);

  return {
    store,
    sagasManager,
    websocketSagaManager,
    sagaMiddleware,
    thunk,
  };
};
