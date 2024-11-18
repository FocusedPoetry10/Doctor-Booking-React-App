import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from './../../Components/Doctors/DoctorCard';
import Loading from "../../Components/Loader/Loading";
import Error from "../../Components/Error/Error";

const MyBookings = () => {
    const { 
        data: appointments, 
        loading, 
        error 
    } = useFetchData(`${BASE_URL}/api/v1/users/appointments/my-appointments`);

    return (
        <div>
            {/* Loading State */}
            {loading && <Loading />}

            {/* Error State */}
            {error && !loading && <Error errMessage={error} />}

            {/* Appointments Display */}
            {!loading && !error && appointments.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {appointments.map(doctor => (
                        <DoctorCard doctor={doctor} key={doctor._id} />
                    ))}
                </div>
            )}

            {/* No Appointments */}
            {!loading && !error && appointments.length === 0 && (
                <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
                    You did not book any doctor yet!
                </h2>
            )}
        </div>
    );
};

export default MyBookings;
