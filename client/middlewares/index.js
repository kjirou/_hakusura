import { applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';

import serializeActions from './serialize-actions';


const rootMiddleware = applyMiddleware(serializeActions);
//export default applyMiddleware(serializeActions, reduxPromise);

export default rootMiddleware;
