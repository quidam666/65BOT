module.exports = {

    checkIfUserExist: function (pgClient, userProfile, callback) {
        pgClient.query('SELECT exists(SELECT true FROM hsuser WHERE ID=($1))', [userProfile.userId])
            .on('row', function (row) {
                console.log('checkIfUserExist ' + JSON.parse(JSON.stringify(row)).exists)
                callback(JSON.parse(JSON.stringify(row)).exists)
            })
    },

    saveUser: function (pgClient, userProfile) {
        console.log('saveUser ' + JSON.stringify(userProfile))
        // console.log('saveUser ' + userProfile.userId)
        // console.log('saveUser ' + userProfile.pictureUrl)
        // console.log('saveUser ' + userProfile.statusMessage)
        pgClient.query('INSERT INTO hsuser(id, name, location,pictureurl) values($1, $2, $3, $4)'
            , [userProfile.userId, userProfile.displayName, {}, userProfile.pictureUrl])
    },

    saveUserLocation: function (pgClient, user, zone, callback) {
        var locationZones = user.location
        locationZones.push(zone)
        var query = "UPDATE hsuser SET location = ($1) where id = ($2)"
        pgClient.query(query, [locationZones, user.id], function (err, result) {
            if (err) {
                console.log("Failed to update user data ");
                throw err;
            } else {
                console.log("Successfully updated user data!! ");
            }
        });
        callback()
    },

    getUser: function (pgClient, userId, callback) {
        console.log('getUser ' + userId)
        // console.log('saveUser ' + userProfile.userId)
        // console.log('saveUser ' + userProfile.pictureUrl)
        // console.log('saveUser ' + userProfile.statusMessage)
        pgClient.query('SELECT * FROM hsuser WHERE id=($1)', [userId])
            .on('row', function (row, result) {
                result.addRow(row);
            })
            .on('end', function (result) {
                console.log('(getUser) ' + result.rows.length + ' rows were received');
                console.log('(getUser) ' + JSON.stringify(result.rows))
                callback(result.rows)
            })
    },

    getActivitiesFromDB: function (pgClient, city, callback) {
        console.log('(find Activity) ' + city)
        var activities = []
        pgClient.query('SELECT * FROM activity WHERE city=($1)', [city],function (err, result){
             if (err) {
                console.log("Failed to ind Activity ");
                throw err;
            } else {
               console.log("!!!!!!! ");
            }
        }).on('row', function (row, result) {
                result.addRow(row);
            })
            .on('end', function (result) {
                console.log('(find Activity) ' + result.rows.length + ' rows were received');
                console.log('(find Activity) ' + JSON.stringify(result.rows))
                callback(JSON.stringify(result.rows))
            })
    }
}