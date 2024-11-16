import { useState } from "react";

const Contact = () => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form validation
        if (!email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Handle form submission logic (e.g., send data to the server)
        console.log({ email, subject, message });

        // Reset form
        setEmail("");
        setSubject("");
        setMessage("");
    };

    return ( 
        <section>
            <div className="px-4 mx-auto max-w-screen-md">
                <h2 className="heading text-center">Contact Us</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text__para">
                    Got a technical issue? Want to send feedback about a beta feature? Let us know.
                </p>
                <form action="#" className="space-y-8" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="form__label">Your Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="example@gmail.com" 
                            className="form__input mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div> 
                    <div>
                        <label htmlFor="subject" className="form__label">Subject</label>
                        <input 
                            type="text" 
                            id="subject" 
                            placeholder="Let us know how we can help you" 
                            className="form__input mt-1"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </div>  
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="form__label">Your Message</label>
                        <textarea 
                            rows="6" 
                            id="message" 
                            placeholder="Leave a comment..." 
                            className="form__input mt-1"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn rounded sm:w-fit" aria-label="Submit contact form">
                        Submit
                    </button>  
                </form>
            </div>
        </section> 
    );
};

export default Contact;
