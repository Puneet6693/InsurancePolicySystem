import PolicyTab from "./PolicyTab"
import SliderBanner from "./SliderBanner";

import CustomerGetAll from "./CustomerGetAll";
import AddCustomerForm from "./AddCustomer";

const Dashboard=()=>{
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-16">
            <SliderBanner />
            <div className="w-full max-w-4xl p-5">
                <PolicyTab />
                <CustomerGetAll/>
                <AddCustomerForm/>
                
            </div>
        </div>
    )
}
export default Dashboard;