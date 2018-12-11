var Q = require('q');
var FCM = require('fcm-push');
var apn = require('apn');
var fs  = require('fs');
var pushRepo = require('push/repositories/push.repository');

// ================= Start for ANDROID push Notification config =========
var fcm = new FCM(config.android_serverKey);
// ================= End for ANDROID push Notification config ===========


// ================= Start IOS push Notification config =================
var options = {
    token: {
        key: config.ios_key,
        keyId: config.ios_keyId,
        teamId: config.ios_teamId
    },
    production: false
};
var apnProviderForDriver = new apn.Provider(options);
// ================= End IOS push Notification config ===================

exports.send = function (deviceType, deviceToken, title, from, to, params) {
    var deferred = Q.defer();

    if((deviceType !== undefined && deviceToken !== undefined ) && (deviceType !== '' && deviceToken !== '')) {

        if (deviceType.toLowerCase() == "ios") {
            var note = new apn.Notification();

            note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
            note.badge = 1;
            note.title = title;
            note.payload = params;
            note.body = params.text;
            note.topic = "com.scope.TheScope";

            console.log("Before ios push send");
            console.log(deviceType, deviceToken, title, from, to, params);
            

            apnProviderForDriver.send(note, deviceToken).then((result) => {
    
                console.log("IOS push response", result);
    
                var pushObject = {};
                pushObject.title = title;
                pushObject.to = to;
                pushObject.message = params;
                pushObject.date = new Date();
                
                pushRepo.save(pushObject, function (err, result) {
                    if (err) deferred.reject({ "status": 500, data: [], "message": err.message });
                    deferred.resolve({ "status": 200, data: [], "message": "Saved Successfully" });

                })    

            }).catch(function(err) {
                console.log("Something has gone wrong in ios push notification", err);
                deferred.reject({ "status": 403, data: [], "message": err });
            });
        } else {
            var message = {
                to: deviceToken,
                notification: {
                    click_action: ".SplashActivity",
                    title: title,
                    body: params.text
                },
                data: params
            };


            fcm.send(message)
                .then(function (response) {
                    response = JSON.parse(response);
    
                    console.log("Android push response", response);

                    var pushObject = {};
                    pushObject.title = title;
                    pushObject.to = to;
                    pushObject.message = params;
                    pushObject.date = new Date();
    
                    pushRepo.save(pushObject, function (err, result) {
                        if (err) deferred.reject({ "status": 500, data: [], "message": err.message });
                        deferred.resolve({ "status": 200, data: [], "message": "Saved Successfully" });
    
                    }) 
                })
                .catch(function (err) {
                    console.log("Something has gone wrong in android push notification", err);
                    deferred.reject({ "status": 403, data: [], "message": err });
                });
        }

    }

    return deferred.promise;
};