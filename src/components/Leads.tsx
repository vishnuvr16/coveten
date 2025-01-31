'use client';
import React, { useState } from 'react';

const Leads = () => {
    // Sample data to replace API calls
    const sampleIndustries = [
        { id: 1, title: "Technology" },
        { id: 2, title: "Healthcare" },
        { id: 3, title: "Finance" },
        { id: 4, title: "Education" },
        { id: 5, title: "Manufacturing" }
    ];

    const sampleServices = [
        { id: 1, title: "Consulting" },
        { id: 2, title: "Development" },
        { id: 3, title: "Design" },
        { id: 4, title: "Marketing" },
        { id: 5, title: "Support" }
    ];

    // States
    const [isLeadFromOpen, setIsLeadFromOpen] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePhoneChange = (inputValue :any) => {
        const numericValue = inputValue.replace(/\D/g, '');
        const indianPhonePattern = /^[789]\d{9}$/;

        if (!indianPhonePattern.test(numericValue)) {
            setError('Please enter a valid Indian phone number');
        } else if (numericValue.length > 10) {
            setError('Phone number cannot be more than 10 digits');
        } else if (numericValue.length < 10) {
            setError('Phone number cannot be less than 10 digits');
        } else {
            setPhone(numericValue);
            setError('');
        }
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (error) return;

        // Log form data instead of API call
        console.log({
            name,
            email,
            phone,
            industry: selectedIndustry,
            service: selectedService,
            message,
            createdAt: new Date().toISOString()
        });

        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setSelectedIndustry('');
        setSelectedService('');
        setIsLeadFromOpen(false);
        alert('Form submitted successfully!');
        e.target.reset();
    };

    return (
        <div className={`fixed top-24 right-0 hidden transition-all duration-500 lg:block overflow-hidden z-50 
            ${isLeadFromOpen ? 'h-auto w-auto' : 'h-36 w-14'}`}>
            <div className={`transition-all duration-500 transform ${isLeadFromOpen ? 'translate-x-0' : 'translate-x-[42%]'}`}>
                <div className="flex">
                    <button 
                        onClick={() => setIsLeadFromOpen(!isLeadFromOpen)} 
                        className="bg-blue-600 text-white px-2 text-4xl rounded-sm hidden lg:block h-28">
                        {isLeadFromOpen ? 
                            <span className="text-2xl">›</span> : 
                            <p className="text-[10px] w-full font-bold" style={{ textOrientation: "upright", writingMode: 'vertical-lr' }}>
                                INQUIRY
                            </p>
                        }
                    </button>
                    <div className="w-full">
                        <div className="flex">
                            <div className="m-auto">
                                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 shadow-lg max-w-lg">
                                    <div className="flex">
                                        <div className="flex-1 py-5 pl-5 overflow-hidden">
                                            <h1 className="inline text-2xl font-semibold leading-none">
                                                Get Test
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="px-5 pb-5">
                                        <input
                                            placeholder="Name"
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                        />
                                        <input
                                            placeholder="Email"
                                            required
                                            type="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                        />
                                        <input
                                            placeholder="Phone"
                                            required
                                            type="number"
                                            onChange={(e) => handlePhoneChange(e.target.value)}
                                            value={phone}
                                            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                        />
                                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                                        <select
                                            value={selectedIndustry}
                                            onChange={(e) => setSelectedIndustry(e.target.value)}
                                            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                        >
                                            <option value="">Select an Industry</option>
                                            {sampleIndustries.map((industry) => (
                                                <option key={industry.id} value={industry.title}>
                                                    {industry.title}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            value={selectedService}
                                            onChange={(e) => setSelectedService(e.target.value)}
                                            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                        >
                                            <option value="">Select a Service</option>
                                            {sampleServices.map((service) => (
                                                <option key={service.id} value={service.title}>
                                                    {service.title}
                                                </option>
                                            ))}
                                        </select>

                                        <textarea
                                            rows={3}
                                            placeholder="Message"
                                            required
                                            onChange={(e) => setMessage(e.target.value)}
                                            value={message}
                                            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-sm bg-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                        />

                                        <div className="mt-3">
                                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-2 rounded transition duration-300">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leads;