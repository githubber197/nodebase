export const generateGoogleFormScript = (
  webhookUrl: string,
) => `function onFormSubmit(e) {
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();

  var responses = {};
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    responses[itemResponse.getItem().getTitle()] = itemResponse.getResponse();
  }

  var payload = {
    formId: e.source.getId(),
    formTitle: e.source.getTitle(),
    responseId: formResponse.getId(),
    timestamp: formResponse.getTimestamp(),
    respondentEmail: formResponse.getRespondentEmail(),
    responses: responses
  };

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload),
    'headers': {
      'ngrok-skip-browser-warning': 'true'
    },
    'muteHttpExceptions': true
  };

  var WEBHOOK_URL = '${webhookUrl}';

  try {
    var response = UrlFetchApp.fetch(WEBHOOK_URL, options);
    console.log('Webhook response code:', response.getResponseCode());
    console.log('Webhook response body:', response.getContentText());
  } catch(error) {
    console.error('Webhook failed:', error);
  }
}`;