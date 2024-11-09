/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './*.js'],
  theme: {
    screens : {
      sm : '480px',
      md : '768px',
      lg : '976px',
      xl : '1440px',
    },
    extend: {
      colors : {
        bodyBg : '#F8FAFC',
        containerBg : '#FFFFFF',
        tealGreen : '#38B2AC',
        navyBlue : '#2C3E50',
        greenforIncome : '#48BB78',
        redforExpense : '#E53E3E',
        warningYellow : '#ECC94B',
        darkGray : '#4A5568',
        lightGray : '#A0AEC0',
        lightGrayBorder: '#E2E8F0'
      }
    },
  },
  plugins: [],
}
