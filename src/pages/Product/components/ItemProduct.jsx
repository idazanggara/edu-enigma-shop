import { IconHeart, IconShoppingCart } from '@tabler/icons-react'
import { Component } from 'react'
import PropTypes from 'prop-types'
import { IconHeartFilled } from '@tabler/icons-react'



class ItemProduct extends Component {
  // cara panggil props gimana?
  // constructor(props) {
  //   super(props)
  //   // this.state = {
  //   //   count: 11,
  //   // }

  //   // this.handleDecrement = this.handleDecrement.bind(this)
  //   // this.handleIncrement = this.handleIncrement.bind(this)
  // }

  state = {
    count: 0,
    isSaved: false,
  }

  handleIncrement = () => {
    this.setState({
      count: this.state.count + 1
    })
    // console.log("🚀 ~ ItemProduct ~ handleIncrement ~ this:", this)
  }

  handleDecrement = () => {
    if (this.state.count === 0) return
    this.setState({
      count: this.state.count - 1
    })
    // console.log("🚀 ~ ItemProduct ~ handleDecrement ~ this:", this)
  }
  handleChangeSaved = () => {
    this.setState({
      isSaved: !this.state.isSaved
    }, () => {
      this.props.changeSavedCount(this.state.isSaved === true ? 1 : -1)
    })
  }

  // React Lifecycle
  constructor(props) {
    super(props)
    console.log("Called from constructor")
  }
  // ini sering digunakan pada saat fetch data menggunakan API
  componentDidMount() {
    console.log("Called from componentDidMount")
  }

  // ini ketika ada perubahan state
  componentDidUpdate() {
    console.log("Called from componentDidUpdate")
  }

  componentWillUnmount() {
    console.log("Called from componentWillUnmount")
  }

  render() {
    console.log("Called from render")
    const { image, title, price } = this.props
    // console.log("🚀 ~ ItemProduct ~ render ~ this:", this)
    // console.log("🚀 ~ ItemProduct ~ render ~ handleDecrement:", this.handleDecrement)


    return (
      <div className='card shadow-sm h-100'>
        {/* <img src="https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//98/MTA-10906782/beng-beng_beng-beng-coklat-wafer-20g_full01.jpg" alt="bengbeng" className="card-img-top h-50 object-fit-contain" /> */}
        <img
          src={image}
          alt={title}
          className="card-img-top h-50 object-fit-contain" />

        <div className="card-body">
          <h5 className="card-title fw-light">{title}</h5>
          <p className="fw-bold">Rp. {price}</p>
        </div>
        {/* .d-flex.justify-content-between.p-2>.d-flex.align-items-center.justify-content-start.column-gap-4>button.d-flex.align-items-center.column-gap-2.btn.btn-primary{Tambah Keranjang}+button.btn.btn-primary{-}+span{0}+button.btn.btn-primary{+}^button.btn.btn-link>i{<IconHeart />} */}
        <div className="d-flex justify-content-between p-2">
          <div className="d-flex align-items-center justify-content-start column-gap-4">
            {this.state.count === 0 ? (
              <button
                className="d-flex align-items-center column-gap-2 btn btn-primary"
                onClick={this.handleIncrement}
              >
                <IconShoppingCart /> Tambah Keranjang
              </button>
            ) : (
              <>
                <button
                  className="btn btn-primary"
                  onClick={this.handleDecrement}
                >
                  -
                </button>
                <span>{this.state.count}</span>
                <button
                  onClick={this.handleIncrement}
                  className="btn btn-primary"
                >
                  +
                </button>
              </>
            )}
          </div>
          <button onClick={this.handleChangeSaved}
            className="btn btn-link"
          >
            <i>
              {this.state.isSaved ? <IconHeartFilled /> : <IconHeart />}
            </i>
          </button>
        </div>
      </div>
    )
  }
}

export default ItemProduct

ItemProduct.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  changeSavedCount: PropTypes.func.isRequired,
}