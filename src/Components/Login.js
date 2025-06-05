// import React, { useContext, useState } from "react";
// import { StoreContext } from "../services/StoreContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const { login } = useContext(StoreContext); // Use login function from StoreContext
//     const navigate = useNavigate(); // Initialize useNavigate

//     const [data, setData] = useState({
//         username: "",
//         password: "",
//     });
//     const [isToastShown, setIsToastShown] = useState(false);

//     const onChangeHandler = (e) => {
//         const { name, value } = e.target;
//         setData((prev) => ({ ...prev, [name]: value }));
//     };

//     const onLogin = async (e) => {
//         e.preventDefault();
//         try {
//             if(!isToastShown){
//             await login(data.username, data.password); // Use login function
//             toast.success("Login successful!");
//             setIsToastShown(true);
//             navigate("/"); }// Redirect to Dashboard after successful login
//         } catch (error) {
//             console.error("Login Error:", error);
//             toast.error("An error occurred during login."); // Fallback error message
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <form 
//                 onSubmit={onLogin} 
//                 className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
//             >
//                 <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//                 <div className="mb-4">
//                     <label 
//                         htmlFor="username" 
//                         className="block text-gray-700 font-semibold mb-2"
//                     >
//                         Username
//                     </label>
//                     <input
//                         type="text"
//                         name="username"
//                         id="username"
//                         placeholder="Your Username"
//                         value={data.username}
//                         onChange={onChangeHandler}
//                         required
//                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label 
//                         htmlFor="password" 
//                         className="block text-gray-700 font-semibold mb-2"
//                     >
//                         Password
//                     </label>
//                     <input
//                         type="password"
//                         name="password"
//                         id="password"
//                         placeholder="Your Password"
//                         value={data.password}
//                         onChange={onChangeHandler}
//                         required
//                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div className="mb-4 flex items-center">
//                     <input type="checkbox" id="terms" className="mr-2" required />
//                     <label htmlFor="terms" className="text-gray-600 text-sm">
//                         By continuing, I agree to the Terms of Use &amp; Privacy Policy.
//                     </label>
//                 </div>
//                 <button 
//                     type="submit" 
//                     className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-colors"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Login;

// import React, { useContext, useState } from "react";
// import { StoreContext } from "../services/StoreContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const { login } = useContext(StoreContext); // Also get 'user' from StoreContext
//     const queryParams = new URLSearchParams(window.location.search);
//     const redirectUrl = queryParams.get("redirect");
//     const navigate = useNavigate();

//     const [data, setData] = useState({
//         username: "",
//         password: "",
//     });
//     const [isToastShown, setIsToastShown] = useState(false); // This state seems to prevent multiple toasts, consider if still needed after robust error handling

//     const onChangeHandler = (e) => {
//         const { name, value } = e.target;
//         setData((prev) => ({ ...prev, [name]: value }));
//     };

//     const onLogin = async (e) => {
//         e.preventDefault();
//         try {
//             // It's better to allow the login function to handle internal toast and return success/failure
//             const loginResult = await login(data.username, data.password); 

//             if (loginResult) { // Check if login was successful
//                 toast.success("Login successful!");
//                 setIsToastShown(true); // Set toast shown to true
//                 // Check the user role from the loginResult or the updated user context
//                 if (loginResult.role === "Admin") {
//                     navigate("/admin/dashboard"); // Redirect admin to admin dashboard
//                 } 
//                 else if (redirectUrl) {
//                     navigate(redirectUrl); // Redirect to the specified URL if provided
//                 }
//                 else {
//                     navigate("/"); // Redirect regular user to home (user dashboard)
//                 }
//             } else {
//                 // If loginResult is null or indicates failure, StoreContext's login function
//                 // should ideally already display an error toast, but a fallback is good.
//                 if (!isToastShown) { // Only show fallback toast if not already shown by context
//                     toast.error("Login failed. Please check your credentials.");
//                     setIsToastShown(true);
//                 }
//             }
//         } catch (error) {
//             console.error("Login Error:", error);
//             // This toast is for unexpected errors, not authentication failures handled by StoreContext
//             if (error.response && error.response.data && error.response.data.message) {
//                 toast.error(error.response.data.message);
//             } else {
//                 toast.error("An unexpected error occurred during login.");
//             }
//             setIsToastShown(true); // Ensure toast state is updated even on error
//         } finally {
//             // Reset isToastShown after a short delay to allow subsequent toasts if needed
//             setTimeout(() => setIsToastShown(false), 3000); 
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <form
//                 onSubmit={onLogin}
//                 className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
//             >
//                 <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//                 <div className="mb-4">
//                     <label
//                         htmlFor="username"
//                         className="block text-gray-700 font-semibold mb-2"
//                     >
//                         Username
//                     </label>
//                     <input
//                         type="text"
//                         name="username"
//                         id="username"
//                         placeholder="Your Username"
//                         value={data.username}
//                         onChange={onChangeHandler}
//                         required
//                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label
//                         htmlFor="password"
//                         className="block text-gray-700 font-semibold mb-2"
//                     >
//                         Password
//                     </label>
//                     <input
//                         type="password"
//                         name="password"
//                         id="password"
//                         placeholder="Your Password"
//                         value={data.password}
//                         onChange={onChangeHandler}
//                         required
//                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
                
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-colors"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Login;



import React, { useContext, useState } from "react";
import { StoreContext } from "../services/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(StoreContext);
    const queryParams = new URLSearchParams(window.location.search);
    const redirectUrl = queryParams.get("redirect");
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const [isToastShown, setIsToastShown] = useState(false);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const loginResult = await login(data.username, data.password);

            if (loginResult) {
                toast.success("Login successful!");
                setIsToastShown(true);

                if (loginResult.role === "Admin") {
                    navigate("/admin/dashboard");
                }
                // <--- NEW: Add redirection for Agent role
                else if (loginResult.role === "Agent") {
                    navigate("/agent/dashboard"); // Redirect agent to agent dashboard
                }
                // END NEW Agent Redirection --->
                else if (redirectUrl) {
                    navigate(redirectUrl);
                }
                else {
                    navigate("/");
                }
            } else {
                if (!isToastShown) {
                    toast.error("Login failed. Please check your credentials.");
                    setIsToastShown(true);
                }
            }
        } catch (error) {
            console.error("Login Error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred during login.");
            }
            setIsToastShown(true);
        } finally {
            setTimeout(() => setIsToastShown(false), 3000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={onLogin}
                className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Your Username"
                        value={data.username}
                        onChange={onChangeHandler}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Your Password"
                        value={data.password}
                        onChange={onChangeHandler}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-colors"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;





