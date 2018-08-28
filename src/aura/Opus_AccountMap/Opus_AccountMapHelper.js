({
    addMarkers: function (component) {
        var accounts = component.get('v.accounts');
        var markers = component.get('v.markers');
        var map = component.get('v.map');

        if (markers) {
            markers.clearLayers();
        }
        if (accounts == null) {
            return;
        }

        if (map && accounts && accounts.length > 0) {
            for (var i = 0; i < accounts.length; i++) {
                var account = accounts[i];
                if (account.Location__Latitude__s && account.Location__Longitude__s) {
                    var latLng = [account.Location__Latitude__s, account.Location__Longitude__s];
                    var marker = window.L.marker(latLng, {account: account});
                    markers.addLayer(marker);
                    if (i == 0 && accounts.length === 1) {
                        map.panTo(latLng);
                    }
                }
            }
            map.addLayer(markers);
        }
    }
})