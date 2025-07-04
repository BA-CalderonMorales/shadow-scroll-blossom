import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingsProvider, useSettings } from '../SettingsContext';

// Test component that uses the settings context
const TestComponent: React.FC = () => {
  const {
    trackingType,
    setTrackingType,
    isDarkMode,
    setIsDarkMode,
    backgroundType,
    setBackgroundType,
    particleStyle,
    setParticleStyle,
  } = useSettings();

  return (
    <div>
      <div data-testid="tracking-type">{trackingType}</div>
      <div data-testid="dark-mode">{isDarkMode.toString()}</div>
      <div data-testid="background-type">{backgroundType}</div>
      <div data-testid="particle-style">{particleStyle}</div>
      
      <button onClick={() => setTrackingType('intense')} data-testid="set-tracking">
        Set Tracking
      </button>
      <button onClick={() => setIsDarkMode(!isDarkMode)} data-testid="toggle-dark">
        Toggle Dark
      </button>
      <button onClick={() => setBackgroundType('ocean')} data-testid="set-background">
        Set Background
      </button>
      <button onClick={() => setParticleStyle('elegant')} data-testid="set-particle">
        Set Particle
      </button>
    </div>
  );
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <SettingsProvider>
      {component}
    </SettingsProvider>
  );
};

describe('SettingsContext', () => {
  describe('initialization', () => {
    it('should initialize with default values when localStorage is empty', () => {
      (localStorage.getItem as jest.Mock).mockReturnValue(null);
      (window.matchMedia as jest.Mock).mockReturnValue({ matches: false });

      renderWithProvider(<TestComponent />);

      expect(screen.getByTestId('tracking-type')).toHaveTextContent('subtle');
      expect(screen.getByTestId('dark-mode')).toHaveTextContent('false');
      expect(screen.getByTestId('background-type')).toHaveTextContent('none');
      expect(screen.getByTestId('particle-style')).toHaveTextContent('default');
    });

    it('should initialize from localStorage when values exist', () => {
      (localStorage.getItem as jest.Mock)
        .mockReturnValueOnce('intense') // trackingType
        .mockReturnValueOnce('true') // isDarkMode
        .mockReturnValueOnce('ocean') // backgroundType
        .mockReturnValueOnce('elegant'); // particleStyle

      renderWithProvider(<TestComponent />);

      expect(screen.getByTestId('tracking-type')).toHaveTextContent('intense');
      expect(screen.getByTestId('dark-mode')).toHaveTextContent('true');
      expect(screen.getByTestId('background-type')).toHaveTextContent('ocean');
      expect(screen.getByTestId('particle-style')).toHaveTextContent('elegant');
    });

    it('should respect system dark mode preference when localStorage is empty', () => {
      (localStorage.getItem as jest.Mock).mockImplementation((key) => {
        return key === 'darkMode' ? null : 'default-value';
      });
      (window.matchMedia as jest.Mock).mockReturnValue({ matches: true });

      renderWithProvider(<TestComponent />);

      expect(screen.getByTestId('dark-mode')).toHaveTextContent('true');
    });
  });

  describe('state updates', () => {
    it('should update tracking type and persist to localStorage', async () => {
      const user = userEvent.setup();
      renderWithProvider(<TestComponent />);

      await user.click(screen.getByTestId('set-tracking'));

      expect(screen.getByTestId('tracking-type')).toHaveTextContent('intense');
      expect(localStorage.setItem).toHaveBeenCalledWith('trackingType', 'intense');
    });

    it('should toggle dark mode and persist to localStorage', async () => {
      const user = userEvent.setup();
      (localStorage.getItem as jest.Mock).mockReturnValue(null);
      (window.matchMedia as jest.Mock).mockReturnValue({ matches: false });

      renderWithProvider(<TestComponent />);

      await user.click(screen.getByTestId('toggle-dark'));

      expect(screen.getByTestId('dark-mode')).toHaveTextContent('true');
      expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'true');
    });

    it('should update background type and persist to localStorage', async () => {
      const user = userEvent.setup();
      renderWithProvider(<TestComponent />);

      await user.click(screen.getByTestId('set-background'));

      expect(screen.getByTestId('background-type')).toHaveTextContent('ocean');
      expect(localStorage.setItem).toHaveBeenCalledWith('backgroundType', 'ocean');
    });

    it('should update particle style and persist to localStorage', async () => {
      const user = userEvent.setup();
      renderWithProvider(<TestComponent />);

      await user.click(screen.getByTestId('set-particle'));

      expect(screen.getByTestId('particle-style')).toHaveTextContent('elegant');
      expect(localStorage.setItem).toHaveBeenCalledWith('particleStyle', 'elegant');
    });
  });

  describe('dark mode behavior', () => {
    it('should add dark class to document when enabling dark mode', async () => {
      const user = userEvent.setup();
      renderWithProvider(<TestComponent />);

      await user.click(screen.getByTestId('toggle-dark'));

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should remove dark class from document when disabling dark mode', async () => {
      const user = userEvent.setup();
      (localStorage.getItem as jest.Mock).mockImplementation((key) => {
        return key === 'darkMode' ? 'true' : null;
      });

      renderWithProvider(<TestComponent />);

      await user.click(screen.getByTestId('toggle-dark'));

      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'false');
    });
  });

  describe('fluid background behavior', () => {
    it('should set tracking type to none when background is set to fluid', async () => {
      const user = userEvent.setup();
      
      const FluidTestComponent: React.FC = () => {
        const { trackingType, backgroundType, setBackgroundType } = useSettings();
        return (
          <div>
            <div data-testid="tracking-type">{trackingType}</div>
            <div data-testid="background-type">{backgroundType}</div>
            <button onClick={() => setBackgroundType('fluid')} data-testid="set-fluid">
              Set Fluid
            </button>
          </div>
        );
      };

      renderWithProvider(<FluidTestComponent />);

      await user.click(screen.getByTestId('set-fluid'));

      expect(screen.getByTestId('background-type')).toHaveTextContent('fluid');
      expect(screen.getByTestId('tracking-type')).toHaveTextContent('none');
      expect(localStorage.setItem).toHaveBeenCalledWith('backgroundType', 'fluid');
      expect(localStorage.setItem).toHaveBeenCalledWith('trackingType', 'none');
    });
  });

  describe('error handling', () => {
    it('should throw error when useSettings is used outside SettingsProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useSettings must be used within a SettingsProvider');

      consoleSpy.mockRestore();
    });
  });
});