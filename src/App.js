import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelGuide from './TravelGuide'
import './App.css'

class App extends Component {
  state = {
    isLoading: true,
    dataList: [],
    error: null, // Add error state
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    try {
      const url = 'https://apis.ccbp.in/tg/packages'
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      const formatData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({dataList: formatData, isLoading: false})
    } catch (error) {
      this.setState({error: error.message, isLoading: false})
    }
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {dataList} = this.state
    return (
      <ul className="list-con">
        {dataList.map(e => (
          <TravelGuide details={e} key={e.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, error} = this.state

    if (isLoading) {
      return this.loadingView()
    }

    if (error) {
      return <div>Error: {error}</div>
    }

    return (
      <div className="main-con">
        <h1 className="heading">Travel Guide</h1>
        <div className="jp">{this.successView()}</div>
      </div>
    )
  }
}

export default App
