import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css/normalize.css'
import {RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux'
import {router} from "@/router/index"
import store from './store'
import "@/index.scss"
import Init from './init'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   </React.StrictMode>,
    <Provider store={store}>
      <RouterProvider router={router}>
      
      </RouterProvider>
      <Init></Init>
    </Provider>

)
