import AboutUs from "@/src/components/Home/AboutUs";
import Companies from "@/src/components/Home/Companies";
import Hero from "@/src/components/Home/Hero";
import Services from "@/src/components/Home/Services";
import Products from "@/src/components/Home/Products";
import Leads from "@/src/components/Leads";
import SpacialProducts from "@/src/components/Home/SpacialProducts";
import Capabilities from "@/src/components/Capabilities";
import ParticlesComponent from "@/src/components/ParticlesComponent";
import ServicesComponent from "@/src/components/ServicesComponent";
import ServiceNetworkGlobe from "@/src/components/ServiceNetworkGlobe";
import Procurement from "@/src/components/Procurement";
import CardSlider from "@/src/components/CardSlider";

// Sample Data
const videoData = [
  { id: "1", video: "/sample-video-1.mp4" },
  { id: "2", video: "/sample-video-2.mp4" }
];

const capabilitiesData = {
  title: "Our Core Capabilities",
  subtitle: "Innovative solutions across industries",
  capabilities: [
    {
      id: "c1",
      title: "Manufacturing",
      description: "Advanced manufacturing techniques",
      icon: <svg>...</svg>, // You'll need to add an appropriate icon
      color: "#4361ee" // Add a color
    },
    {
      id: "c2", 
      title: "Engineering",
      description: "Precision engineering solutions",
      icon: <svg>...</svg>, // You'll need to add an appropriate icon
      color: "#00ab55" // Add a color
    }
  ]
};
const servicesData = {
  id: "1",
  heading: "Our Services",
  description: "Comprehensive service offerings",
  hasServicecategory: [
    {
      id: "sc1",
      title: "Technical Services",
      services: ["Consulting", "Design Support"]
    },
    {
      id: "sc2", 
      title: "Manufacturing Services",
      services: ["Production", "Quality Control"]
    }
  ]
};

const serviceNetworkData = {
  id: "1",
  heading: "Global Service Network",
  texts: ["Worldwide Coverage", "Local Expertise"]
};

const whatwedoData = [
  { 
    id: "1", 
    heading: "What We Do", 
    subcontent: ["Innovation-driven solutions"] ,
    color: '',
    gradient: ''
  },
  { 
    id: "2", 
    heading: "Our Mission", 
    subcontent: ["Delivering excellence"] ,
     color: '',
    gradient: ''
  }
];

const aboutCompanyData = {
  id: "1",
  title: "About Coveten",
  description: "Leading manufacturing and engineering company",
  imageUrl: "/about-image.jpg",
  hasPoints: [
    {
      id: "p1",
      title: "Innovation",
      description: "Cutting-edge technologies",
      url: "/innovation",
      iconUrl: "/innovation-icon.svg"
    },
    {
      id: "p2", 
      title: "Quality",
      description: "Highest standards of production",
      url: "/quality",
      iconUrl: "/quality-icon.svg"
    }
  ]
};

export default async function Home() {
  const styles: { [key: string]: React.CSSProperties } = {
    capabilitiesSection: {
      zIndex: 2,
    },
    particles: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -3,
      pointerEvents: 'none',
    },
    serviceSection: {
      zIndex: 5,
    },
    serviceNetworkSection: {
      zIndex: 5,
    },
    procurementSection: {
      // boxShadow: '0 2px 3px 0 rgba(148, 148, 148, 0.5)',
      zIndex: 5,
    },
    companyStatusSection: {
      zIndex: 5,
    },
  };

  return (
    <>
      <section className="w-full flex flex-col items-center">
        <Hero videoData={videoData} />
        <div className="p-[3em] md:p-[4em] relative flex flex-col items-center w-full bg-white overflow-hidden" style={styles.capabilitiesSection}>      
          <div style={styles.particles}>
            <ParticlesComponent id="particles" />
          </div>
          <Capabilities />        
        </div>
        <div className="w-full " style={styles.serviceSection}>
          <ServicesComponent data={servicesData}/>
        </div>
        <div className="w-full p-20 overflow-hidden flex items-center flex-col" style={styles.serviceNetworkSection}>
            <ServiceNetworkGlobe />
        </div>

        <div className="w-full flex items-center justify-between " style={styles.procurementSection}>
          <Procurement/>
        </div>
        <div className="w-full p-[0.5em] md:p-[2em] " style={styles.companyStatusSection}>
          <CardSlider data={whatwedoData}/>
        </div>
      </section>
      <Leads />
    </>
  );
}