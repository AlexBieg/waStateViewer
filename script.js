var app = angular.module("app", []);

app.controller("homeController", function($scope, $http) {
    var url = "http://wslwebservices.leg.wa.gov/legislationservice.asmx/GetLegislationByYear?year=2014";
    var data = {
        address: url
    };
    $http.post('proxy.php', data).then(function(response) {
            console.log(response);
            $scope.bills = formatBills(xmlToJson($.parseXML(response)).ArrayOfLegislationInfo.LegislationInfo);
            console.log($scope.bills);
    });
});

function formatBills(bills) {
    for (var i = 0; i < bills.length; i++) {
        bills[i].BillId = bills[i].BillId["#text"];
        bills[i].Active = bills[i].Active["#text"];
        bills[i].Biennium = bills[i].Biennium["#text"];
        bills[i].BillNumber = bills[i].BillNumber["#text"];
        bills[i].EngrossedVersion = bills[i].EngrossedVersion["#text"];
        bills[i].OriginalAgency = bills[i].OriginalAgency["#text"];
        bills[i].LegislationType = bills[i].ShortLegislationType.LongLegislationType["#text"];
    }
    return bills;
}

// Changes XML to JSON
//Credit for this function to David Walsh: https://davidwalsh.name/convert-xml-json
function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
