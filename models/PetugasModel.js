import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const pengaduan = db.define("pengaduan",{
    id_pengaduan: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        primaryKey: true,
    },
    nama_petugas: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    level: DataTypes.STRING,
})

await pengaduan.sync();

export default pengaduan;