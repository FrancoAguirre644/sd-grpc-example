import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('turnos')
export class Turno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  paciente!: string;

  @Column()
  fecha!: string;

  @Column()
  hora!: string;

  @Column()
  estado!: string;
}