({
    doInit: function (component, event, helper) {
        helper.onInit(component);
    },
    handleSend: function (component) {

        var complain = component.get('v.complain');
        var orderId = component.get('v.orderId');

        var action = component.get("c.saveComplain");
        action.setParams({
            "complain": complain,
            "orderId": orderId
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": "/" + orderId
                });

                urlEvent.fire();

            }
        });
        $A.enqueueAction(action);


    }
})