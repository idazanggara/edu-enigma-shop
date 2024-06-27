import { Component } from "react"

const withUiState = (WrappedComponent) => {
  return class HOC extends Component {
    state = {
      isLoading: false,
      isLoadingBefore: false,
    }

    showLoading = () => {
      this.setState({
        isLoading: true
      })
    }
    hideLoading = () => {
      this.setState({
        isLoading: false
      })
    }

    render() {
      return (
        <>
          <WrappedComponent
            {...this.props}
            isLoading={this.state.isLoading}
            showLoading={this.showLoading}
            hideLoading={this.hideLoading}
          />
        </>
      )
    }
  }
}

export default withUiState
