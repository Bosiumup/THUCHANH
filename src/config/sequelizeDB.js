import { Sequelize } from "sequelize";
// Tạo kết nối tới MySQL
const sequelize = new Sequelize("nodejs_test", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export default sequelize;
