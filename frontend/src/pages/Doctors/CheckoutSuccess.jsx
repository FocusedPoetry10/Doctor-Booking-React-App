import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <svg
                    viewBox="0 0 24 24"
                    className="text-green-600 w-16 h-16 mx-auto my-6"
                    aria-label="Success Icon"
                >
                    <path
                        fill="currentColor"
                        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.207 8.293-6.5 8.8a1 1 0 0 1-1.514.062L6.3 13.135a1 1 0 1 1 1.4-1.43l3.552 3.03 5.865-7.93a1 1 0 1 1 1.59 1.188z"
                    />
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold">
                        Payment Done!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Thank you for completing your secure online payment.
                    </p>
                    <p>Have a great day!</p>
                    <div className="py-10">
                        <Link
                            to="/home"
                            className="px-12 bg-buttonBgColor hover:bg-buttonHoverColor text-white font-semibold py-3 rounded-lg"
                        >
                            Go Back To Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
