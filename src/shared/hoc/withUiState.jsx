import { Component } from "react"
import Toast from "../components/Toast/Toast"

const withUiState = (WrappedComponent) => {
  return class HOC extends Component {
    state = {
      isLoading: false,
      showToast: false,
      toastMessage: "",
      toastColor: "primary",
    };

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
    showToast = (message, color) => {
      this.setState({
        showToast: true,
        toastMessage: message,
        toastColor: color || this.state.toastColor,
      })

      setTimeout(() => {
        this.setState({ showToast: false })
      }, 4000)
    };

    render() {
      return (
        <>
          {this.state.showToast && (
            <Toast
              message={this.state.toastMessage}
              color={this.state.toastColor}
            />
          )}
          <WrappedComponent
            {...this.props}
            isLoading={this.state.isLoading}
            showLoading={this.showLoading}
            hideLoading={this.hideLoading}
            showToast={this.showToast}
          />
        </>
      )
    }
  }
}

export default withUiState
