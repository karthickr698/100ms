import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getAllCharacters,
  getSearchData,
  getPaginationCharacters,
} from '../Redux/action'
import { Link } from 'react-router-dom'
import './Home.css'
import ISLoader from './Isloader'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      select: '',
      page: 1,
    }
  }

  handleClick = () => {
    this.props.getSearchData(this.state.search, 'name')
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelect = (e) => {
    this.setState({ select: e.target.value })
    this.props.getSearchData(e.target.value, 'category')
  }

  changePage = (num) => {
    this.setState({ page: num })
    this.props.getPaginationCharacters(num * 10)
  }

  componentDidMount() {
    this.props.getAllCharacters()
  }

  render() {
    const {
      paginationDatas,
      category,
      isLoading,
      isDataLodaing,
      isDataFail,
      isError,
      allCharacterDatas,
    } = this.props

    let paginate = []
    for (let i = 0; i < Math.floor(allCharacterDatas.length / 10); i++) {
      paginate.push(i + 1)
    }

    if (isLoading || isDataLodaing) {
      return (
        <div className="loader">
          <ISLoader />
        </div>
      )
    } else if (isError || isDataFail) {
      return <div>No Data Available</div>
    }
    return (
      <div className="container-fluid">
        <div id="navbar" className="row border shadow-sm py-3">
          <div className="col-sm-12 col-lg-2 my-auto">
            <Link className="pagelinks" to="/">
              <img
                className="ml-0 ml-lg-5"
                width="120px"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCCVBow6nHqwmqwgucuCnL5LJzY2rKS2SKIQ&usqp=CAU"
                alt=" "
              />
            </Link>
          </div>
          <div className="col-sm-12 pt-2 col-lg-10 my-auto h4 text-right font-weight-bold">
            <span className="mr-5">
              <select onChange={this.handleSelect} name="category">
                <option disabled selected>
                  Filter Categories
                </option>
                {category.map((ele) => (
                  <option value={ele}>{ele}</option>
                ))}
              </select>
            </span>
            <span className="mr-sm-0  mr-2 search">
              <input
                name="search"
                type="text"
                placeholder="Search Character"
                value={this.state.search}
                onChange={this.handleChange}
              ></input>
            </span>
            <span className="mr-1">
              <button id="goBtn" onClick={this.handleClick}>
                Go
              </button>
            </span>
          </div>
        </div>
        <div className="row mb-5" style={{ backgroundColor: '#fce1d5' }}>
          {paginationDatas &&
            paginationDatas.map((item) => (
              <div className="col-12 col-sm-6 col-xl-4" key={item.char_id}>
                <div className="col my-4">
                  <div
                    className="card mx-auto shadow"
                    style={{
                      backgroundColor: '#fb6621',
                      width: '24rem',
                      height: '25rem',
                    }}
                  >
                    <img
                      src={item.img}
                      className="card-img-top"
                      style={{ height: '12rem' }}
                      alt=""
                    />
                    <div className="contents">
                      <div>
                        Name :<spam className="name">{item.name}</spam>
                      </div>
                      <div>
                        Occupation :{' '}
                        <spam className="name"> {item.occupation}</spam>
                      </div>
                      <div>
                        Date Of Birth :{' '}
                        <spam className="name"> {item.birthday}</spam>
                      </div>
                      <div>
                        Status : <spam className="name"> {item.status}</spam>
                      </div>
                    </div>
                    <Link id="categoryCard" to={`/${item.char_id}`}>
                      <div
                        className="card-body link"
                        style={{ backgroundColor: '#fb6621' }}
                      >
                        View
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <ul
          className="pagination pagination-lg justify-content-center"
          data-aos="fade-up-right"
          data-aos-offset="140"
          data-aos-delay="100"
          data-aos-duration="200"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          {paginate.map((ele) => {
            return (
              <li className=" active">
                <button
                  className={
                    ele == this.state.page ? 'page-item active' : 'page-item'
                  }
                  onClick={() => {
                    this.changePage(ele)
                  }}
                  key={ele}
                >
                  {ele}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allCharacterDatas: state.allCharacterDatas,
  paginationDatas: state.paginationDatas,
  filterDatas: state.filterDatas,
  category: state.category,
  isLoading: state.isLoading,
  isError: state.isError,
  isDataLodaing: state.isDataLodaing,
  isDataFail: state.isDataFail,
  filterDataLoading: state.filterDataLoading,
})
const mapDispatchToProps = (dispatch) => ({
  getAllCharacters: (item) => dispatch(getAllCharacters()),
  getPaginationCharacters: (num) => dispatch(getPaginationCharacters(num)),
  getSearchData: (value, type) => dispatch(getSearchData(value, type)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)
