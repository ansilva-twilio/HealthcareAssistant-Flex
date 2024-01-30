  exports.handler = async (context, event, callback) => {
    try {
      const { documentSid } = event;
      const response = new Twilio.Response();
    
      response.appendHeader('Access-Control-Allow-Origin', '*');
      response.appendHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      response.appendHeader('Content-Type', 'application/json');
      response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

      const client = context.getTwilioClient();
      const document = await client.sync.v1.services('IS788f01a3e4f8590562ed0a807f1f6abc')
        .documents(documentSid)
        .fetch();

      response.setStatusCode(200);
      response.setBody(document.data);
      return callback(null, response);
    } catch (error) {
      console.error(error);
      return callback(error);
    }
  };
  