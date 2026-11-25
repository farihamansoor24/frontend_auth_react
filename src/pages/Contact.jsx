import { useState } from "react";
import { Button, Card, Label, Select, Textarea, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your backend API / email service / form handler
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <section className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-14 text-center">
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg dark:text-gray-400">
            Have a question, project idea, or support request? Send us a message and we&apos;ll get back to you soon.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Cards */}
      <section className="mx-auto max-w-screen-xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Contact Info */}
          <div className="space-y-5 lg:col-span-5">
            <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Get in Touch
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                Reach out directly through email, visit our office, or fill out the form.
              </p>

              <div className="space-y-4 pt-2 text-sm">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Email
                  </p>
                  <a
                    href="mailto:hello@myapp.example"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    hello@myapp.example
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Phone
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    +92 (21) 3456-7890
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Office Address
                  </p>
                  <address className="not-italic text-gray-600 dark:text-gray-300">
                    Suite 402, Shahrah-e-Faisal,
                    <br />
                    Karachi, Sindh, Pakistan
                  </address>
                </div>

                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Business Hours
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Mon – Fri: 9:00 AM – 6:00 PM PKT
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
                Looking for account access?{" "}
                <Link
                  to="/"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Sign in here
                </Link>
              </div>
            </Card>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7">
            <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                Send a Message
              </h2>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                All fields marked with * are required.
              </p>

              {submitted && (
                <div className="mb-4 rounded-lg bg-green-50 p-3.5 text-sm font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="mb-1.5 block">
                      <Label htmlFor="contact-name">Your Name *</Label>
                    </div>
                    <TextInput
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Ali Khan"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <div className="mb-1.5 block">
                      <Label htmlFor="contact-email">Email Address *</Label>
                    </div>
                    <TextInput
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 block">
                    <Label htmlFor="contact-subject">Subject</Label>
                  </div>
                  <Select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Web Development">Web Development</option>
                    <option value="UI / UX Design">UI / UX Design</option>
                    <option value="Support">Technical Support</option>
                  </Select>
                </div>

                <div>
                  <div className="mb-1.5 block">
                    <Label htmlFor="contact-message">Message *</Label>
                  </div>
                  <Textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" color="blue" className="mt-1 w-full sm:w-fit">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;