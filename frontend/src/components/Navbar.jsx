import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  console.log("TOKEN: ",token);
  console.log("ROLE:",role)

  return (
    <nav
      style={{
        padding: "15px",
        background: "#111",
        color: "white",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link to="/" style={{ color: "white" }}>Home</Link>

      {token && (
        <>
          <Link to="/trips" style={{ color: "white" }}>Trips</Link>
        
          
        </>
      )}

      {token && role === "ADMIN" && (
        <>
        <Link to="/create-trip" style={{ color: "white" }}>CreateTrip</Link>,
         <Link to ="admin-trips" style ={{color:"white"}}>ManageTrips</Link>
         </>
       
      )}
      

      {!token ? (
        <>
          <Link to="/login" style={{ color: "white" }}>Login</Link>
          <Link to="/register" style={{ color: "white" }}>Register</Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;