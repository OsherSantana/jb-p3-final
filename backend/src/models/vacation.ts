import {
    AllowNull,
    BelongsToMany,
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import User from "./user";
import VacationTag from "./tag";

@Table({
    underscored: true,
    tableName: 'vacations'
})
export default class Vacation extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    destination: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string;

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    startDate: Date;

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    endDate: Date;

    @AllowNull(false)
    @Column(DataType.DECIMAL(10, 2))
    price: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    imageFileName: string;

    @BelongsToMany(() => User, {
        through: () => VacationTag,
        as: "taggedByUsers",
    })
    taggedByUsers: User[];

}