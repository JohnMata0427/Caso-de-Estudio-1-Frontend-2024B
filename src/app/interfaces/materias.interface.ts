import { Matricula } from './matricula.interface';

export interface Materia {
  id: number;
  nombre: string;
  descripcion: string;
  codigo: string;
  creditos: number;
  matriculas: Matricula[];
}
