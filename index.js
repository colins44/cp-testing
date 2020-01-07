<script runat=server>
   Platform.Load("core", "1");
   /*
   * This script pulls all the offers from the frontpage of the website, gets their schedules and upserts those schedules 
   * to the given data extension
   *
   * How to use
   * set the region to the region that you are interested in saving the schedules for
   * set the DataExtensionKey to the DE that you would like to save schedules for, ensure that this DE has the correct structure
   * in order to accept the incoming data
   */

   // set the following two variables
   var region = "AU";
   var DataExtensionKey = "E8C0D2E0-F86F-4E87-8AC4-DB8E6AF39A5D"

   var url = 'https://api.luxgroup.com/api/public-offers?';
   var results = [];
   var page = 1;
   var moreData = true;

   var upsertRow = function(api, localSchedule) {
     var updateObject = {
         CustomerKey: 'E8C0D2E0-F86F-4E87-8AC4-DB8E6AF39A5D',
         Properties: [
             {
                 Name: 'id',
                 Value: localSchedule.id
             },
             {
                 Name: 'region',
                 Value: localSchedule.region
             },
             {
                 Name: 'modified_date',
                 Value: Platform.Function.Now()
             },
             {
                 Name: 'brand',
                 Value: localSchedule.brand
             },
             {
                 Name: 'start',
                 Value: localSchedule.start
             },
             {
                 Name: 'end',
                 Value: localSchedule.end
             },
             {
                 Name: 'type',
                 Value: localSchedule.type
             },
             {
                 Name: 'offer_id_salesforce_external',
                 Value: localSchedule.offer_id_salesforce_external
             }
         ]
     };
     Write('<br />');
     Write(Stringify(updateObject))
     var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};
     var res = api.updateItem('DataExtensionObject', updateObject, options);
   }

   while (moreData) {
     Write("we are getting more data");
     var pageUrl = url + '&page=' + page;
     Write(pageUrl + '<br />');
     var response = HTTP.Get(pageUrl);
     Write('status ' + response.Status + '<br />');
     var data = Platform.Function.ParseJSON(response.Content);
     if (data.result.length === 0) {
       moreData = false;
     };
     page = ++page;
     results = results.concat(data.result);
   }


   var frontPageDE = DataExtension.Init(DataExtensionKey)
   var schedules = []
   for (var i = 0, len = results.length; i < len; i++) {
     var result = results[i]
     schedules.push(result.list_visibility_schedules)
   }
   Write('<br />');
   var api = new Script.Util.WSProxy();
   for (var i = 0, len = schedules.length; i < len; i++) {
     var schedule = schedules[i]
     var localSchedule = schedule[region]
     Write('<br />');
     upsertRow(api, localSchedule)
   }

</script>

