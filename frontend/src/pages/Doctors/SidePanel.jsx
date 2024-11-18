import PropTypes from 'prop-types';
import convertTime from '../../../utils/convertTime';

const SidePanel = ({ doctorId,ticketPrice, timeSlots }) => {
    return (
        <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
            <div className="flex items-center justify-between">
                <p className="text__para mt-0 font-semibold">Ticket Price</p>
                <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
                    {ticketPrice || 'N/A'} {/* Fallback for ticket price */}
                </span>
            </div>

            <div className="mt-[30px]">
                <p className="text__para mt-0 font-semibold text-headingColor">
                    Available Time Slots:
                </p>
                <ul className="mt-3">
                    {timeSlots?.length > 0 ? (
                        timeSlots.map((item, slot) => (
                            <li key={`${slot.day}-${slot.time}`} className="flex items-center justify-between mb-2">
                                <p className="text-[15px] leading-6 text-textColor font-semibold">
                                    {item.day.CharAt(0).toUpperCase() + item.day.slice(1)}
                                </p>
                                <p className="text-[15px] leading-6 text-textColor font-semibold">
                                    {convertTime(item.startingTime)} -
                                    {convertTime(item.endingTime)}
                                </p>
                            </li>
                        ))
                    ) : (
                        <li>No available slots</li>
                    )}
                </ul>
            </div>

            <button
                className="btn px-2 w-full rounded-md"
                onClick={() => alert("Redirecting to booking page...")}
                aria-label="Redirect to booking page for appointment"
            >
                Book Appointment
            </button>
        </div>
    );
};

SidePanel.propTypes = {
    ticketPrice: PropTypes.string,
    timeSlots: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired
        })
    ).isRequired
};

SidePanel.defaultProps = {
    ticketPrice: 'N/A',  // Default value for ticketPrice if not passed
};

export default SidePanel;
