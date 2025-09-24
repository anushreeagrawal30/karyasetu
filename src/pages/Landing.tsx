import React from 'react';
import { Hero } from '../components/Landing/Hero';
import { Features } from '../components/Landing/Features';
import { HowItWorks } from '../components/Landing/HowItWorks';
import { SuccessStories } from '../components/Landing/SuccessStories';
import { Contact } from '../components/Landing/Contact';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <SuccessStories />
      <Contact />
    </div>
  );
};
