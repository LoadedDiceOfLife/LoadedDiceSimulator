var target = "#selectA";

var init_map  = function() {
    $("#continue_button").hide();

    $("#continue_button").click(function() {
        $("#continue_button").hide();
        $("#popup-selectA").hide();
        $("#popup-selectB").hide();
        $.fn.fullpage.moveSectionDown();

        var selectA_code = $("#popup-selectA").attr('class').split('-')[1];
        var selectB_code = $("#popup-selectB").attr('class').split('-')[1];
        var url = "http://c3e55f9d.ngrok.io/profiles?locations[]="+selectA_code+"&locations[]="+selectB_code;
        console.log(url)
        $.getJSON(url, function(data){
            // TODO: Do some amazing stuff with the data
            console.log(data);
            var count = 1;
            (data.profiles).forEach(function (profile) {
                var edu = profile['age-1'].events.education;
                var house = profile['age-3'].events.houseOwnership;
                console.log(edu);
                console.log(house);
                
                $('.class-age'+ count).html(edu);
                $('.class-house'+ count).html('Owns a house: '+ house);
                count++
            });
        });
    });

    var map = L.map('map', {
        scrollWheelZoom: false,
        touchZoom: false,
        doubleClickZoom: false,
        zoomControl:false
    });

    // center the map
    var center = new L.LatLng(-41.3, 174.783);
    map.setView(center, 11);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'philboltt.9dd31210',
        accessToken: 'pk.eyJ1IjoicGhpbGJvbHR0IiwiYSI6IjA4OTRkZDQ3ZTcwN2ZkNDE1N2YyYWM4MTI5Y2M2NmVlIn0.MIzNhfl_6OknKdOj9gWhNw'
    }).addTo(map);

    // Create an empty layer where we will load the polygons
    var featureLayer = new L.GeoJSON();

    var getDIColour = function (feature) {
        switch (feature.properties.DI) {
            case 0:
                return "#ffffff";
            case 10:
                return "#7F0238";
            case 9:
                return "#7F294E";
            case 8:
                return "#CC417D";
            case 7:
                return "#FF519C";
            case 6:
                return "#FF9EC8";
            case 5:
                return "#9EC4FF";
            case 4:
                return "#5196FF";
            case 3:
                return "#4178CC";
            case 2:
                return "#294B7F";
            case 1:
                return "#00327F";
        }
    }

    var onEachFeature = function (feature, layer) {
        // Load the default style.
        var default_style = {
            weight: 2,
            opacity: 0.6,
            fillOpacity: 0.3
        }
        var highlight_style = {
            weight: 3,
            opacity: 0.6,
            fillOpacity: 0.9
        };
        var default_colour = getDIColour(feature);
        default_style['color'] = default_colour;
        highlight_style['color'] = default_colour;

        layer.setStyle(default_style);
        // Create a self-invoking function that passes in the layer
        // and the properties associated with this particular record.
        (function (layer, properties) {
            // Create a mouseover event
            layer.on("mouseover", function (e) {
                // Change the style to the highlighted version
                layer.setStyle(highlight_style);
                // Create a popup with a unique ID linked to this record
                var popup = $("<div></div>", {
                    id: "popup-" + properties.AU12,
                    css: {
                        position: "absolute",
                        bottom: "85px",
                        left: "50px",
                        zIndex: 1002,
                        backgroundColor: "white",
                        padding: "8px",
                        border: "1px solid #ccc"
                    }
                });
                // Insert a headline into that popup
                var hed = $("<div></div>", {
                    text: "Name " + properties.NAME + ": " + properties.DI,
                    css: {fontSize: "16px", marginBottom: "3px"}
                }).appendTo(popup);
                // Add the popup to the map
                popup.appendTo("#map");
            });
            layer.on("click", function (e) {
                // toggle the target
                if (target==="#selectA") {
                    $("#popup-selectA").remove();
                    var selectA_popup = $("<div></div>", {
                        id: "popup-selectA",
                        class: "AUC-"+properties.AU12,
                        css: {
                            position: "absolute",
                            top: "85px",
                            left: "100px",
                            zIndex: 1002,
                            backgroundColor: "white",
                            padding: "8px",
                            border: "1px solid #ccc"
                        }
                    });
                    var hed = $("<div></div>", {
                        text: properties.NAME,

                        css: {fontSize: "24px", marginBottom: "3px"}
                    }).appendTo(selectA_popup);
                    // Add the popup to the map
                    selectA_popup.appendTo("#map");
                    target = "#selectB";
                } else {
                    $("#popup-selectB").remove();
                    var popup = $("<div></div>", {
                        id: "popup-selectB",
                        class: "AUC-"+properties.AU12,
                        css: {
                            position: "absolute",
                            top: "85px",
                            right: "100px",
                            zIndex: 1002,
                            backgroundColor: "white",
                            padding: "8px",
                            border: "1px solid #ccc"
                        }
                    });
                    var hed = $("<div></div>", {
                        text: properties.NAME,
                        css: {fontSize: "24px", marginBottom: "3px"}
                    }).appendTo(popup);
                    // Add the popup to the map
                    popup.appendTo("#map");
                    target = "#selectA";

                    // show "Roll the dice button"
                    $("#continue_button").show();
                }
            });
            // Create a mouseout event that undoes the mouseover changes
            layer.on("mouseout", function (e) {
                // Start by reverting the style back
                layer.setStyle(default_style);
                // And then destroying the popup
                $("#popup-" + properties.AU12).remove();
            });
            // Close the "anonymous" wrapper function, and call it while passing
            // in the variables necessary to make the events work the way we want.
        })(layer, feature.properties);
    };

    $.getJSON("assets/data/areaunits_wgtn.geojson", function (json) {
        var featureLayer = L.geoJson(json.features, {
            // And link up the function to run when loading each feature
            onEachFeature: onEachFeature
        });
        map.addLayer(featureLayer);
    });
}
