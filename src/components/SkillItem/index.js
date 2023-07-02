import './index.css'

const SkillItem = props => {
  const {skillItem} = props
  const {imageUrl, name} = skillItem

  return (
    <li className="job-item-details-item-container">
      <img className="job-item-details-item-img" src={imageUrl} alt={name} />
      <p className="job-item-details-item-para">{name}</p>
    </li>
  )
}

export default SkillItem
