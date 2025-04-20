import {
    AllowNull,
    BelongsToMany,
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
    Unique,
  } from "sequelize-typescript";
  import { Association } from "sequelize";
  import Vacation from "./vacation";
  import VacationTag from "./tag";
  
  @Table({
    underscored: true,
    tableName: "users",
  })
  export default class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;
  
    @AllowNull(false)
    @Column({ type: DataType.STRING, field: "first_name" })
    firstName: string;
  
    @AllowNull(false)
    @Column({ type: DataType.STRING, field: "last_name" })
    lastName: string;
  
    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    password: string;
  
    @AllowNull(false)
    @Default("user")
    @Column(DataType.ENUM("user", "admin"))
    role: "user" | "admin";
  
    // 🔁 Association for /users/me/vacations
    @BelongsToMany(() => Vacation, {
      through: () => VacationTag,
      as: "followedVacations", // 👈 alias used in controller
    })
    followedVacations?: Vacation[];
  
    // Optional original association name
    @BelongsToMany(() => Vacation, {
      through: () => VacationTag,
      as: "taggedVacations",
    })
    taggedVacations?: Vacation[];
  
    public static associations: {
      followedVacations: Association<User, Vacation>;
      taggedVacations: Association<User, Vacation>;
    };
  }
  