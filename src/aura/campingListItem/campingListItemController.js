({
	packItem  : function(component, event, helper) {
        var btnClicked = event.getSource();         // the button
        var btnMessage = btnClicked.get("v.label"); // the button's label
        var a = component.get("v.item",true);
            a.Packed__c = true;
            component.set("v.item",a);
        btnClicked.set("v.disabled",true); //disabled button 
	}
})