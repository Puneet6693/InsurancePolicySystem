import PolicyTab from "./PolicyTab"
import SliderBanner from "./SliderBanner";

const Dashboard=()=>{
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-16">
            <SliderBanner />
            <div className="w-full max-w-4xl p-5">
                <PolicyTab />
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Explore More Policies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-4 border rounded-lg shadow-sm bg-white">
                            <h3 className="text-lg font-bold mb-2">Health Insurance</h3>
                            <p className="text-sm text-gray-600">Comprehensive coverage for your medical needs.</p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Learn More
                            </button>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm bg-white">
                            <h3 className="text-lg font-bold mb-2">Car Insurance</h3>
                            <p className="text-sm text-gray-600">Protect your vehicle with our affordable plans.</p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Learn More
                            </button>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm bg-white">
                            <h3 className="text-lg font-bold mb-2">Home Insurance</h3>
                            <p className="text-sm text-gray-600">Secure your home and belongings today.</p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Other Offers</h2>
                    <ul className="list-disc list-inside">
                        <li>Special Discount on Premium Policies</li>
                        <li>Refer a Friend and Earn Rewards</li>
                        <li>Free Consultation for New Customers</li>
                    </ul>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Other Things</h2>
                    <p>Stay tuned for upcoming features and updates to enhance your experience.</p>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Customer Testimonials</h2>
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                        "This platform has made managing my policies so much easier!" - Jane D.
                    </blockquote>
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 mt-4">
                        "Excellent customer service and great offers!" - John S.
                    </blockquote>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                    <p>If you have any questions, feel free to reach out:</p>
                    <ul className="list-disc list-inside">
                        <li>Email: support@policyapp.com</li>
                        <li>Phone: +1-800-123-4567</li>
                        <li>Live Chat: Available 24/7</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;