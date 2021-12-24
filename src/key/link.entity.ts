import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  IP: string;

  @Column()
  MAC: string;

  @Column()
  link_url: string;

  @Column({ type: 'timestamptz' })
  created_at: Date;
}
