/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        latte: {
          DEFAULT: '#FBF6EC',
          dark: '#F2E9D6',
        },
        cream: '#FFFCF5',
        mocha: {
          DEFAULT: '#5C4434',
          light: '#7A5C45',
          dark: '#3D2818',
        },
        honey: {
          DEFAULT: '#E6B450',
          light: '#F4D58A',
        },
        dusty: '#E8B5A8',
        sage: '#A8B89C',
        butter: '#F4D58A',
        cocoa: '#7A5C45',
        paperLine: 'rgba(92, 68, 52, 0.14)',
      },
      fontFamily: {
        displayKr: ['Pretendard-ExtraBold'],
        bodyKr: ['Pretendard-Regular'],
        bodyKrMed: ['Pretendard-Medium'],
        bodyKrBold: ['Pretendard-Bold'],
        bodyKrSemi: ['Pretendard-SemiBold'],
        handwrite: ['Caveat-Bold'],
        handwriteReg: ['Caveat-Regular'],
        handwriteMed: ['Caveat-Medium'],
        displayEn: ['Fraunces-Medium'],
        displayEnItalic: ['Fraunces-MediumItalic'],
        sansEn: ['Quicksand-Medium'],
        mono: ['SpaceMono-Regular'],
        monoBold: ['SpaceMono-Bold'],
      },
      borderRadius: {
        sticker: '8px',
        polaroid: '4px',
        card: '16px',
        chip: '999px',
      },
      letterSpacing: {
        label: '0.2em',
        wide: '0.3em',
        wordmark: '0.18em',
      },
    },
  },
  plugins: [],
};
