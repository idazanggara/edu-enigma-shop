import { Component } from 'react'
import Loading from '../../shared/components/Loading/Loading'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

const obj = {
  task: 'Makan',
  description: 'Makan Orang-orangan sawah',
  status: false
}
let task = "task"
console.log(obj.task)
console.log(obj[task])
console.log(obj["task"])

class TodoBeforeRefactor extends Component {
  state = {
    form: {
      id: '',
      task: '',
      description: '',
      status: false
    },
    todos: [],
    errors: {
      task: "",
      description: "",
    },
    isLoading: false,
    message: "",
  }

  handleChange = (event) => {
    // console.log("🚀 ~ Todo ~ event:", event)
    const { name, value } = event.target
    // console.log("🚀 ~ Todo ~ value:", value)
    // console.log("🚀 ~ Todo ~ name:", name)
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      }
    })
  }
  handleChangeStatus = (event) => {
    // console.log("🚀 ~ Todo ~ checked:", event.target.checked)
    // console.log("🚀 ~ Todo ~ name:", event.target.name)
    this.setState({
      form: {
        ...this.state.form,
        status: event.target.checked
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // console.log("🚀 ~ Todo ~ form:", this.state.form)

    // error handling
    let errors = {}

    if (this.state.form.task === "") {
      errors.task = "Tugas wajib di isi"
    }
    if (this.state.form.description === "") {
      errors.description = "Deskripsi wajib di isi"
    }

    this.setState({
      errors: errors,
    })
    // error
    if (Object.keys(errors).length > 0) return

    const todos = this.state.todos
    // ["donat1","donat2"]
    // todos.push("donat3")
    // todos.push("donat4")
    // ["donat1","donat2", "donat3", "donat4"]
    if (this.state.form.id) {
      // TODO: Update
      const index = todos.findIndex((todo) => todo.id === this.state.form.id)
      const todo = {
        ...this.state.form,
      }
      todos.splice(index, 1, todo)
      this.setState({
        todos: todos
      })
    } else {
      // TODO: Create
      const todo = {
        ...this.state.form,
        id: new Date().getMilliseconds().toString()
      }
      todos.push(todo)
      this.setState({
        todos: todos
      })
    }

    this.clearForm()
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.setState({
        todos: [
          {
            id: new Date().getMilliseconds().toString(),
            task: 'Makan',
            description: 'Makan Orang-orangan sawah',
            status: true
          }
        ]
      })
      this.setState({ isLoading: false })
    }, 3000)
  }

  handleDelete = (id) => {
    if (!confirm(`Apakah anda yakin ingin menghapus tugas ini ${id}? `)) return
    const todos = this.state.todos.filter((todo) => todo.id !== id)
    this.setState({
      todos: todos
    })
  }
  clearForm = () => {
    this.setState({
      form: {
        id: '',
        task: '',
        description: '',
        status: false
      }
    })
  }
  handleSelectedTodoForEdit = (todo) => {
    this.setState({ form: todo })
  }
  render() {
    console.log("🚀 ~ Todo ~ todos:", this.state.todos)
    if (this.state.isLoading) {
      return (
        <Loading />
      )
    }

    return (
      <div className='container-fluid pt-4 px-4 position-relative' >
        <div className={`${this.state.message && "show"} toast position-absolute top-0 end-0 me-4 mt-4 align-items-center text-bg-primary border-0`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              {this.state.message}
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>

        <h1>Todo</h1>
        {/* Form */}
        <TodoForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleChangeStatus={this.handleChangeStatus}
          clearForm={this.clearForm}
          form={this.state.form}
          errors={this.state.errors}
        />


        {/* List */}
        <TodoList
          handleSelectedTodoForEdit={this.handleSelectedTodoForEdit}
          handleDelete={this.handleDelete}
          todos={this.state.todos}
        />
      </div>
    )
  }
}

export default TodoBeforeRefactor
