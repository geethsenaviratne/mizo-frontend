import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
    return (
        <div className="home-container">
            <nav className="navbar">
                <h2>MyApp</h2>
                <button className="logout-btn">Logout</button>
            </nav>

            <div className="home-content">
                <h1>Welcome Back 👋</h1>
                <p>
                    This is your home page. From here you can manage users,
                    view data, and explore features.
                </p>

                <div className="card-container">
                    <div className="card">Dashboard</div>
                    <div className="card">Profile</div>
                    <div className="card">Settings</div>
                </div>
            </div>

            <Link to = "/"> Login </Link>
        </div>
    );
}
