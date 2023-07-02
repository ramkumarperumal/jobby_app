import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import SimilarJobItem from '../SimilarJobItem'
import SkillItem from '../SkillItem'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN PROGRESS',
}

class JobItemDetails extends Component {
  state = {apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getJobDetailsData()
  }

  getJobDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok) {
      this.updatedData = {
        jobDetails: responseData.job_details,
        similarJobs: responseData.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }
      this.updatedData.jobDetails = {
        companyLogoUrl: responseData.job_details.company_logo_url,
        companyWebsiteUrl: responseData.job_details.company_website_url,
        employmentType: responseData.job_details.employment_type,
        id: responseData.job_details.id,
        jobDescription: responseData.job_details.job_description,
        skills: responseData.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: responseData.job_details.life_at_company,
        location: responseData.job_details.location,
        packagePerAnnum: responseData.job_details.package_per_annum,
        rating: responseData.job_details.rating,
        title: responseData.job_details.title,
      }
      this.updatedData.jobDetails.lifeAtCompany = {
        description: responseData.job_details.life_at_company.description,
        imageUrl: responseData.job_details.life_at_company.image_url,
      }

      this.setState({apiStatus: apiStatusConstant.success})
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  retryJobItemDetails = () => {
    this.getJobDetailsData()
  }

  renderSuccessJobsDetails = () => {
    const {jobDetails, similarJobs} = this.updatedData
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-item-details-container">
        <div className="job-item-details-success-container">
          <div className="job-item-details-card-container">
            <div className="job-item-details-logo-name-container">
              <img
                className="job-item-details-company-logo"
                src={companyLogoUrl}
                alt="job details company logo"
              />
              <div className="job-item-details-title-rating-container">
                <h1 className="job-item-details-title">{title}</h1>
                <div className="job-item-details-rating-container">
                  <AiFillStar className="job-item-details-star-img" />
                  <p className="job-item-details-rating-para">{rating}</p>
                </div>
              </div>
            </div>
            <div className="job-item-details-location-emp-package-container">
              <div className="job-item-details-location-container">
                <MdLocationOn className="job-item-details-location-icon" />
                <p className="job-item-details-location-para">{location}</p>
              </div>
              <div className="job-item-details-employee-container">
                <BsBriefcaseFill className="job-item-details-employee-icon" />
                <p className="job-item-details-employee-para">
                  {employmentType}
                </p>
              </div>
              <div className="job-item-details-package-container">
                <p>{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="job-item-details-hr" />
            <div className="job-item-details-description-visit-container">
              <h1 className="job-item-details-description-heading">
                Description
              </h1>

              <a
                href={companyWebsiteUrl}
                className="job-item-details-visit-text"
              >
                <p> Visit</p>
                <BsBoxArrowUpRight className="job-item-details-visit-icon" />
              </a>
            </div>
            <p className="job-item-details-description-para">
              {jobDescription}
            </p>
            <h1 className="job-item-details-description-heading">Skills</h1>
            <ul className="job-item-details-list-container">
              {skills.map(each => (
                <SkillItem skillItem={each} key={each.name} />
              ))}
            </ul>
            <h1 className="job-item-details-description-heading">
              Life at Company
            </h1>
            <div className="job-item-details-life-at-company-para-img-container">
              <p className="job-item-details-description-para">{description}</p>
              <img
                className="job-item-details-life-at-company-image"
                src={imageUrl}
                alt="life at company"
              />
            </div>
          </div>
          <div>
            <h1 className="job-item-details-similar-job-heading">
              Similar Jobs
            </h1>
            <ul className="job-item-details-similar-job-container">
              {similarJobs.map(each => (
                <SimilarJobItem key={each.id} similarJob={each} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderFailureJobDetails = () => (
    <div className="job-item-details-container">
      <div className="job-item-details-failure-container">
        <img
          className="job-item-details-failure-img"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="job-item-details-failure-heading">
          Oops! Something Went Wrong
        </h1>
        <p className="job-item-details-failure-para">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          onClick={this.retryJobItemDetails}
          className="job-item-details-retry-btn"
          type="button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderInProgressJobDetails = () => (
    <div className="job-item-details-container">
      <div className="job-item-details-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessJobsDetails()
      case apiStatusConstant.failure:
        return this.renderFailureJobDetails()
      case apiStatusConstant.inProgress:
        return this.renderInProgressJobDetails()
      default:
        return null
    }
  }
}

export default JobItemDetails
