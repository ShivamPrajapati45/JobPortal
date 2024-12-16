import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import  { useState } from "react";


const Footer = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
        }
    };
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
        newErrors.name = "Name is required";
        }
        if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
        }
        if (!formData.message.trim()) {
        newErrors.message = "Message is required";
        }
        return newErrors;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
        // Form is valid
        setSubmitted(true);
        setFormData({
            name: "",
            email: "",
            message: "",
        });
        // Reset success message after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
        } else {
        setErrors(newErrors);
        }
    };
    return (
    <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
                <h2 className="text-white text-xl font-bold">Company Name</h2>
                <div className="flex items-center space-x-2">
                <MapPin size={20} />
                <span>123 Business Street, City 12345</span>
                </div>
                <div className="flex items-center space-x-2">
                <Phone size={20} />
                <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                <Mail size={20} />
                <span>contact@company.com</span>
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h3 className="text-white text-lg font-semibold mb-4">
                Quick Links
                </h3>
                <ul className="space-y-2">
                <li>
                    <a className="hover:text-white transition-colors">About Us</a>
                </li>
                <li>
                    <a className="hover:text-white transition-colors">Services</a>
                </li>
                <li>
                    <a className="hover:text-white transition-colors">Products</a>
                </li>
                <li>
                    <a className="hover:text-white transition-colors">Blog</a>
                </li>
                </ul>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
                <h3 className="text-white text-lg font-semibold mb-4">
                Contact Us
                </h3>
                {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    Thank you for your message. We&apos;ll get back to you soon!
                </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className={`w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-700"}`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                    </div>

                    <div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className={`w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-700"}`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                    </div>

                    <div>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="4"
                        className={`w-full px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.message ? "border-red-500" : "border-gray-700"}`}
                    ></textarea>
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                        </p>
                    )}
                    </div>

                    <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                    Send Message
                    </button>
                </form>
                )}
            </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm">
                © {new Date().getFullYear()} Company Name. All rights reserved.
                </div>

                <div className="flex space-x-6 mt-4 md:mt-0">
                <a className="hover:text-white transition-colors">
                    <Facebook size={24} />
                </a>
                <a className="hover:text-white transition-colors">
                    <Twitter size={24} />
                </a>
                <a className="hover:text-white transition-colors">
                    <Linkedin size={24} />
                </a>
                </div>
            </div>
            </div>
        </div>
        </footer>
    );
}

export default Footer