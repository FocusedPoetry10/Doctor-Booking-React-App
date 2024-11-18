import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import uploadImageToCloudinary from "../../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Profile = ({ user }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photo: null,
        gender: "",
        bloodType: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                photo: user.photo || "",
                gender: user.gender || "",
                bloodType: user.bloodType || "",
            });
        }
    }, [user]);

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImageUploading(true);

            try {
                const data = await uploadImageToCloudinary(file);
                if (data?.secure_url) {
                    setFormData((prevState) => ({ ...prevState, photo: data.secure_url }));
                    toast.success("Image uploaded successfully!");
                }
            } catch (err) {
                toast.error("Failed to upload image. Please try again.");
            } finally {
                setImageUploading(false);
            }
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/api/v1/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to update profile");
            }

            toast.success(result.message || "Profile updated successfully!");
            navigate("/users/profile/me");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-10">
            <form onSubmit={submitHandler}>
                <div className="mb-5">
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input-style"
                        required
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-style"
                        readOnly
                        aria-readonly="true"
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="input-style"
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="text"
                        placeholder="Blood Type"
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleInputChange}
                        className="input-style"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="gender" className="label-style">
                        Gender:
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="select-style"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </div>
                <div className="mb-5 flex items-center gap-3">
                    {formData.photo && !imageUploading && (
                        <figure className="w-[60px] h-[60px] rounded-full border-2 border-primaryColor flex items-center justify-center">
                            <img
                                src={formData.photo}
                                alt="Preview"
                                className="w-full rounded-full"
                            />
                        </figure>
                    )}
                    <div className="relative w-[130px] h-[50px]">
                        <input
                            type="file"
                            name="photo"
                            id="customFile"
                            onChange={handleFileInputChange}
                            accept=".jpg, .png"
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            aria-label="Upload Profile Picture"
                        />
                        <label
                            htmlFor="customFile"
                            className="absolute top-0 left-0 w-full h-full flex items-center px-3 py-2 text-[15px] bg-primaryColor text-white font-semibold rounded-lg cursor-pointer"
                        >
                            {selectedFile ? selectedFile.name : "Upload Photo"}
                        </label>
                    </div>
                </div>
                <div className="mt-7">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primaryColor text-white text-[18px] rounded-lg px-4 py-3"
                    >
                        {loading ? <HashLoader size={25} color="#ffffff" /> : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
};

Profile.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        photo: PropTypes.string,
        gender: PropTypes.string,
        bloodType: PropTypes.string,
    }).isRequired,
};

export default Profile;
