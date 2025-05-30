import PolicyTab from "./PolicyTab"
import SliderBanner from "./SliderBanner";
import CustomerDetails from "./CustomerDetails";

const Dashboard=()=>{
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-16">
            <SliderBanner />
            <div className="w-full max-w-4xl p-5">
                <PolicyTab />
                <CustomerDetails/>
                
            </div>
        </div>
    )
}
export default Dashboard;