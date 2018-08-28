({
    doInit: function (component) {
        var action = component.get("c.runReport");

        action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {

                    var reportData = JSON.parse(response.getReturnValue());
                    reportData = reportData.factMap['T!T'].rows;


                    var recordId = component.get("v.recordId");
                    console.log(recordId);
                    console.log(reportData);
                    for (var i = 0; i < reportData.length; i++) {

                        if (reportData[i].dataCells[0].value === recordId) {
                            var contacts = reportData[i].dataCells[1].value;
                            var opportunities = reportData[i].dataCells[2].value;
                            component.set('v.contactsNumber', contacts);
                            component.set('v.opportunitiesNumber', opportunities);
                            console.log('cont = ' + contacts + ' opp = ' + opportunities);
                        }
                    }

                }


            }
        );

        $A.enqueueAction(action);
    }

})