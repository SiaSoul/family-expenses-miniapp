function sendMiniAppDiagnostics() {

  const props =
    PropertiesService
      .getScriptProperties();

  const botToken =
    props.getProperty(
      'BOT_TOKEN'
    );

  const chatId =
    props.getProperty(
      'ALLOWED_CHAT_ID'
    );

  const plainUrl =
    props.getProperty(
      'GITHUB_PLAIN_URL'
    );

  if (!botToken) {
    throw new Error(
      'Не заполнено Script Property: BOT_TOKEN'
    );
  }

  if (!chatId) {
    throw new Error(
      'Не заполнено Script Property: ALLOWED_CHAT_ID'
    );
  }

  if (!plainUrl) {
    throw new Error(
      'Не заполнено Script Property: GITHUB_PLAIN_URL'
    );
  }

  const endpoint =
    'https://api.telegram.org/bot' +
    botToken +
    '/sendMessage';

  const payload = {

    chat_id:
      chatId,

    text:
      'Диагностика Mini App на Android.\n\n' +
      'Нажми обе кнопки по очереди и запомни результат каждой.',

    reply_markup: {

      inline_keyboard: [

        [
          {
            text:
              '1️⃣ Telegram.org',

            web_app: {
              url:
                'https://telegram.org'
            }
          }
        ],

        [
          {
            text:
              '2️⃣ Чистая GitHub-страница',

            web_app: {
              url:
                plainUrl
            }
          }
        ]

      ]
    }
  };

  const response =
    UrlFetchApp.fetch(
      endpoint,
      {
        method:
          'post',

        contentType:
          'application/json',

        payload:
          JSON.stringify(
            payload
          ),

        muteHttpExceptions:
          true
      }
    );

  const body =
    response.getContentText();

  console.log(body);

  if (
    response.getResponseCode() < 200 ||
    response.getResponseCode() >= 300
  ) {
    throw new Error(
      'Telegram API error: ' +
      body
    );
  }
}
