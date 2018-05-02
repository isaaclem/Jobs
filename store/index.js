import { compose, applyMiddleware } from 'redux';
import Reactotron from 'reactotron-react-native';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import '../ReactotronConfig';

const store = Reactotron.createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
