import React from "react";
import {
  Clock,
  MapPin,
  Building2,
  User,
  FileText,
  Link,
  Briefcase,
} from "lucide-react";

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

interface Equipment {
  name: string;
  model: string;
  make: string;
  calibrationDetails: string;
  warranty: string;
  yearOfInstallation: string;
}

interface UserDetails {
  createdAt: string;
  accountType: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  title: string;
  education: string;
  experience: string;
  specialty: string;
  department: string;
  interest: string;
  bio: string;
  company: {
    about: string;
    name: string;
    email: string;
    phoneNumber: string;
    otherPhoneNumber: string;
    gstNumber: string;
    panCardNumber: string;
    services: string[];
    industries: string[];
  };
  socialMedia: {
    linkedin: string;
    twitter: string;
    skype: string;
  };
  equipment: Equipment[];
  primaryAddress: Address;
  secondaryAddress: Address;
  documents: string[];
}

const defaultUserDetails: UserDetails = {
  createdAt: "Wednesday 18 December, 2024 at 6:08:32 pm",
  accountType: "Service Provider",
  userId: "N/A",
  name: "Vishnu",
  email: "service@gmail.com",
  phoneNumber: "N/A",
  title: "N/A",
  education: "N/A",
  experience: "N/A",
  specialty: "N/A",
  department: "N/A",
  interest: "N/A",
  bio: "N/A",
  company: {
    about: "N/A",
    name: "abc pvtltd",
    email: "abc@gmail.com",
    phoneNumber: "N/A",
    otherPhoneNumber: "N/A",
    gstNumber: "21323456789234",
    panCardNumber: "N/A",
    services: [],
    industries: ["automotive", "construction"],
  },
  socialMedia: {
    linkedin: "N/A",
    twitter: "N/A",
    skype: "N/A",
  },
  equipment: [],
  primaryAddress: {
    street: "N/A",
    city: "N/A",
    state: "N/A",
    country: "N/A",
    zipCode: "N/A",
  },
  secondaryAddress: {
    street: "N/A",
    city: "N/A",
    state: "N/A",
    country: "N/A",
    zipCode: "N/A",
  },
  documents: ["document-1(pdf)"],
};

const ComponentsAppsUserDetails: React.FC = () => {
  const userDetails = defaultUserDetails;

  const InfoSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ title, icon, children }) => (
    <div className="bg-[#1b2e4b] border border-[#4b78a7] rounded-lg p-6 shadow-lg mb-6">
      <div className="flex items-center mb-4 border-b border-gray-600 pb-2">
        <div className="mr-2 text-[#4b78a7]">{icon}</div>
        <h2 className="text-lg font-semibold text-[#f0f4ff]">{title}</h2>
      </div>
      {children}
    </div>
  );

  const DataRow: React.FC<{ label: string; value: string }> = ({
    label,
    value,
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 py-2">
      <span className="font-medium text-gray-400">{label}</span>
      <span className="md:col-span-2 text-[#f0f4ff]">{value || "N/A"}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1b2e4b] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-[#1b2e4b] border border-[#4b78a7] rounded-lg p-6 shadow-md mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#f0f4ff]">User Details</h1>
            <div className="flex items-center text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">{userDetails.createdAt}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* General Information */}
            <InfoSection title="General Information" icon={<User className="w-5 h-5" />}>
              <DataRow label="Account Type" value={userDetails.accountType} />
              <DataRow label="Name" value={userDetails.name} />
              <DataRow label="Email" value={userDetails.email} />
              <DataRow label="Phone" value={userDetails.phoneNumber} />
              <DataRow label="Title" value={userDetails.title} />
              <DataRow label="Education" value={userDetails.education} />
              <DataRow label="Experience" value={userDetails.experience} />
              <DataRow label="Specialty" value={userDetails.specialty} />
            </InfoSection>

            {/* Company Information */}
            <InfoSection title="Company Information" icon={<Building2 className="w-5 h-5" />}>
              <DataRow label="Company Name" value={userDetails.company.name} />
              <DataRow label="Company Email" value={userDetails.company.email} />
              <DataRow label="GST Number" value={userDetails.company.gstNumber} />
              <DataRow label="PAN Number" value={userDetails.company.panCardNumber} />

              <div className="mt-4">
                <h3 className="font-medium text-gray-400 mb-2">Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {userDetails.company.industries.map((industry, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#4b78a7] text-[#f0f4ff] rounded-full text-sm"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </InfoSection>
          </div>

          <div className="lg:col-span-1">
            {/* Address Information */}
            <InfoSection title="Address Information" icon={<MapPin className="w-5 h-5" />}>
              <div className="mb-4">
                <h3 className="font-medium text-gray-400 mb-2">Primary Address</h3>
                <div className="text-gray-300">
                  <p>{userDetails.primaryAddress.street}</p>
                  <p>
                    {userDetails.primaryAddress.city}, {userDetails.primaryAddress.state}
                  </p>
                  <p>
                    {userDetails.primaryAddress.country}, {userDetails.primaryAddress.zipCode}
                  </p>
                </div>
              </div>
            </InfoSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsAppsUserDetails;
