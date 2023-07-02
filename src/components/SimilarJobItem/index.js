import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob

  return (
    <li className="similar-job-item-container">
      <img
        className="similar-job-company-logo"
        src={companyLogoUrl}
        alt="similar job company logo"
      />
      <div className="similar-job-title-rating-container">
        <h1 className="similar-job-title">{title}</h1>
        <div className="similar-job-rating-container">
          <AiFillStar className="similar-job-star-img" />
          <p className="similar-job-rating-para">{rating}</p>
        </div>
      </div>

      <hr className="similar-job-hr" />

      <h1 className="similar-job-description-heading">Description</h1>

      <p className="similar-job-description-para">{jobDescription}</p>
      <div className="similar-job-location-emp-package-container">
        <div className="similar-job-location-container">
          <MdLocationOn className="similar-job-location-icon" />
          <p className="similar-job-location-para">{location}</p>
        </div>
        <div className="similar-job-employee-container">
          <BsBriefcaseFill className="similar-job-employee-icon" />
          <p className="similar-job-employee-para">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
