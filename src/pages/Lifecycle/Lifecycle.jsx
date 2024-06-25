import { IconLoader } from '@tabler/icons-react'
import { Component } from 'react'
import SubLifecycle from './SubLifecycle'

class Lifecycle extends Component {
  state = {
    todo: "Rebahan",
    isLoading: false,
    isShow: false,
  }

  // ibarat sendang mengabil data dari API
  // API
  componentDidMount() {
    console.log("Called from componentDidMount")
    this.setState({
      isLoading: true
    })

    this.getTodo()
      .then((todoParam) => {
        this.setState({
          todo: todoParam,
          isLoading: false
        })
      })


  }
  handleChangeValue = (todo) => {
    console.log(todo)
    this.setState({
      // todo: todo
      todo
    })
  }

  // simulasi ngambil API yg butuh waktu
  getTodo = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Makan')
      }, 3000)
    })
  }
  render() {
    console.log("Called from render")

    if (this.state.isLoading) {
      return (
        <div className="spinner-container">
          <i>
            <IconLoader
              size={48}
              stroke={1.5}
              style={{ animation: "spin 2s linear infinite" }}
            />
          </i>
        </div>
      )
    }

    return (
      <div>
        {/* <h1>{this.state.isLoading ? "Loading..." : `Lifecycle : ${this.state.todo}`}</h1> */}
        <h1> Lifecycle : {this.state.todo}</h1>
        <button onClick={() => this.setState({ isShow: !this.state.isShow })}>Show And Close Child Component</button>
        {/* react conditional rendering */}
        {/* https://developer.mozilla.org/en-US/docs/Glossary/Falsy */}
        {/*
          && Short Circuit Operator / Condition Rendering yg digunakan untuk mempersingkat kondisi
          || Short Circuit Operator / Condition Rendering yg digunakan untuk memberikan defaul value
         */}
        {this.state.isShow && <SubLifecycle changeValue={this.handleChangeValue} />}
        {/* {false && "sebuah data"}
        {true && "sebuah data true"}

        {"Ini adalah sebelah kiri" || "Ini adalah sebelah kanan ini adalah defaul"}
        {false || "Ini adalah sebelah kanan ini adalah defaul"} */}
      </div>
    )
  }
}

export default Lifecycle
