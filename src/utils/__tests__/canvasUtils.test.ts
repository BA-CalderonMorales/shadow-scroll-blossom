import { setupCanvas, clearCanvas } from '../canvasUtils';

// Mock console.log for logDev
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

describe('Canvas Utils', () => {
  let mockCanvas: HTMLCanvasElement;
  let mockContext: CanvasRenderingContext2D;

  beforeEach(() => {
    // Create a mock canvas element
    mockCanvas = document.createElement('canvas');
    
    // Mock the context
    mockContext = {
      fillStyle: '',
      fillRect: jest.fn(),
    } as unknown as CanvasRenderingContext2D;
    
    // Mock getContext to return our mock context
    jest.spyOn(mockCanvas, 'getContext').mockReturnValue(mockContext);
    
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setupCanvas', () => {
    it('should set canvas dimensions to window dimensions', () => {
      setupCanvas(mockCanvas);

      expect(mockCanvas.width).toBe(1024);
      expect(mockCanvas.height).toBe(768);
    });

    it('should handle different window dimensions', () => {
      window.innerWidth = 800;
      window.innerHeight = 600;

      setupCanvas(mockCanvas);

      expect(mockCanvas.width).toBe(800);
      expect(mockCanvas.height).toBe(600);
    });

    it('should handle zero window dimensions', () => {
      window.innerWidth = 0;
      window.innerHeight = 0;

      setupCanvas(mockCanvas);

      expect(mockCanvas.width).toBe(0);
      expect(mockCanvas.height).toBe(0);
    });

    it('should handle very large window dimensions', () => {
      window.innerWidth = 4096;
      window.innerHeight = 2160;

      setupCanvas(mockCanvas);

      expect(mockCanvas.width).toBe(4096);
      expect(mockCanvas.height).toBe(2160);
    });
  });

  describe('clearCanvas', () => {
    beforeEach(() => {
      mockCanvas.width = 1024;
      mockCanvas.height = 768;
    });

    it('should use dark mode fill style by default', () => {
      clearCanvas(mockContext, mockCanvas);

      expect(mockContext.fillStyle).toBe('rgba(8, 12, 20, 0.05)');
      expect(mockContext.fillRect).toHaveBeenCalledWith(0, 0, 1024, 768);
    });

    it('should use dark mode fill style when isDarkMode is true', () => {
      clearCanvas(mockContext, mockCanvas, true);

      expect(mockContext.fillStyle).toBe('rgba(8, 12, 20, 0.05)');
      expect(mockContext.fillRect).toHaveBeenCalledWith(0, 0, 1024, 768);
    });

    it('should use light mode fill style when isDarkMode is false', () => {
      clearCanvas(mockContext, mockCanvas, false);

      expect(mockContext.fillStyle).toBe('rgba(248, 250, 252, 0.08)');
      expect(mockContext.fillRect).toHaveBeenCalledWith(0, 0, 1024, 768);
    });

    it('should fill entire canvas area', () => {
      mockCanvas.width = 800;
      mockCanvas.height = 600;

      clearCanvas(mockContext, mockCanvas);

      expect(mockContext.fillRect).toHaveBeenCalledWith(0, 0, 800, 600);
    });

    it('should handle edge case of zero-sized canvas', () => {
      mockCanvas.width = 0;
      mockCanvas.height = 0;

      clearCanvas(mockContext, mockCanvas);

      expect(mockContext.fillRect).toHaveBeenCalledWith(0, 0, 0, 0);
    });

    it('should handle unusual canvas dimensions', () => {
      mockCanvas.width = 123;
      mockCanvas.height = 456;

      clearCanvas(mockContext, mockCanvas);

      expect(mockContext.fillRect).toHaveBeenCalledWith(0, 0, 123, 456);
    });
  });

  describe('integration behavior', () => {
    it('should work correctly when setupCanvas and clearCanvas are used together', () => {
      // Setup canvas
      setupCanvas(mockCanvas);
      
      // Clear canvas
      clearCanvas(mockContext, mockCanvas, true);

      // Verify the canvas was sized correctly
      expect(mockCanvas.width).toBe(1024);
      expect(mockCanvas.height).toBe(768);
      
      // Verify the canvas was cleared with correct dimensions
      expect(mockContext.fillRect).toHaveBeenCalledWith(0, 0, 1024, 768);
    });

    it('should maintain canvas state across multiple operations', () => {
      // Initial setup
      setupCanvas(mockCanvas);
      clearCanvas(mockContext, mockCanvas, true);
      
      // Change window size and setup again
      window.innerWidth = 500;
      window.innerHeight = 300;
      setupCanvas(mockCanvas);
      clearCanvas(mockContext, mockCanvas, false);

      // Verify final state
      expect(mockCanvas.width).toBe(500);
      expect(mockCanvas.height).toBe(300);
      expect(mockContext.fillStyle).toBe('rgba(248, 250, 252, 0.08)');
      expect(mockContext.fillRect).toHaveBeenLastCalledWith(0, 0, 500, 300);
    });
  });
});