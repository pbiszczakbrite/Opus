({
    onSave: function (component, event, helper) {

        component.find("service").saveRecord(function (saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                var resultsToast = $A.get("e.force:showToast");
                if (resultsToast) {
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": "Opportunity Saved"
                    });
                    resultsToast.fire();
                }
                else {
                    alert('Opportunity Saved');
                }

                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": "/" + component.get('v.recordId')
                });

                urlEvent.fire();
            }


        });
    },
    onCancel: function (component, event, helper) {


                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": "/" + component.get('v.recordId')
                });

                urlEvent.fire();

    },
    doInit: function (component, event, helper) {

        component.find("service").reloadRecord();

    }

})