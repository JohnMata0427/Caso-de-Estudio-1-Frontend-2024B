interface Route {
  path: string;
  icon: string;
  iconFilled: string;
}

export const NAVIGATION_ROUTES: Route[] = [
  {
    path: 'estudiantes',
    icon: 'm12 21-7-3.8v-6L1 9l11-6 11 6v8h-2v-6.9l-2 1.1v6zm0-8.3L18.9 9 12 5.3 5.2 9zm0 6 5-2.7v-3.8L12 15l-5-2.8V16zm0-3.7',
    iconFilled:
      'M21 17v-6.9L12 15 1 9l11-6 11 6v8zm-9 4-7-3.8v-5l7 3.8 7-3.8v5z',
  },
  {
    path: 'materias',
    icon: 'M7.5 22Q6.1 22 5 21t-1-2.5v-13Q4 4.1 5 3t2.5-1H20v15q-.6 0-1 .4t-.5 1.1.4 1 1.1.5v2zM6 15.3q.3-.2.7-.2t.8-.1H8V4h-.5q-.6 0-1 .4T6 5.5zm4-.3h8V4h-8zm-4 .3V4zM7.5 20h9.3l-.2-.7-.1-.8v-.8q0-.4.3-.7H7.5q-.7 0-1 .4T6 18.5q0 .7.4 1t1.1.5',
    iconFilled:
      'M7.5 22Q6.1 22 5 21t-1-2.5v-13Q4 4.1 5 3t2.5-1H20v15q-.6 0-1 .4t-.5 1.1.4 1 1.1.5v2zm.5-7h2V4H8zm-.5 5h9.3l-.2-.7-.1-.8v-.8q0-.4.3-.7H7.5q-.7 0-1 .4T6 18.5q0 .7.4 1t1.1.5',
  },
  {
    path: 'matriculas',
    icon: 'M14 13h5v-2h-5zm0-3h5V8h-5zm-9 6h8v-.6q0-1-1.1-1.7T9 13t-2.9.7T5 15.5zm4-4q.8 0 1.4-.6T11 10t-.6-1.4T9 8t-1.4.6T7 10t.6 1.4T9 12m-5 8q-.8 0-1.4-.6T2 18V6q0-.8.6-1.4T4 4h16q.8 0 1.4.6T22 6v12q0 .8-.6 1.4T20 20zm0-2h16V6H4zm0 0V6z',
    iconFilled:
      'M14 13h5v-2h-5zm0-3h5V8h-5zm-9 6h8v-.6q0-1-1.1-1.7T9 13t-2.9.7T5 15.5zm4-4q.8 0 1.4-.6T11 10t-.6-1.4T9 8t-1.4.6T7 10t.6 1.4T9 12m-5 8q-.8 0-1.4-.6T2 18V6q0-.8.6-1.4T4 4h16q.8 0 1.4.6T22 6v12q0 .8-.6 1.4T20 20z',
  },
];
