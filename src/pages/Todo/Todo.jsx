import { IconRefresh } from '@tabler/icons-react'
import { IconTrash } from '@tabler/icons-react'
import { IconEdit } from '@tabler/icons-react'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { Component } from 'react'
import Loading from '../../shared/components/Loading/Loading'

const obj = {
  task: 'Makan',
  description: 'Makan Orang-orangan sawah',
  status: false
}
let task = "task"
console.log(obj.task)
console.log(obj[task])
console.log(obj["task"])

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
  render() {
    console.log("🚀 ~ Todo ~ todos:", this.state.todos)
    if (this.state.isLoading) {
      return (
        <Loading />
      )
    }

    return (
      <div className='container-fluid pt-4 px-4' >
        <h1>Todo</h1>
        {/* Form */}
        <form onSubmit={this.handleSubmit} className='shadow p-4 rounded-2' >
          {/* Input Tugas */}
          <div className="mb-3" >
            <label htmlFor="task" className="form-label">Tugas</label>
            <input
              name="task"
              onChange={this.handleChange}
              value={this.state.form.task}
              type="text"
              // className="form-control"
              className={`form-control ${this.state.errors.task && "is-invalid"}`}
              id="task"
              placeholder="Tugas yg berat kita kesana dengan seorang anak"
            />
            {/* validasi */}
            <div
              id="validationServerUsernameFeedback"
              className="invalid-feedback"
            >
              Tugas wajib di isi!.
            </div>
          </div>
          {/* Input Deskripsi */}
          <div className="mb-3" >
            <label htmlFor="description" className="form-label">Deskripsi</label>
            <textarea
              value={this.state.form.description}
              onChange={this.handleChange}
              name="description"
              // className="form-control"
              className={`form-control ${this.state.errors.task && "is-invalid"}`}
              id="description" rows="3">
            </textarea>
            {/* validasi */}
            <div
              id="validationServerUsernameFeedback"
              className="invalid-feedback"
            >
              Deskripsi wajib di isi!.
            </div>
          </div>
          {/* Input Selesai / checklist */}
          <div className="form-check" >
            <input
              onChange={this.handleChangeStatus}
              name='status'
              checked={this.state.form.status}
              className="form-check-input" type="checkbox" value="" id="status" />
            <label className="form-check-label" htmlFor="status">
              Selesai
            </label>
          </div>
          {/* Button */}
          <div className="d-flex gap-2 mt-4" >
            <button type="submit" className="btn btn-primary"> <i><IconDeviceFloppy /></i> Submit</button>
            <button type="reset" className="btn btn-secondary" onClick={this.clearForm}><i><IconRefresh /></i> Reset</button>
          </div>
        </form>


        {/* List */}
        <div className='shadow p-4 rounded-2 mt-4' >
          <h3>List Todo</h3>
          <div className="table-responsive">
            <table className="table">
              <thead className='text-center'>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Tugas</th>
                  <th scope="col">Deskripsi</th>
                  <th scope="col">Selesai</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody className='text-center align-middle'>
                {
                  this.state.todos.map((todo, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1} {todo.id}</th>
                        <td>{todo.task}</td>
                        <td>{todo.description}</td>
                        <td>
                          <span className={`badge text-white ${todo.status ? 'text-bg-success' : 'text-bg-danger'}`}>
                            {todo.status ? 'Selesai' : 'Belum Selesai'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2 d-flex justify-content-center">
                            <button
                              onClick={() => { this.setState({ form: todo }) }}
                              className="btn btn-primary"
                            >
                              <IconEdit size={22} />
                            </button>
                            <button
                              // (event) => {
                              //    this.handleDelete(event)
                              // }
                              // onClick={this.handleDelete}
                              onClick={() => { this.handleDelete(todo.id) }}

                              className="btn btn-danger text-white"
                            >
                              <IconTrash size={22} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Todo
