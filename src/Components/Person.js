import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuotes, getIndividualCharacters } from '../Redux/action'
import ISLoader from './Isloader'
import './Home.css'

class Home extends Component {
  componentDidMount() {
    this.props.getIndividualCharacters(this.props.match.params.name)
  }
  render() {
    const {
      isLoading,
      isDataLodaing,
      isDataFail,
      isError,
      personData,
      quotes,
    } = this.props

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
      <div style={{ backgroundColor: '#fce1d5', marginBottom: '1rem' }}>
        {personData && (
          <div key={personData.char_id}>
            <h1 className="meal" className="text-center">
              {personData.name}
            </h1>
            <div className="row">
              <div className="col-sm-12 col-lg-4 text-center">
                <img
                  width="540px"
                  className="img-fluid"
                  src={personData.img}
                  alt=""
                />
              </div>
              <div
                className="col-sm-12 col-lg-8 pl-4"
                style={{ fontSize: '21px' }}
              >
                <div className="mb-3">
                  <span className="meal">Date Of Birth: </span>
                  <span>{personData.birthday}</span>
                </div>
                {personData.occupation ? (
                  <div className="mb-3">
                    <span className="meal">Occupation: </span>
                    <span>{personData.occupation.toString()}</span>
                  </div>
                ) : null}
                <div className="mb-3">
                  <span className="meal">Status: </span>
                  <span>{personData.status}</span>
                </div>
                {personData.nickname ? (
                  <div className="mb-3">
                    <span className="meal">Nickname: </span>
                    <span>{personData.nickname}</span>
                  </div>
                ) : null}
                <div className="mb-3">
                  <span className="meal">Portrays: </span>
                  <span>{personData.portrayed}</span>
                </div>
                {personData.appearance ? (
                  <div className="mb-3">
                    <span className="meal">Seasons: </span>
                    <span>{personData.appearance.toString()}</span>
                  </div>
                ) : null}
                <div className="meal">Quotes</div>
                {quotes &&
                  quotes.map((ele, i) => (
                    <div className="pl-4">
                      {i + 1} : {ele.quote}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  isError: state.isError,
  isDataLodaing: state.isDataLodaing,
  isDataFail: state.isDataFail,
  personData: state.personData,
  quotes: state.quotes,
})
const mapDispatchToProps = (dispatch) => ({
  getIndividualCharacters: (name) => dispatch(getIndividualCharacters(name)),
  getQuotes: (name) => dispatch(getQuotes(name)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)
