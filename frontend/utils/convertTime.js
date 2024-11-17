const convertTime = time => {
    // timeParts will return an array
    const timeParts = time.split(":");
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    let meridiam = "am";

    if (hours > 12) {
        meridiam = "pm";

        if (hours > 12) {
            hours -= 12;
        }
    }

    return (
        hours.toString().padStart(2) +
        minutes.toString().padStart(2, "0") +
        " " +
        meridiam
    );
};

export default convertTime;