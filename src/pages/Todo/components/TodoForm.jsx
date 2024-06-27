import { Component } from 'react'
import PropTypes from 'prop-types'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { IconRefresh } from '@tabler/icons-react'
// props yg dikirim
// method:
// - handleSubmit
// - handleChange
// - handleChangeStatus
// - clearForm

// state
// - form
// - errors


class TodoForm extends Component {

  render() {
    const {
      handleSubmit,
      handleChange,
      handleChangeStatus,
      clearForm,
      form,
      errors,
    } = this.props
    return (
      <form onSubmit={handleSubmit} className='shadow p-4 rounded-2' >
        {/* Input Tugas */}
        <div className="mb-3" >
          <label htmlFor="task" className="form-label">Tugas</label>
          <input
            name="task"
            onChange={handleChange}
            value={form.task}
            type="text"
            // className="form-control"
            className={`form-control ${errors.task && "is-invalid"}`}
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
            value={form.description}
            onChange={handleChange}
            name="description"
            // className="form-control"
            className={`form-control ${errors.task && "is-invalid"}`}
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
            onChange={handleChangeStatus}
            name='status'
            checked={form.status}
            className="form-check-input" type="checkbox" value="" id="status" />
          <label className="form-check-label" htmlFor="status">
            Selesai
          </label>
        </div>
        {/* Button */}
        <div className="d-flex gap-2 mt-4" >
          <button type="submit" className="btn btn-primary"> <i><IconDeviceFloppy /></i> Submit</button>
          <button type="reset" className="btn btn-secondary" onClick={clearForm}><i><IconRefresh /></i> Reset</button>
        </div>
      </form>
    )
  }
}

export default TodoForm

TodoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}