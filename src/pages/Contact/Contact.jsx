import { useState } from "react";
import "./Contact.css";

const contactReasons = [
    "General inquiry",
    "Report incorrect information",
    "Suggest a market",
    "Report a problem",
    "Partnership",
    "Feedback",
];

const faqs = [
    {
        question: "How do I find a market?",
        answer:
            "Use the Market Directory to search by market name or location.",
    },
    {
        question: "I found incorrect market information. How can I report it?",
        answer:
            'Send us a message through this form and select "Report incorrect information".',
    },
    {
        question: "Can I suggest a market to be added?",
        answer:
            'Yes. Select "Suggest a market" and include the market name, location, and any useful details.',
    },
];

const initialForm = {
    name: "",
    email: "",
    subject: "",
    reason: "",
    message: "",
};

function Contact() {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    function updateField(event) {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));

        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: "",
        }));

        setSubmitted(false);
    }

    function validate() {
        const nextErrors = {};

        if (!form.name.trim()) {
            nextErrors.name = "Please enter your name.";
        }

        if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            nextErrors.email = "Please enter a valid email address.";
        }

        if (!form.message.trim()) {
            nextErrors.message = "Please tell us how we can help.";
        }

        return nextErrors;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const nextErrors = validate();
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length === 0) {
            setSubmitted(true);
            setForm(initialForm);
        }
    }

    return (
        <main className="contact-page">
            <section className="hero" id="contact">
                <p className="eyebrow">We’re listening</p>

                <h1>
                    Get in touch with the
                    <br />
                    <em>FreshFind</em> team.
                </h1>

                <p className="hero-copy">
                    Have a question, a suggestion, or found incorrect market
                    information? We’d love to hear from you.
                </p>
            </section>

            <section
                className="contact-grid"
                aria-label="Contact FreshFind"
            >
                <div className="form-panel">
                    <div className="section-heading">
                        <p className="eyebrow">Send a message</p>

                        <h2>How can we help?</h2>

                        <p>
                            Share a little context and our team will get back
                            to you.
                        </p>
                    </div>

                    {submitted && (
                        <div className="success-message" role="status">
                            Thanks for reaching out. Your message is ready for
                            the FreshFind team.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="field-row">
                            <label>
                                Full name

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={updateField}
                                    placeholder="Your name"
                                    aria-invalid={Boolean(errors.name)}
                                />

                                {errors.name && (
                                    <small>{errors.name}</small>
                                )}
                            </label>

                            <label>
                                Email address

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={updateField}
                                    placeholder="you@example.com"
                                    aria-invalid={Boolean(errors.email)}
                                />

                                {errors.email && (
                                    <small>{errors.email}</small>
                                )}
                            </label>
                        </div>

                        <label>
                            Subject

                            <input
                                name="subject"
                                value={form.subject}
                                onChange={updateField}
                                placeholder="What’s this about?"
                            />
                        </label>

                        <label>
                            Reason for contacting us{" "}
                            <span>(optional)</span>

                            <select
                                name="reason"
                                value={form.reason}
                                onChange={updateField}
                            >
                                <option value="">
                                    Select a reason
                                </option>

                                {contactReasons.map((reason) => (
                                    <option key={reason} value={reason}>
                                        {reason}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Message

                            <textarea
                                name="message"
                                value={form.message}
                                onChange={updateField}
                                placeholder="Tell us what’s on your mind..."
                                rows="5"
                                aria-invalid={Boolean(errors.message)}
                            />

                            {errors.message && (
                                <small>{errors.message}</small>
                            )}
                        </label>

                        <button type="submit">
                            Send message <span aria-hidden="true">↗</span>
                        </button>
                    </form>
                </div>

                <aside className="contact-details">
                    <div>
                        <p className="eyebrow">Contact details</p>

                        <h2>Let’s make markets easier to find.</h2>

                        <p>
                            FreshFind is a student-led project helping people
                            discover local markets across Nigeria.
                        </p>
                    </div>

                    <dl>
                        <div>
                            <dt>Email</dt>
                            <dd>
                                <a href="mailto:support@freshfind.example">
                                    support@freshfind.example
                                </a>
                            </dd>
                        </div>

                        <div>
                            <dt>Phone</dt>
                            <dd>+234 XXX XXX XXXX</dd>
                        </div>

                        <div>
                            <dt>Based in</dt>
                            <dd>Nigeria</dd>
                        </div>
                    </dl>

                    <div className="details-note">
                        <span aria-hidden="true">✦</span>

                        <p>
                            Have a market to add? Include its name, city, and
                            anything else shoppers should know.
                        </p>
                    </div>
                </aside>
            </section>

            <section
                className="faq-section"
                aria-labelledby="faq-heading"
            >
                <div className="faq-intro">
                    <p className="eyebrow">Quick answers</p>

                    <h2 id="faq-heading">Before you write</h2>
                </div>

                <div className="faq-list">
                    {faqs.map((faq) => (
                        <details key={faq.question}>
                            <summary>
                                {faq.question}

                                <span aria-hidden="true">+</span>
                            </summary>

                            <p>{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Contact;
