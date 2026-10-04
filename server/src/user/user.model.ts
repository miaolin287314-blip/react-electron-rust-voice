
import {
  Column,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from '../common/models/base.model.js';

@Table({
  tableName: 'fjwh_users',
})
export class User extends BaseModel {

  @Column({
    unique: true,
  })
  declare username: string;

  @Column
  declare password: string;
}