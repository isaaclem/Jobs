import { compose, applyMiddleware } from 'redux';
import Reactotron from 'reactotron-react-native';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';
import '../ReactotronConfig';

const store = Reactotron.createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);

persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });
export default store;
