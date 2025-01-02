import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import LandingPage from '../Landing/Landing'; 
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

// import NavbarPage from './NavbarPage';
// import SliderSection from './SliderSection';
// import ServiceSection from './ServiceSection';
// import AboutSection from './AboutSection';
// import ClientSection from './ClientSection';
// import InfoSection from './InfoSection';

// تست رندر کلی لندینگ پیج
describe('LandingPage', () => {

    beforeEach(() => {
        render(
          <RecoilRoot>
            <BrowserRouter> {/* اضافه کردن BrowserRouter */}
              <LandingPage />
            </BrowserRouter>
          </RecoilRoot>
        );
      });
  
      it('should render the landing page without crashing', async () => {
        // استفاده از findByText برای اطمینان از لود شدن کامل
        const elements = await screen.findAllByText(/انتخاب واحد/i);
        expect(elements.length).toBeGreaterThan(0);
      });
  
    it('should display the main slider text', () => {
      expect(screen.getByText(/انتخاب واحد، آسان‌تر از همیشه/i)).toBeInTheDocument();
    });
  
    it('should render all services', () => {
      const services = screen.getAllByText(/ویژگی های سامانه انتخاب واحد/i);
      expect(services.length).toBeGreaterThan(0);
    });
  
    it('should display the about us section', () => {
      expect(screen.getByText(/درباره ما/i)).toBeInTheDocument();
    });
  
    it('should display client reviews', () => {
      expect(screen.getByText(/نظر دانشجویان/i)).toBeInTheDocument();
    });
  
    it('should render contact information', () => {
      expect(screen.getByText(/آدرس/i)).toBeInTheDocument();
      expect(screen.getByText(/تماس/i)).toBeInTheDocument();
    });
  });
  