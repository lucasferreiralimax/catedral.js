// filepath: c:\Users\Lucas\Documents\catedral.js\rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import strip from 'rollup-plugin-strip';

export default {
  input: 'src/catedral.js', // Arquivo de entrada principal
  output: {
    file: 'public/catedral.js', // Arquivo de saída na pasta public
    format: 'iife', // Formato compatível com navegadores
    name: 'Catedral', // Nome da biblioteca no escopo global
  },
  plugins: [
    resolve(), // Resolve pacotes do node_modules
    commonjs(), // Converte CommonJS para ESModules
    strip({
      include: '**/*.(js|ts)', // Aplica o strip em arquivos JS e TS
      functions: ['console.log', 'console.warn', 'console.error'], // Remove logs
    }),
    terser(), // Minifica o código para melhorar a performance
  ],
};