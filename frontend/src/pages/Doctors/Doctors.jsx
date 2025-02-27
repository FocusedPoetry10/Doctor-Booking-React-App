import { useState, useEffect } from "react";
import DoctorCard from "./../../Components/Doctors/DoctorCard";
import { BASE_URL } from './../../config';
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../Components/Loader/Loading";
import Error from "../../Components/Error/Error";
import Testimonial from "../../Components/Testimonial/Testimonial";

const Doctors = () => {
  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');

  // Update debounced query after 700ms delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query.trim());
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const { data: doctors = [], loading, error } = useFetchData(
    `${BASE_URL}/api/v1/doctors?query=${debounceQuery}`
  );

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor by name or specification"
              value={query}
              onChange={e => setQuery(e.target.value)} // Trigger state change on input change
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader message="Searching for doctors..." />}
          {error && <Error message="Failed to load doctors." />}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {doctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health system offers unmatched, expert health care.
            </p>
          </div>

          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
