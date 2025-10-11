'use client';

import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

const AboutUs = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-96 bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.5!2d24.7!3d43.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDA5JzAwLjAiTiAyNMKwNDInMDAuMCJF!5e0!3m2!1sen!2sbg!4v1234567890"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-[#4C8F3A] text-sm font-bold tracking-wider mb-3">НАШАТА ЗЕМЯ</div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-6">
              Александрово: Перфектното място за плодове
            </h2>
            
            <div className="space-y-4 text-[#6B4423] leading-relaxed">
              <p>
                Разположени в сърцето на Ловешка област, нашите земи се ползват от уникален микроклимат - 
                топли дни, хладни нощи и богата почва, идеална за ябълки, череши и круши.
              </p>
              <p>
                Водата, която използваме, идва от естествени подпочвени извори, а всяко дърво получава 
                внимание както в дядовите градини.
              </p>
              <p className="font-medium">
                Това не е просто ферма - това е наследство, което пазим и развиваме от 2013 година.
              </p>
            </div>

            <div className="mt-6 space-y-2 text-sm text-[#6B4423]">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-[#4C8F3A]" />
                <span>Посетете ни: Александрово 5572, Ловеч</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-[#4C8F3A]" />
                <span>Работно време: Пон-Съб 8:00-17:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;


