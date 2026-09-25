import React from 'react';
import { useCanteen } from '../context/CanteenContext';
import { 
  ShoppingBag, 
  ChefHat, 
  LayoutDashboard, 
  ShieldCheck, 
  GraduationCap, 
  QrCode, 
  Sparkles,
  Flame,
  Clock,
  Phone,
  ChevronDown
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenTableQr: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart, onOpenTableQr }) => {
  const { 
    currentRole, 
    setCurrentRole, 
    activeView, 
    setActiveView, 
    cart, 
    canteen, 
    orders 
  } = useCanteen();

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const activeOrdersCount = orders.filter((o) => o.status === 'ACCEPTED' || o.status === 'PREPARING' || o.status === 'PENDING').length;

  const roleConfigs: { role: UserRole; label: string; icon: any }[] = [
    { role: 'student', label: 'Student', icon: GraduationCap },
    { role: 'kitchen', label: 'Kitchen KDS', icon: ChefHat },
    { role: 'admin', label: 'Admin', icon: LayoutDashboard },
    { role: 'principal', label: 'Principal', icon: ShieldCheck },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(250, 247, 242, 0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid #E8E2D6'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px',
        gap: '20px'
      }}>
        {/* Brand Logo - Exact 'eats' lowercase typography aesthetic from reference */}
        <div 
          style={{ display: 'flex', alignItems: 'baseline', gap: '8px', cursor: 'pointer' }} 
          onClick={() => setActiveView('landing')}
        >
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '2.1rem',
            color: '#EE4322',
            letterSpacing: '-0.04em',
            lineHeight: 1
          }}>
            biteq
          </span>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#58615A',
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}>
            canteen
          </span>
        </div>

        {/* Center Navigation Links - Styled like Home ⌄, Menu ⌄, etc. */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#1C211D'
        }} className="desktop-nav-links">
          <button
            onClick={() => setActiveView('landing')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: activeView === 'landing' ? 800 : 600,
              color: activeView === 'landing' ? '#EE4322' : '#1C211D',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Home <ChevronDown size={14} color="#8A948C" />
          </button>

          <button
            onClick={() => {
              setCurrentRole('student');
              setActiveView('app');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: currentRole === 'student' && activeView === 'app' ? 800 : 600,
              color: currentRole === 'student' && activeView === 'app' ? '#EE4322' : '#1C211D',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Menu <ChevronDown size={14} color="#8A948C" />
          </button>

          <button
            onClick={() => {
              setCurrentRole('kitchen');
              setActiveView('app');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: currentRole === 'kitchen' && activeView === 'app' ? 800 : 600,
              color: currentRole === 'kitchen' && activeView === 'app' ? '#EE4322' : '#1C211D',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Kitchen KDS <ChevronDown size={14} color="#8A948C" />
          </button>

          <button
            onClick={() => {
              setCurrentRole('admin');
              setActiveView('app');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: currentRole === 'admin' && activeView === 'app' ? 800 : 600,
              color: currentRole === 'admin' && activeView === 'app' ? '#EE4322' : '#1C211D',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Admin <ChevronDown size={14} color="#8A948C" />
          </button>

          <button
            onClick={onOpenTableQr}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              color: '#58615A',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <QrCode size={15} /> Table QR
          </button>
        </nav>

        {/* Right Section: Campus Phone Hotline + Order Now Pill Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          {/* Phone Hotline as seen in reference image */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.88rem',
            fontWeight: 700,
            color: '#1C211D'
          }} className="phone-hotline">
            <Phone size={15} color="#EE4322" />
            <span>555-123-4567</span>
          </div>

          {/* Tray Trigger (if in student mode) */}
          {currentRole === 'student' && (
            <button
              onClick={onOpenCart}
              style={{
                background: 'transparent',
                border: '1px solid #E8E2D6',
                borderRadius: '12px',
                padding: '9px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#1C211D',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              <ShoppingBag size={17} color="#EE4322" />
              <span>Tray</span>
              {totalCartItems > 0 && (
                <span style={{
                  background: '#EE4322',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.72rem',
                  padding: '1px 7px',
                  borderRadius: '999px',
                }}>
                  {totalCartItems}
                </span>
              )}
            </button>
          )}

          {/* Solid Red-Orange Pill 'Order Now' button as in reference image */}
          <button
            className="btn btn-primary"
            style={{
              padding: '11px 22px',
              borderRadius: '999px',
              fontSize: '0.92rem',
              fontWeight: 700,
              letterSpacing: '-0.01em'
            }}
            onClick={() => {
              setCurrentRole('student');
              setActiveView('app');
            }}
          >
            Order Now
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav-links {
            display: flex !important;
          }
          .phone-hotline {
            display: flex !important;
          }
        }
        @media (max-width: 959px) {
          .desktop-nav-links {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
