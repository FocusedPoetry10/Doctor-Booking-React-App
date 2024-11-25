import PropTypes from 'prop-types';
import convertTime from '../../../utils/convertTime';
import { BASE_URL, token } from "./../../config";
import { toast } from 'react-toastify';

const SidePanel = ({ doctorId = '', ticketPrice = 'N/A', timeSlots = [] }) => {
    const bookingHandler = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/v1/bookings/checkout-session/${doctorId}`, {
                method: 'POST',
                headers: { // Corrected 'header' to 'headers'
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // Added for good practice
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(`${data.message || "Error occurred."} Please try again.`);
            }

            if (data.session?.url) {
                window.location.href = data.session.url;
            }
        } catch (err) {
            toast.error(err.message || "Booking failed. Try again.");
        }
    };

    return (
        <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
            <div className="flex items-center justify-between">
                <p className="text__para mt-0 font-semibold">Ticket Price</p>
                <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
                    {ticketPrice !== 'N/A' ? `Rs ${String(ticketPrice)}` : 'N/A'}
                </span>
            </div>

            <div className="mt-[30px]">
                <p className="text__para mt-0 font-semibold text-headingColor">Available Time Slots:</p>
                <ul className="mt-3">
                    {timeSlots?.length > 0 ? (
                        timeSlots.map((item, index) => (
                            <li key={`${item.day}-${index}`} className="flex items-center justify-between mb-2">
                                <p className="text-[15px] leading-6 text-textColor font-semibold">
                                    {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                                </p>
                                <p className="text-[15px] leading-6 text-textColor font-semibold">
                                    {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
                                </p>
                            </li>
                        ))
                    ) : (
                        <li>No available slots</li>
                    )}
                </ul>
            </div>

            <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">
                Book Appointment
            </button>
        </div>
    );
};

// Prop Types definition
SidePanel.propTypes = {
    doctorId: PropTypes.string,
    ticketPrice: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    timeSlots: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            startingTime: PropTypes.string.isRequired,
            endingTime: PropTypes.string.isRequired,
        })
    ),
};

// Default Props
SidePanel.defaultProps = {
    ticketPrice: 'N/A',
    doctorId: '',
    timeSlots: [],
};

export default SidePanel;
