import { Link } from "react-router-dom"
function Dashboard(){
    return(
        <div className="container">
            <h3>Dashboard Components</h3>
            <h4>Welcome Admin</h4>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link className="nav-link active" to="/dashboard">Skills</Link>
                </li>
            </ul>
        </div>
    )
}
export default Dashboard;