import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
  } = jobDetails

  return (
    <Link className="jobItem-link" to={`/jobs/${id}`}>
      <li className="jobItem-container">
        <div className="jobItem-logo-name-container">
          <img
            className="jobItem-company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="jobItem-title-rating-container">
            <h1 className="jobItem-title">{title}</h1>
            <div className="jobItem-rating-container">
              <AiFillStar className="jobItem-star-img" />
              <p className="jobItem-rating-para">{rating}</p>
            </div>
          </div>
        </div>
        <div className="jobItem-location-emp-package-container">
          <div className="jobItem-location-container">
            <MdLocationOn className="jobItem-location-icon" />
            <p className="jobItem-location-para">{location}</p>
          </div>
          <div className="jobItem-employee-container">
            <BsBriefcaseFill className="jobItem-employee-icon" />
            <p className="jobItem-employee-para">{employmentType}</p>
          </div>
          <div className="jobItem-package-container">
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="jobItem-hr" />
        <h1 className="jobItem-description-heading">Description</h1>
        <p className="jobItem-description-para">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
