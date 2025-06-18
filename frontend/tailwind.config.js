module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"], 
  darkMode: false, 
  theme: {
    extend: {
      fontFamily: {
        arial: ['Times New Roman', 'sans-serif'],
        bell: ['Bell MT', 'serif'],
        mono: ['Courier New', 'monospace'],
        serif: ['Bree Serif', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        bebas: ['Bebas Neue', 'cursive'],
        anton: ['Anton', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        archivo: ['Archivo Black', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
        exo: ['Exo 2', 'sans-serif'],
      },
      colors: {
        primary: '#4f5b49',
        secondary: '#CC0066',
        success: '#319055',
        deepblue: '#003366',
        slategray: '#36454F',
        aqua: '#007F86',
        btn_bg:'#629645',
        hover_btn_bg:'#4f8a2f',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
