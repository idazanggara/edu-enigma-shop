/* eslint-disable no-unused-vars */
import React from 'react'
import Home from '@/pages/Home/Home'
import Register from './pages/Authentication/Register'
import Login from './pages/Authentication/Login'
import Product from './pages/Product/Product'
import Lifecycle from './pages/Lifecycle/Lifecycle'
import Sidebar from './shared/components/Sidebar/Sidebar'
import Header from './shared/components/Header/Header'
import Dashboard from './pages/Dashboard/Dashboard'
import Todo from './pages/Todo/Todo'

class App extends React.Component {
  state = {
    // page: <Todo test="Hello World!" />,
    page: <Dashboard />,
    isAuthenticated: true,
  }

  handleAuthenticated = (status) => {
    this.setState({
      isAuthenticated: status,
    })
  }

  handlePages = (page) => {
    // console.log("🚀 ~ App ~ event:", event)
    this.setState({
      page: page
    })
  }
  navigateTo = (page) => {
    this.setState({
      page: page
    })
  }
  render() {
    const { isAuthenticated, page } = this.state
    return (
      <>
        {
          isAuthenticated
            ?
            <div className="d-flex">
              <Sidebar
                navigateTo={this.navigateTo}
                handleAuthenticated={this.handleAuthenticated}
              />
              <main className="w-100 flex-grow-1">
                <Header handleAuthenticated={this.handleAuthenticated} />
                {page}
              </main>
            </div>
            :
            <Login handleAuthenticated={this.handleAuthenticated} />
        }
      </>
    )
  }
}


// {/* <Lifecycle /> */ }
// {/* <button onClick={() => this.handlePages(<Lifecycle />)}>Show Lifecycle</button> */ }
// {/* <Home /> */ }
// {/* <button onClick={() => this.setState({ page: <Home /> })}>Show Home</button> */ }
// {/* <Register /> */ }
// {/* <button onClick={() => this.setState({ page: <Register /> })}>Show Register</button> */ }
// {/* <Login /> */ }
// {/* <button onClick={() => this.setState({ page: <Login /> })}>Show Login</button> */ }
// {/* <Product /> */ }
// {/* <button onClick={() => this.setState({ page: <Product /> })}>Show Product</button> */ }
// {/* <Toasts /> */ }
// {/* <button onClick={() => this.setState({ page: <Toasts /> })}>Show Toasts</button> */ }
// {/* {this.state.page} */ }
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
            <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="rounded me-2 w-25 h-25" alt="Toasts" />
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

/**
 * Component React dibagi 2
 * 1. Statefull component
 * - Component yg menyediakan state untuk menyimpan data, memiliki react lifecycle
 * 2. Stateless component
 * - Component yg tidak mempunyai state dan tidak ada react lifecycle
 * - Hooks: dengan hooks bisa membuat statless component menjadi seperti stateful component
 */