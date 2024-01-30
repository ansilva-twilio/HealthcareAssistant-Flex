const { prepareFlexFunction, extractStandardResponse } = require(Runtime.getFunctions()[
    'common/helpers/function-helper'
  ].path);
 
  const requiredParameters = [
    { key: 'documentSid', purpose: 'unique ID of the document' },
  ];
  
  exports.handler = prepareFlexFunction(requiredParameters, async (context, event, callback, response, handleError) => {
    try {
      const { documentSid } = event;
  
      const client = context.getTwilioClient();
        const document = await client.sync.v1.services('IS788f01a3e4f8590562ed0a807f1f6abc')
        .documents(documentSid)
        .fetch();

      response.setStatusCode(200);
      response.setBody(document.data);
      return callback(null, response);
    } catch (error) {
      return handleError(error);
    }
  });
  