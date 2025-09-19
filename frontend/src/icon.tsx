/**
 * Icon Components
 * 
 * This module contains reusable SVG icon components used throughout
 * the restaurant discovery application. All icons are optimized for
 * consistent styling and accessibility.
 * 
 * Icons:
 * - StarIcon: Gold star for ratings display
 * - PhoneIcon: Phone symbol for contact information
 * - WebsiteIcon: Globe symbol for website links
 * - ClockIcon: Clock symbol for opening hours
 * 
 * Features:
 * - Consistent sizing and styling
 * - Accessible SVG markup
 * - Optimized for inline usage
 * - Customizable colors via CSS
 * - Lightweight and performant
 * 
 * Usage:
 * All icons accept standard SVG props and can be styled with CSS.
 * They use currentColor for fill to inherit text color.
 * 
 * @author Jingnan Hu
 * @version 1.0.0
 */

export const StarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#ffd700" style={{ margin: '0 4px', verticalAlign: 'middle' }}>
      <polygon points="8,1 10,6 16,6 11,10 13,15 8,12 3,15 5,10 0,6 6,6" />
    </svg>
  );
  
  export const PhoneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  );
  
  export const WebsiteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  );
  
  export const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
    </svg>
  );