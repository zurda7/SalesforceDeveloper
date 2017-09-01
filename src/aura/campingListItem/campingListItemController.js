({
	packItem  : function(component, event, helper) {
        var btnClicked = event.getSource();         // the button
        var btnMessage = btnClicked.get("v.label"); // the button's label
        component.set("v.item.Packed__c", true);     // update our message
        btnClicked.set("v.disabled",true); //disabled button 
	}
})