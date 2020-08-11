import { DataType, Column, Model, Table } from 'sequelize-typescript';

import { IBenchmark, PipelineStage } from '../../interfaces';

import { jsonColumn } from './decorators';

@Table
export class Benchmark extends Model<Benchmark> implements IBenchmark {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  name!: string;

  @Column(DataType.STRING)
  author!: string;

  // TODO: REVIEW: magic number 1024
  @Column(jsonColumn<PipelineStage[]>('stages', 1024))
  stages!: PipelineStage[];
}