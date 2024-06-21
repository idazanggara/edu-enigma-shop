import React from 'react'
import Home from '@/pages/Home/Home'
import Register from './pages/Authentication/Register'
import Login from './pages/Authentication/Login'
import Product from './pages/Product/Product'

class App extends React.Component {
  render() {
    return (
      <>
        <Home />
        <Register />
        <Login />
        <Product />
        <Toasts />
      </>
    )
  }
}

function Toasts() {
  // const toastTrigger = document.getElementById('liveToastBtn')
  // const toastLiveExample = document.getElementById('liveToast')

  // if (toastTrigger) {
  //   const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  //   toastTrigger.addEventListener('click', () => {
  //     toastBootstrap.show()
  //   })
  // }

  const showToast = () => {
    const toastLiveExample = document.getElementById('liveToast')
    // eslint-disable-next-line no-undef
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()

  }

  return (
    <>
      <button onClick={showToast} type="button" className="btn btn-primary" id="liveToastBtn">Show live toast</button>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <img src="..." className="rounded me-2" alt="..." />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>
      </div>
    </>
  )
}

export default App