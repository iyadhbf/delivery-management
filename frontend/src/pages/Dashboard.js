const Dashboard = () => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
  
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = "/login";
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to the Dashboard, {role}
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  };
  
  export default Dashboard;
  