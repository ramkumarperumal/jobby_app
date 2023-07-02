import {Link} from 'react-router-dom'
import './index.css'

const Home = () => (
  <>
    <div className="home-bg-container">
      <div className="home-content-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link className="link" to="/jobs">
          <button type="button" className="home-find-job-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
