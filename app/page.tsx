import React from 'react';
import Topbar from '@/components/Topbar';
import Hero from '@/components/Hero';
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
      <Hero />
      <TrustBar />
      <AboutUs />
      <Product />
      <Process />
      <Sustainability />
      <Distributors />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
