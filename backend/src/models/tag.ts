import {
    AllowNull,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import User from "./user";
import Vacation from "./vacation";

@Table({
    underscored: true,
    tableName: 'vacation_tags'
})
export default class VacationTag extends Model {
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    userId: string;

    @ForeignKey(() => Vacation)
    @AllowNull(false)
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    vacationId: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @BelongsTo(() => Vacation)
    vacation: Vacation;
}