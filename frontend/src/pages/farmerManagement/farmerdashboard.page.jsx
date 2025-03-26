import BindsList from '@/components/farmerManagement/BidsList/BindsList';
import CreatePost from '@/components/farmerManagement/CreatePost/CreatePost';
import Hero from '@/components/farmerManagement/Hero/Hero';
import Navigation from '@/components/farmerManagement/Navigation/Navigation';
import ProfileCard from '@/components/farmerManagement/ProfileCard/ProfileCard';
import VegetablePriceMarqueeWithStyles from '@/components/farmerManagement/VegetablePriceMarquee/VegetablePriceMarquee';
import FooterLandingPage from '@/components/other/FooterLandingPage';
import React from 'react'

function FarmerDashboardPage() {
  return (
    <>
      {/* Navigation */}
      <div>
        <Navigation />
      </div>

      {/* Hero Section */}
      <div>
        <Hero />    
      </div>

      {/* Vegitable Marquee */}
      <div className=''>
        <VegetablePriceMarqueeWithStyles />
      </div>      

      {/* Body-Content */}
      <div className='px-[120px] flex-col justify-between'>

        <div className='flex items-start gap-10'>
          {/* Create Post */}
          <div className='mt-10'>
            <CreatePost />
            <BindsList />
          </div>

          {/* User Profile */}
          <div className='mt-10'>
            <ProfileCard />
          </div>
        </div>
      </div>

      <div>
        <FooterLandingPage />
      </div>
    </>
  )
}

export default FarmerDashboardPage;