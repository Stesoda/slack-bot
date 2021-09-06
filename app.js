const { App, ExpressReceiver } = require('@slack/bolt');
require('dotenv').config()
// Database Connection
require('./db');

const PORT = process.env.PORT || 3000;

// Slack Block Kit Templates
const { 
    WelcomeMessageBlock, 
    HomeBlock,
    AppointmentBlock,
    HobbiesBlock,
    QuestionBlock,
    ThanksBlock
} = require('./utils/Blocks');

// Create a Bolt Receiver
const receiver = new ExpressReceiver({ signingSecret: process.env.SLACK_SIGNING_SECRET });

// Create the Bolt App, using the receiver
const bot = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver
});

const Response = require('./models/ResponseModel');
const ResponseController = require('./controllers');

// USER response API
receiver.router.get('/api/response', ResponseController);

// Bot Event Listeners
bot.message("Hello", async ({ context, event, client }) => {
    try {
        await client.chat.postMessage({
         token: context.botToken,
         // Channel to send message to
         channel: event.channel,
         blocks: WelcomeMessageBlock,
         text: "Slack Bot"
       });
     }
     catch (error) {
       console.error(error);
     }
});

bot.event('app_mention', async ({ context, event, client }) => {
    try {
        await client.chat.postMessage({
         token: context.botToken,
         // Channel to send message to
         channel: event.channel,
         blocks: WelcomeMessageBlock,
         text: "Slack Bot"
       });
     }
     catch (error) {
       console.error(error);
     }
});

  
bot.event('app_home_opened', async ({ event, client }) => {
    try {
      /* view.publish is the method that your bot uses to push a view to the Home tab */
      await client.views.publish({
  
        /* the user that opened the bot home */
        user_id: event.user,
  
        /* the view object that appears in the bot home*/
        view: {
          type: 'home',
          callback_id: 'home_view',
  
          /* body of the view */
          blocks: HomeBlock
        }
      });
    }
    catch (error) {
      console.error(error);
    }
});

// Bot Slash Command Event Listener
bot.command('/bot', async ({ ack, payload, context }) => {
    // Acknowledge the command request
    await ack();
  
    try {
       await bot.client.chat.postMessage({
        token: context.botToken,
        // Channel to send message to
        channel: payload.channel_id,
        // Include a button in the message (or whatever blocks you want!)
        blocks: WelcomeMessageBlock,
        text: "Slack Bot"
      });
    }
    catch (error) {
      console.error(error);
    }
});
  
bot.action('response1', async ({ ack, body, context }) => {
    // Acknowledge the button request
    ack();
  
    try {
        // Store to Database
        const reply = await Response.create({ 
            username: body.user.username,
            response: {
                question: body.message.blocks[0].text.text,
                answer: body.actions[0].selected_option.value
            }
         });
      // Update the message
      await bot.client.chat.update({
        token: context.botToken,
        // ts of message to update
        ts: body.message.ts,
        // Channel of message
        channel: body.channel.id,
        blocks: AppointmentBlock,
        text: reply.id
      });
    }
    catch (error) {
      console.error(error);
    }
});

bot.action('time-day', async ({ ack, body, context }) => {
    // Acknowledge the button request
    ack();
  
    try {
        let results = body.actions[0].selected_options;
        let final = results.map(function(result){
            return result.value;
        });

        await Response.updateOne(
            { _id: body.message.text },
            { $push: { 
                response: {
                    question: body.message.blocks[0].text.text,
                    answer: final
                }
            } }
         );
         
      // Update the message
      await bot.client.chat.update({
            token: context.botToken,
            // ts of message to update
            ts: body.message.ts,
            // Channel of message
            channel: body.channel.id,
            "blocks": HobbiesBlock,
            text: body.message.text
        })
    }
    catch (error) {
        console.error(error);
    }
});

bot.action('hobbies', async ({ ack, body, context }) => {
    // Acknowledge the button request
    ack();
  
    try {
      // Update the message
        let results = body.actions[0].selected_options;
        let final = results.map(function(result){
            return result.value;
        });

        await Response.updateOne(
            { _id: body.message.text },
            { $push: { 
                response: {
                    question: body.message.blocks[0].text.text,
                    answer: final
                }
            } }
         );

      await bot.client.chat.update({
            token: context.botToken,
            // ts of message to update
            ts: body.message.ts,
            // Channel of message
            channel: body.channel.id,
            "blocks": QuestionBlock,
            text: body.message.text
      })
    }
    catch(error) {

    }
});

bot.action('plain_text_input-action', async ({ ack, body, context }) => {
    // Acknowledge the button request
    ack();
  
    try {
        await Response.updateOne(
            { _id: body.message.text },
            { $push: { 
                response: {
                    question: body.message.blocks[0].label.text,
                    answer: body.actions[0].value
                }
            } }
         );
      // Update the message
      await bot.client.chat.update({
            token: context.botToken,
            // ts of message to update
            ts: body.message.ts,
            // Channel of message
            channel: body.channel.id,
            blocks: ThanksBlock,
            text: "Slack Bot"
      })
    }
    catch(error) {
        console.log(error)
    }
});

(async () => {
  // Start your bot
  await bot.start(PORT);

  console.log(`App and Slack Bot are running on ${PORT}!`);
})();

