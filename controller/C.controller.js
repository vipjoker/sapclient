sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/ui/core/format/DateFormat',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'
], function (jQuery, MessageToast, DateFormat, Controller, JSONModel) {
    "use strict";

    var CController = Controller.extend("controller.C", {

        onInit: function () {

            getUsers(this);
        },

        onPost: function (oEvent) {
            var oFormat = DateFormat.getDateTimeInstance({style: "medium"});
            var oDate = new Date();
            var sDate = oFormat.format(oDate);
            // create new entry
            var sValue = oEvent.getParameter("value");
            var oEntry = {
                Author: "Alexandrina Victoria",
                AuthorPicUrl: "http://upload.wikimedia.org/wikipedia/commons/a/aa/Dronning_victoria.jpg",
                Type: "Reply",
                Date: "" + sDate,
                Text: sValue
            };

            // update model
            var oModel = this.getView().getModel();
            var aEntries = oModel.getData().EntryCollection;
            aEntries.unshift(oEntry);
            oModel.setData({
                EntryCollection: aEntries
            });
        },

        onItemPressed: function (oEvent) {


           var page2 =  sap.ui.getCore().byId("__xmlview1");
            var context  = sap.ui.getCore().byId("mainContext");
            context.to(page2);

            //var oDialog = new sap.m.Dialog({
            //
            //    content: new sap.m.Text({text:"hello"}),
            //    beginButton: new sap.m.Button({
            //        text: 'Close',
            //        press: function () {
            //            oDialog.close();
            //        }
            //    }),
            //    afterClose: function() {
            //        oDialog.destroy();
            //    }
            //});
            //oDialog.open();


        },

        onRefresh: function (oEvent) {
            MessageToast.show("Refresh");

        },

        onSenderPress: function (oEvent) {
            MessageToast.show("Clicked on Link: " + oEvent.getSource().getSender());
        },

        onIconPress: function (oEvent) {
            MessageToast.show("Clicked on Image: " + oEvent.getSource().getSender());
        }
    });


    return CController;

});


function getUsers(controller) {
    jQuery.ajax({
        url: "http://localhost:8080/ums/testuser",
        success: function (response) {
            var oModel = new sap.ui.model.json.JSONModel(response);
            controller.getView().setModel(oModel);
        }
    });

}