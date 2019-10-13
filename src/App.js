// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import {MainPage, Home} from 'pages';

// import modules, {rootSaga} from 'modules';
import reducers from './reducers';
import rootSaga from './sagas';

// import 'semantic-ui-css/semantic.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(rootSaga);

const RouteComp = () =>{
	return(
		<Switch>	
				<Route exact path = '/' component={Home}/>
				<Route path="/" component={MainPage}/>		
		</Switch>
	)
}

const App = () =>{
	return (
		<Provider store = {store}>
			<BrowserRouter>
				<RouteComp/>
			</BrowserRouter>
		</Provider>	
	);
}

export default App;