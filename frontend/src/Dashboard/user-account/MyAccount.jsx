import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../Components/Loader/Loading";
import Error from "../../Components/Error/Error";

const MyAccount = () => {
    const { dispatch } = useContext(AuthContext);
    const [tab, setTab] = useState("bookings");

    const { 
        data: userData, 
        loading, 
        error 
    } = useGetProfile(`${BASE_URL}/api/v1/users/profile/me`);

    useEffect(() => {
        if (error) {
            toast.error(error); // Notify user of any errors
        }
    }, [error]);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        toast.success("You have successfully logged out");
    };

    return (
        <section>
            <div className="max-w-[1170px] px-5 mx-auto">
                {/* Loading State */}
                {loading && <Loading />}

                {/* Error State */}
                {!loading && error && <Error errMessage={error} />}

                {/* Success State */}
                {!loading && !error && userData && (
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Sidebar */}
                        <div className="pb-[50px] px-[30px] rounded-md">
                            <div className="flex items-center justify-center">
                                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                                    <img
                                        src={userData.photo || "/path/to/fallback-image.jpg"}  // Use fallback image if photo is not available
                                        alt="User Profile"
                                        className="w-full h-full rounded-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null; // Prevents infinite loop if fallback image also fails
                                            e.target.src = "/path/to/fallback-image.jpg"; // Set fallback image
                                        }}
                                    />
                                </figure>
                            </div>

                            <div className="text-center mt-4">
                                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                                    {userData.name || "User"} {/* Default to "User" if name is missing */}
                                </h3>
                                <p className="text-textColor text-[15px] leading-6 font-medium">
                                    {userData.email || "No email available"} {/* Default to "No email available" if email is missing */}
                                </p>
                                <p className="text-textColor text-[15px] leading-6 font-medium">
                                    Blood Type:{" "}
                                    <span className="ml-2 text-headingColor text-[22px] leading-8">
                                        {userData.bloodType || "Unknown"} {/* Default to "Unknown" if blood type is missing */}
                                    </span>
                                </p>
                            </div>

                            <div className="mt-[50px] md:mt-[100px]">
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                                >
                                    Logout
                                </button>
                                <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                                    Delete Account
                                </button>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="md:col-span-2 md:px-[30px]">
                            {/* Tabs */}
                            <div className="mb-5">
                                <button
                                    onClick={() => setTab("bookings")}
                                    className={`${
                                        tab === "bookings"
                                            ? "bg-primaryColor text-white"
                                            : ""
                                    } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                                >
                                    My Bookings
                                </button>

                                <button
                                    onClick={() => setTab("settings")}
                                    className={`${
                                        tab === "settings"
                                            ? "bg-primaryColor text-white"
                                            : ""
                                    } p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                                >
                                    Profile Settings
                                </button>
                            </div>

                            {/* Tab Content */}
                            {tab === "bookings" && <MyBookings />}
                            {tab === "settings" && <Profile user={userData} />}
                        </div>
                    </div>
                )}

                {/* Fallback for Missing User Data */}
                {!loading && !error && !userData && (
                    <div className="text-center text-red-600">
                        Failed to load user data. Please try again later.
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyAccount;
