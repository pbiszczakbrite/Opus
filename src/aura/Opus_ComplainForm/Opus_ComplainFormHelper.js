({
    onInit: function (component, event) {
        var orderId;
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('?'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === 'orderId') {
                orderId = sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
        component.set('v.orderId', orderId);


        component.set("v.products", []);
        // var orderId = component.get("v.pageReference").state.orderId;
        console.log('order id = ' + orderId);
        var getAllAction = component.get("c.getProducts");

        getAllAction.setParams({
            "orderId": orderId
        });

        getAllAction.setCallback(this, function (response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.products", response.getReturnValue());
            }
        });
        $A.enqueueAction(getAllAction);
    }
})