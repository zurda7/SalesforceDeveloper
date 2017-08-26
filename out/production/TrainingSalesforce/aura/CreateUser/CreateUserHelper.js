({
   save: function(component, name, password, email, nickname) {
      //Save the user and close the panel
      var action = component.get("c.saveUser");
         action.setParams({
            "name": name,
            "password": password,
            "email": email,
            "nickname": nickname,
            "caseStudy": component.get("v.recordId")
         });

      action.setCallback(this, function(a) {
         var response = a.getReturnValue();
         var state = action.getState();
         if(component.isValid() && state == "SUCCESS"){
            $A.get("e.force:closeQuickAction").fire();
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                  "title": "Success!",
               "message": "The test user has been created."
            });
            toastEvent.fire();
            $A.get('e.force:refreshView').fire();
         } else if (state == "ERROR") {
            console.log('There was a problem and the state is: '+ action.getState());
         }
      });
      $A.enqueueAction(action);
      },

   validatePassword : function(component, event, helper) {
      var inputCmp = component.find("userPassword");
      var value = inputCmp.get("v.value");

      if (value == undefined) {
         inputCmp.set("v.errors", [{message: "You must enter a password."}]);
      } else if (value.length < 7 || value.length > 15) {
         inputCmp.set("v.errors", [{message: "The password is the wrong length: " + value}]);
      } else if (value.search(/[0-9]+/) == -1) {
         inputCmp.set("v.errors", [{message: "The password must contain at least one number: " + value}]);
      } else if (value.search(/[a-zA-Z]+/) == -1) {
         inputCmp.set("v.errors", [{message: "The password must contain at least one letter: " + value}]);
      } else {
         inputCmp.set("v.errors", null);
      }
      },

   validateEmail : function(component, event, helper) {
      var inputCmp = component.find("userEmail");
      var value = inputCmp.get("v.value");

      if (value == undefined) {
         inputCmp.set("v.errors", [{message: "You must enter an email."}]);
         return;
      }

      var apos = value.indexOf("@");
      var dotpos = value.lastIndexOf(".");

      if (apos<1||dotpos-apos<2){
         inputCmp.set("v.errors", [{message: "Email is not in the correct format: " + value}]);
      } else if (value.substring(apos+1, dotpos) != "gmail") {
         inputCmp.set("v.errors", [{message: "Email must be a gmail account: " + value.substring(apos+1, dotpos)}]);
      } else {
         inputCmp.set("v.errors", null);
      }
      }

})