import { Component } from 'react'
import Loading from '../../shared/components/Loading/Loading'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import LoadingAnimation from '../../shared/components/Animations/LoadingAnimation'
import withUiState from '../../shared/hoc/withUiState'
import PropTypes from 'prop-types'

class Todo extends Component {
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
    // isLoadingAnimation: false, // setelah HOC kita tidak perlu buat isLoadingAnimation lagi
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      }
    })
  }
  handleChangeStatus = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        status: event.target.checked
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

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
    if (Object.keys(errors).length > 0) return
    // error

    const todos = this.state.todos
    // this.setState({ isLoadingAnimation: true })
    this.props.showLoading()
    setTimeout(() => {
      if (this.state.form.id) {
        // TODO: Update
        const index = todos.findIndex((todo) => todo.id === this.state.form.id)
        const todo = {
          ...this.state.form,
        }
        todos.splice(index, 1, todo)
        this.setState({
          todos: todos,
          message: "Berhasil di update Todo!",
        })
      } else {
        // TODO: Create
        const todo = {
          ...this.state.form,
          id: new Date().getMilliseconds().toString()
        }
        todos.push(todo)
        this.setState({
          todos: todos,
          message: "Berhasil di tambahkan Todo!",
        })
      }
      this.clearForm()
      // this.setState({ isLoadingAnimation: false })
      this.props.hideLoading()
    }, 2000)
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

    this.props.showLoading()
    setTimeout(() => {
      const todos = this.state.todos.filter((todo) => todo.id !== id)
      this.setState({
        todos: todos
      })
      this.props.hideLoading()
    }, 2000)
  }
  clearForm = () => {
    this.setState({
      form: {
        id: '',
        task: '',
        description: '',
        status: false
      },
    },
      () => {
        setTimeout(() => {
          this.setState({ message: "" })
        }, 2000)
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
        {/* Toasts */}
        <div className={`${this.state.message && "show"} toast position-absolute top-0 end-0 me-4 mt-4 align-items-center text-bg-primary border-0`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              {this.state.message}
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>

        {/* {this.props.test + "uuuuu"} */}
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
        {
          this.props.isLoading
          &&
          <LoadingAnimation />
          ||
          <TodoList
            handleSelectedTodoForEdit={this.handleSelectedTodoForEdit}
            handleDelete={this.handleDelete}
            todos={this.state.todos}
          />
        }
        {
          this.props.isLoading
            ?
            <LoadingAnimation />
            :
            <TodoList
              handleSelectedTodoForEdit={this.handleSelectedTodoForEdit}
              handleDelete={this.handleDelete}
              todos={this.state.todos}
            />
        }
      </div>
    )
  }
}
Todo.propTypes = {
  isLoading: PropTypes.bool,
  showLoading: PropTypes.func,
  hideLoading: PropTypes.func,
}

const TodoComponent = withUiState(Todo)
// GrandParent -> Parent -> Child
// const TodoComponent = withAlert(withUiState(Todo))

export default TodoComponent
