import type { Estudiante } from '@/interfaces/estudiante.interface';
import type { Materia } from '@/interfaces/materias.interface';
import type { Matricula } from '@/interfaces/matricula.interface';

export type SystemData = Estudiante | Materia | Matricula;
export type SystemTitle = 'estudiantes' | 'materias' | 'matriculas';

interface InputNames {
  [key: string]: {
    type: string;
    placeholder?: string;
  };
}

export const COLUMN_NAMES: Record<SystemTitle, string[]> = {
  estudiantes: [
    'ID',
    'Nombre',
    'Apellido',
    'Cedula',
    'Fecha de Nacimiento',
    'Ciudad',
    'Dirección',
    'Teléfono',
    'Email',
  ],
  materias: ['ID', 'Nombre', 'Código', 'Descripción', 'Créditos'],
  matriculas: [
    'ID',
    'Código',
    'Descripción',
    'ID del Estudiante',
    'ID de la Materia',
  ],
};

export const INPUT_NAMES: Record<SystemTitle, InputNames> = {
  estudiantes: {
    nombre: { type: 'text', placeholder: 'Juan' },
    apellido: { type: 'text', placeholder: 'Perez' },
    cedula: { type: 'number', placeholder: '123456789' },
    fecha_nacimiento: { type: 'date' },
    ciudad: { type: 'text', placeholder: 'Quito' },
    direccion: { type: 'text', placeholder: 'Sur de Quito, Calle 123' },
    telefono: { type: 'number', placeholder: '0987654321' },
    email: { type: 'email', placeholder: 'example@correo.com' },
  },
  materias: {
    nombre: { type: 'text', placeholder: 'Programación II' },
    descripcion: {
      type: 'text',
      placeholder: 'Lógica de programación avanzada',
    },
    codigo: { type: 'text', placeholder: 'ISPD342' },
    creditos: { type: 'number', placeholder: '3' },
  },
  matriculas: {
    codigo: { type: 'text', placeholder: '2024A0005' },
    descripcion: { type: 'text', placeholder: 'Estudiante de primer semestre' },
    id_estudiante: { type: 'number', placeholder: '1' },
    id_materia: { type: 'number', placeholder: '1' },
  },
};
