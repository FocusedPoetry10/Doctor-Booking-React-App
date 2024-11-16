import PropTypes from 'prop-types';

const SidePanel = ({ ticketPrice, timeSlots }) => {
    return (
        <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
            <div className="flex items-center justify-between">
                <p className="text__para mt-0 font-semibold">Ticket Price</p>
                <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
                    {ticketPrice || 'N/A'} {/* Ensure a fallback value */}
                </span>
            </div>

            <div className="mt-[30px]">
                <p className="text__para mt-0 font-semibold text-headingColor">
                    Available Time Slots:
                </p>
                <ul className="mt-3">
                    {timeSlots?.length > 0 ? (
                        timeSlots.map((slot) => (
                            <li key={`${slot.day}-${slot.time}`} className="flex items-center justify-between mb-2">
                                <p className="text-[15px] leading-6 text-textColor font-semibold">
                                    {slot.day}
                                </p>
                                <p className="text-[15px] leading-6 text-textColor font-semibold">
                                    {slot.time}
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
                aria-label="Redirect to booking page"
            >
                Book Appointment
            </button>
        </div>
    );
};

SidePanel.propTypes = {
    ticketPrice: PropTypes.string.isRequired,
    timeSlots: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired
        })
    ).isRequired
};

export default SidePanel;
