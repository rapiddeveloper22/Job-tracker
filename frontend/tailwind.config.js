module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this includes all relevant file paths
    "./public/index.html", // Include the HTML file for Tailwind class scanning
  ],
  theme: {
    extend: {
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite', // Gradient animation
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropFilter: {
        none: 'none',
        blur: 'blur(10px)', // Glassmorphism blur effect
      },
      boxShadow: {
        lg: '0px 10px 20px rgba(0, 0, 0, 0.25)', // Custom shadow for futuristic design
        xl: '0px 15px 30px rgba(0, 0, 0, 0.3)', // Elevated hover effect
      },
      colors: {
        'glass-bg': 'rgba(255, 255, 255, 0.1)', // Transparent background for glassmorphism
        'gradient-start': '#3b82f6', // Start of gradient
        'gradient-end': '#9333ea', // End of gradient
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Optional plugin for modern form styling
    require('@tailwindcss/typography'), // Optional plugin for enhanced text styles
  ],
};
