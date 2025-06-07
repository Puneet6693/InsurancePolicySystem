// import PolicyTab from "./PolicyTab"
// import SliderBanner from "./SliderBanner";

// //import CustomerGetAll from "./CustomerGetAll";
// import AddCustomerForm from "./AddCustomer";

// const Dashboard=()=>{
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-16">
//             <SliderBanner />
//             <div className="w-full max-w-4xl p-5">
//                 <PolicyTab />
                
//             </div>
//         </div>
//     )
// }
// export default Dashboard;



import PolicyTab from "./PolicyTab";
import SliderBanner from "./SliderBanner";
import { useState, useEffect , useContext} from "react";
import { StoreContext } from "../services/StoreContext";
import AddCustomer from "./AddCustomer";


const Dashboard = () => {  const { token } = useContext(StoreContext);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const checkProfileStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7251/IsProfileComplete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const isComplete = await response.json();
      // console.log("Profile status:", isComplete);
      setIsProfileComplete(isComplete);
    } catch (error) {
      console.error("Error checking profile status:", error);
    } finally {
      setLoading(false);
    }
  };

  checkProfileStatus();
}, []);
  return loading ? (
    <div className="flex items-center justify-center min-h-screenC">
      <p className="text-xl font-semibold text-gray-700">Loading...</p>
    </div>
  ) : !isProfileComplete && token ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AddCustomer />
    </div>
  ) : (
    <div className="pt-12 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
        Welcome to Our Insurance Portal
      </h1>
      <SliderBanner />
      <div className="w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Explore Our Policies
        </h2>
        <PolicyTab />
        
      </div>
    </div>
  );
};

export default Dashboard;