sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Fragment, Controller, JSONModel) {
	"use strict";

	var PageController = Controller.extend("controller.Page", {

		onInit: function (oEvent) {





			var fakeData = {
				"SupplierCollection": [
					{
						"SupplierName": "Red Point Stores",
						"Street": "Main St",
						"HouseNumber": "1618",
						"ZIPCode": "31415",
						"City": "Maintown",
						"Country": "Germany",
						"Url": "http://www.sap.com",
						"Twitter": "@sap",
						"Tel" : "+49 6227 747474",
						"Sms" : "+49 173 123456",
						"Email" : "john.smith@sap.com"
					}
				]
			};



			var oModel = new JSONModel(fakeData);
			this.getView().setModel(oModel);

			this.getView().bindElement("/SupplierCollection/0");

			// Set the initial form to be the display one
			this._showFormFragment("Display");
		},

		onExit : function () {
			for(var sPropertyName in this._formFragments) {
				if(!this._formFragments.hasOwnProperty(sPropertyName)) {
					return;
				}

				this._formFragments[sPropertyName].destroy();
				this._formFragments[sPropertyName] = null;
			}
		},

		handleEditPress : function () {

			//Clone the data
			this._oSupplier = jQuery.extend({}, this.getView().getModel().getData().SupplierCollection[0]);
			this._toggleButtonsAndView(true);

		},


		onBackPressed: function(){
			var context  = sap.ui.getCore().byId("mainContext");
			context.back();

		},

		handleCancelPress : function () {

			//Restore the data
			var oModel = this.getView().getModel();
			var oData = oModel.getData();

			oData.SupplierCollection[0] = this._oSupplier;

			oModel.setData(oData);
			this._toggleButtonsAndView(false);

		},

		handleSavePress : function () {

			this._toggleButtonsAndView(false);

		},

		_formFragments: {},

		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "Change" : "Display");
		},

		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "view." + sFragmentName);

			return this._formFragments[sFragmentName] = oFormFragment;
		},

		_showFormFragment : function (sFragmentName) {
			var oPage = this.getView().byId("page2");

			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		}

	});


	return PageController;

});
