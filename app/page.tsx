import React from 'react';
import Topbar from '@/components/Topbar';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import TrustBar from '@/components/TrustBar';
import AboutUs from '@/components/AboutUs';
import Product from '@/components/Product';
import Process from '@/components/Process';
import Sustainability from '@/components/Sustainability';
import Distributors from '@/components/Distributors';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <div className="font-sans bg-[#FFF7ED]">
      <Topbar />
      <AnnouncementBanner />
      <Hero />
      <Experience />
      <TrustBar />
      <AboutUs />
      <Product />
      <Process />
      <Gallery />
      <Sustainability />
      <Distributors />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
