import { IconLoader } from '@tabler/icons-react'
import { Component } from 'react'

class Loading extends Component {
  render() {
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
}

export default Loading
