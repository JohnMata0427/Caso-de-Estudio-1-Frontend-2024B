import { check } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '5s', target: 100 },
    { duration: '10s', target: 200 },
    { duration: '5s', target: 0 },
  ],
};

export default function Homepage() {
  const BASE_URL = 'https://sistema-de-gestion-de-matriculas.vercel.app';
  const headers = {
    'User-Agent': 'k6',
  };

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/iniciar-sesion`,
      null,
      { tags: { ctype: 'html' }, headers },
    ],
    [
      'GET',
      `${BASE_URL}/styles-OAZE2G5Y.css`,
      null,
      { tags: { ctype: 'css' }, headers },
    ],
    [
      'GET',
      `${BASE_URL}/polyfills-FFHMD2TL.js`,
      null,
      { tags: { ctype: 'js' }, headers },
    ],
    [
      'GET',
      `${BASE_URL}/main-TVQ5I5Y7.js`,
      null,
      { tags: { ctype: 'js' }, headers },
    ],
    [
      'GET',
      `${BASE_URL}/fondo.jpg`,
      null,
      { tags: { ctype: 'images' }, headers },
    ],
  ]);

  check(responses, {
    'Login cargado exitosamente': (r) => r[0].status === 200,
    'Estilos cargados exitosamente': (r) => r[1].status === 200,
    'Polyfills cargados exitosamente': (r) => r[2].status === 200,
    'Main cargado exitosamente': (r) => r[3].status === 200,
    'Imagen de fondo cargada exitosamente': (r) => r[4].status === 200,
  });
}
