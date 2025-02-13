import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// import '../public/assets/css/index.css';
import App from './App';
import { store } from './Reducer/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Provider store={store}>
    <Suspense fallback={<span>Loading....</span>}>
      <App />
    </Suspense>
  </Provider>

);
