import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signupImg from "../assets/data/Images/signup.gif";
import avatar from "../assets/data/Images/doctor-img01.png";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../config";
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Signup = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photo: "",
        gender: '',
        role: 'patient'
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewURL(URL.createObjectURL(file)); // Set preview URL

            try {
                const data = await uploadImageToCloudinary(file);
                if (data?.secure_url) {
                    setFormData({ ...formData, photo: data.secure_url }); // Update photo URL in formData
                }
            } catch {
                toast.err("Failed to upload image. Please try again.");
            }
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const { message } = await res.json();

            if (!res.ok) {
                throw new Error(message);
            }

            setLoading(false);
            toast.success(message);
            navigate('/login');
        } catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
    };

    return (
        <section className="px-5 xl:px-0">
            <div className="max-w-[1170px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* ====== img box ====== */}
                    <div className="hidden lg:block bg-primaryColor rounded-l-lg">
                        <figure className="rounded-l-lg">
                            <img src={signupImg} alt="Signup" className="w-full rounded-l-lg" />
                        </figure>
                    </div>

                    {/* ===== sign up form ===== */}
                    <div className="rounded-l-lg lg:pl-16 py-10">
                        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                            Create an <span className="text-primaryColor">account</span>
                        </h3>

                        <form onSubmit={submitHandler}>
                            {/* Input fields for name, email, and password */}
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
                                    required
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
                                    required
                                />
                            </div>

                            {/* Role and Gender selection */}
                            <div className="mb-5 flex items-center justify-between">
                                <label className="label-style">
                                    Are you a:
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="select-style"
                                    >
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </select>
                                </label>
                                <label className="label-style">
                                    Gender:
                                    <select
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

                            {/* Image Upload with Preview */}
                            <div className="mb-5 flex items-center gap-3">
                                {selectedFile && (
                                    <figure className="w-[60px] h-[60px] rounded-full border-2 border-primaryColor flex items-center justify-center">
                                        <img 
                                            src={previewURL} 
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
                                    />
                                    <label
                                        htmlFor="customFile"
                                        className="absolute top-0 left-0 w-full h-full flex items-center px-3 py-2 bg-[#0066ff46] text-headingColor font-semibold rounded-lg cursor-pointer"
                                    >
                                        Upload Photo
                                    </label>
                                </div>
                            </div>

                            {/* Sign Up Button */}
                            <div className="mt-7">
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                                >
                                    {loading ? (
                                        <HashLoader size={35} color="#ffffff" />
                                    ) : (
                                        "Sign Up"
                                    )}
                                </button>
                            </div>

                            {/* Link to Login */}
                            <p className="mt-5 text-textColor text-center">
                                Already have an account?
                                <Link to="/login" className="text-primaryColor font-medium ml-1">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
