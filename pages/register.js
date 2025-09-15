// pages/register.js
import { useState } from "react";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (res.ok) {
                setMessage("✅ Registration successful!");
                e.target.reset();
            } else {
                setMessage("❌ Error: " + (result.error || "Please try again"));
            }
        } catch (err) {
            setMessage("⚠️ Something went wrong.");
        }

        setLoading(false);
    };

    return (
        <section className="registration-section">
            <div className="registration-card">
                <h2>Register Now</h2>
                <form id="registerForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name="name" id="name" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email" id="email" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mobile">Phone Number</label>
                        <input type="tel" name="mobile" id="mobile" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age Group</label>
                        <select name="age" id="age" required>
                            <option value="">Select</option>
                            <option>18 - 25</option>
                            <option>25 - 40</option>
                            <option>41+</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="source">How did you hear about this event?</label>
                        <select name="source" id="source">
                            <option value="">Select</option>
                            <option>Social Media</option>
                            <option>Friend/Family</option>
                            <option>Poster/Flyer</option>
                        </select>
                    </div>

                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                {message && <p style={{ marginTop: "15px" }}>{message}</p>}
            </div>
        </section>
    );
}
