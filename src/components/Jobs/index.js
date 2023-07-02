import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import JobItem from '../JobItem'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}
class Jobs extends Component {
  state = {
    searchInput: '',
    employmentType: [],
    salaryRange: '',
    apiStatus: apiStatusConstant.initial,
    jobsData: [],
    profileData: {},
  }

  componentDidMount() {
    this.getUserData()
    this.getJobsData()
  }

  getUserData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    if (response.ok) {
      const profileData = {
        name: responseData.profile_details.name,
        profileImageUrl: responseData.profile_details.profile_image_url,
        shortBio: responseData.profile_details.short_bio,
      }
      this.setState({profileData})
    }
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {searchInput, employmentType, salaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const {jobs} = data
      const updatedJobs = jobs.map(each => ({
        id: each.id,
        title: each.title,
        rating: each.rating,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
      }))
      this.setState({
        apiStatus: apiStatusConstant.success,
        jobsData: updatedJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  reloadUserProfile = () => {
    this.getUserData()
  }

  addEmploymentType = event => {
    const {employmentType} = this.state
    if (!employmentType.includes(event.target.id)) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.id],
        }),
        this.getJobsData,
      )
    } else {
      const updatedEmploymentType = employmentType.filter(
        each => each !== event.target.id,
      )
      this.setState({employmentType: updatedEmploymentType}, this.getJobsData)
    }
  }

  changeSalaryRange = event => {
    this.setState({salaryRange: event.target.id}, this.getJobsData)
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  clickSearchButton = () => {
    this.getJobsData()
  }

  renderProfileCard = () => {
    const {profileData} = this.state
    if (profileData.profileImageUrl === undefined) {
      return (
        <div className="jobs-profile-card-retry-container">
          <button
            className="jobs-profile-card-retry-btn"
            onClick={this.reloadUserProfile}
            type="button"
          >
            Retry
          </button>
        </div>
      )
    }
    return (
      <div className="jobs-profile-card-bg-container">
        <img
          className="jobs-profile-card-image"
          src={profileData.profileImageUrl}
          alt="profile"
        />
        <h1 className="jobs-profile-card-name">{profileData.name}</h1>
        <p className="jobs-profile-card-bio">{profileData.shortBio}</p>
      </div>
    )
  }

  renderEmploymentTypeFilter = () => {
    const {employmentTypesList} = this.props
    const {employmentType} = this.state
    return (
      <div className="jobs-filter-type-container">
        <h1 className="jobs-filter-title">Type of Employment</h1>
        <ul className="jobs-filter-list-container">
          {employmentTypesList.map(each => {
            const isChecked = employmentType.includes(each.employmentTypeId)
              ? 'checked'
              : ''
            return (
              <li
                className="jobs-filter-item-container"
                key={each.employmentTypeId}
              >
                <input
                  className="jobs-filter-input"
                  checked={isChecked}
                  onClick={this.addEmploymentType}
                  type="checkbox"
                  id={each.employmentTypeId}
                />
                <label
                  className="jobs-filter-label"
                  htmlFor={each.employmentTypeId}
                >
                  {each.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderSalaryFilter = () => {
    const {salaryRangesList} = this.props
    return (
      <div className="jobs-filter-type-container">
        <h1 className="jobs-filter-title">Salary Range</h1>
        <ul className="jobs-filter-list-container">
          {salaryRangesList.map(each => {
            const {salaryRange} = this.state
            const isSelected = each.salaryRangeId === salaryRange
            return (
              <li
                className="jobs-filter-item-container"
                key={each.salaryRangeId}
              >
                <input
                  className="jobs-filter-input"
                  checked={isSelected}
                  onClick={this.changeSalaryRange}
                  name="salaryRadio"
                  type="radio"
                  id={each.salaryRangeId}
                />
                <label
                  className="jobs-filter-label"
                  htmlFor={each.salaryRangeId}
                >
                  {each.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  retryJobLoading = () => {
    this.getJobsData()
  }

  renderInProgress = () => (
    <>
      <div className="jobs-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderSuccess = () => {
    const {jobsData} = this.state
    return (
      <>
        <div className="jobs-job-list-container">
          {jobsData.length > 0 ? (
            <ul className="jobs-job-ul-container">
              {jobsData.map(each => (
                <JobItem key={each.id} jobDetails={each} />
              ))}
            </ul>
          ) : (
            <div className="jobs-nojob-container">
              <img
                className="jobs-nojob-image"
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
              />
              <h1 className="jobs-nojob-heading">No Jobs Found</h1>
              <p className="jobs-no-job-para">
                We could not find any jobs. Try other filters
              </p>
            </div>
          )}
        </div>
      </>
    )
  }

  renderFailure = () => (
    <>
      <div className="jobs-failure-container">
        <img
          className="jobs-failure-img"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
        <p className="jobs-failure-para">
          We cannot seem to find the page you are looking for
        </p>
        <button
          className="jobs-failure-button"
          type="button"
          onClick={this.retryJobLoading}
        >
          Retry
        </button>
      </div>
    </>
  )

  renderJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccess()
      case apiStatusConstant.failure:
        return this.renderFailure()
      case apiStatusConstant.inProgress:
        return this.renderInProgress()

      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <div className="jobs-bg-container">
          <div className="job-sm-search-input-container">
            <input
              className="job-search-input"
              onChange={this.changeSearchInput}
              type="search"
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="jobs-search-btn"
              onClick={this.clickSearchButton}
              type="button"
              data-testid="searchButton"
            >
              <BsSearch className="job-search-icon" />
            </button>
          </div>
          <div className="jobs-success-profile-filter-container">
            {this.renderProfileCard()}
            <hr className="jobs-hr" />
            {this.renderEmploymentTypeFilter()}
            <hr className="jobs-hr" />
            {this.renderSalaryFilter()}
          </div>
          <div className="jobs-aside-filter-container">
            <div className="job-lg-search-input-container">
              <input
                className="job-search-input"
                onChange={this.changeSearchInput}
                type="search"
                value={searchInput}
                placeholder="Search"
              />
              <button
                className="jobs-search-btn"
                onClick={this.clickSearchButton}
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="job-search-icon" />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
