module.exports = function(sequelize, DataTypes){
    var Reviews = sequelize.define("Reviews", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        starRating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        submittedBy: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Reviews.associate = function(models){
        Reviews.belongsTo(models.Potty, {
            foreingKey: {
                allowNull: false
            }
        });
    };

    return Reviews;
};