<script runat=server>
    Platform.Load("core", "1");
    var region = "AU"
    var limit = 200
    var resultsCount = 0
    var results = []
    var page = 1
    var url = 'https://api.luxgroup.com/api/public-offers?limit=' + limit 

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

    Write('logging outside the while loop');
    while (resultCount < limit) {
      url = url  + '&page=' + page
      Write('testing within while loop');
      Write('<br />');
      Write(url + '<br />');
      var response = HTTP.Get(url);
      Write(response.Status + '<br />');
      var data = Platform.Function.ParseJSON(response.Content);
      results = results.concat(data.results);
      Write(results + '<br />');
      page = ++page;
      resultCount = resultCount + data.results.length;
      if (data.results.length === 0) {
        break;
      };
    }

    //var frontPageDE = DataExtension.Init("E8C0D2E0-F86F-4E87-8AC4-DB8E6AF39A5D")
    //var schedules = []
    //for (var i = 0, len = results.length; i < len; i++) {
    //  var result = results[i]
    //  schedules.push(result.list_visibility_schedules)
    //}
    //Write('<br />');
    //var api = new Script.Util.WSProxy();
    //for (var i = 0, len = schedules.length; i < len; i++) {
    //  var schedule = schedules[i]
    //  var localSchedule = schedule[region]
    //  Write('<br />');
    //  upsertRow(api, localSchedule)
    //}
</script>

