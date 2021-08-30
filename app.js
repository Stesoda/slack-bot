// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
require('dotenv').config()
require('./db');
const express = require('express');
const app = express();
const http = require('http');
const Response = require('./models/ResponseModel');


// Api Routes
const apiRoutes = require('./routes');

app.use(express.json());

app.use('/api', apiRoutes);


const server = http.createServer(app);

// Slack Bot Initialization
const bot = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});


// Bot Event Listeners
bot.message("Hello", async ({ context, event, client }) => {
    try {
        await client.chat.postMessage({
         token: context.botToken,
         // Channel to send message to
         channel: event.channel,
         // Include a button in the message (or whatever blocks you want!)
         "blocks": [
             {
                 "type": "section",
                 "text": {
                     "type": "mrkdwn",
                     "text": "Welcome. How are you doing?"
                 },
                 "accessory": {
                     "type": "static_select",
                     "action_id": "response1",
                     "placeholder": {
                         "type": "plain_text",
                         "text": "Select a response",
                         "emoji": true
                     },
                     "options": [
                         {
                             "text": {
                                 "type": "plain_text",
                                 "text": "Doing Well",
                                 "emoji": true
                             },
                             "value": "Doing well"
                         },
                         {
                             "text": {
                                 "type": "plain_text",
                                 "text": "Neutral",
                                 "emoji": true
                             },
                             "value": "Neutral"
                         },
                         {
                             "text": {
                                 "type": "plain_text",
                                 "text": "Feeling Lucky",
                                 "emoji": true
                             },
                             "value": "Feeling Lucky"
                         }
                     ]
                 }
             }
         ]
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
         // Include a button in the message (or whatever blocks you want!)
         "blocks": [
             {
                 "type": "section",
                 "text": {
                     "type": "mrkdwn",
                     "text": "Welcome. How are you doing?"
                 },
                 "accessory": {
                     "type": "static_select",
                     "action_id": "response1",
                     "placeholder": {
                         "type": "plain_text",
                         "text": "Select a response",
                         "emoji": true
                     },
                     "options": [
                         {
                             "text": {
                                 "type": "plain_text",
                                 "text": "Doing Well",
                                 "emoji": true
                             },
                             "value": "Doing well"
                         },
                         {
                             "text": {
                                 "type": "plain_text",
                                 "text": "Neutral",
                                 "emoji": true
                             },
                             "value": "Neutral"
                         },
                         {
                             "text": {
                                 "type": "plain_text",
                                 "text": "Feeling Lucky",
                                 "emoji": true
                             },
                             "value": "Feeling Lucky"
                         }
                     ]
                 }
             }
         ]
       });
     }
     catch (error) {
       console.error(error);
     }
});

  
bot.event('app_home_opened', async ({ event, client, context }) => {
    try {
      /* view.publish is the method that your bot uses to push a view to the Home tab */
      await client.views.publish({
  
        /* the user that opened your bot's bot home */
        user_id: event.user,
  
        /* the view object that appears in the bot home*/
        view: {
          type: 'home',
          callback_id: 'home_view',
  
          /* body of the view */
          blocks: [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "*Welcome to your _App's Home_* :tada:"
              }
            },
            {
              "type": "divider"
            },
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt bot."
              }
            },
            {
              "type": "actions",
              "elements": [
                {
                  "type": "button",
                  "text": {
                    "type": "plain_text",
                    "text": "Click me!"
                  }
                }
              ]
            }
          ]
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
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Welcome. How are you doing?"
                },
                "accessory": {
                    "type": "static_select",
                    "action_id": "response1",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select a response",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Doing Well",
                                "emoji": true
                            },
                            "value": "Doing well"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Neutral",
                                "emoji": true
                            },
                            "value": "Neutral"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Feeling Lucky",
                                "emoji": true
                            },
                            "value": "Feeling Lucky"
                        }
                    ]
                }
            }
        ]
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
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "When are you free this week for a walk?"
                },
                "accessory": {
                    "action_id": "time-day",
                    "type": "multi_static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "emoji": true,
                        "text": "Select Two Time Slots"
                    },
                    max_selected_items: 4,
                    "option_groups": [
                        {
                            "label": {
                                "type": "plain_text",
                                "text": "Select Two days"
                            },
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Sunday",
                                        "emoji": true
                                    },
                                    "value": "Sunday"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Monday",
                                        "emoji": true
                                    },
                                    "value": "Monday"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Tuesday",
                                        "emoji": true
                                    },
                                    "value": "Tuesday"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Wednesday",
                                        "emoji": true
                                    },
                                    "value": "Wednesday"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Thursday",
                                        "emoji": true
                                    },
                                    "value": "Thursday"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Friday",
                                        "emoji": true
                                    },
                                    "value": "Friday"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Saturday",
                                        "emoji": true
                                    },
                                    "value": "Saturday"
                                },
                            ]
                        },
                        {
                            "label": {
                                "type": "plain_text",
                                "text": "Select Two Time Slots"
                            },
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "12:00",
                                        "emoji": true
                                    },
                                    "value": "12:00"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "12:30",
                                        "emoji": true
                                    },
                                    "value": "12:30"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "13:00",
                                        "emoji": true
                                    },
                                    "value": "13:00"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "13:30",
                                        "emoji": true
                                    },
                                    "value": "13:30"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "14:00",
                                        "emoji": true
                                    },
                                    "value": "14:00"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "14:30",
                                        "emoji": true
                                    },
                                    "value": "14:30"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "15:00",
                                        "emoji": true
                                    },
                                    "value": "15:00"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "15:30",
                                        "emoji": true
                                    },
                                    "value": "15:30"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "16:00",
                                        "emoji": true
                                    },
                                    "value": "16:00"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "16:30",
                                        "emoji": true
                                    },
                                    "value": "16:30"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "17:00",
                                        "emoji": true
                                    },
                                    "value": "17:00"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "17:30",
                                        "emoji": true
                                    },
                                    "value": "17:30"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "18:00",
                                        "emoji": true
                                    },
                                    "value": "18:00"
                                }
                            ]
                        }
                    ]
                }
            }
        ],
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
            "blocks": [
                {
                    "type": "section",
                    "block_id": "section678",
                    "text": {
                        "type": "mrkdwn",
                        "text": "What are your favourite Hobbies?"
                    },
                    "accessory": {
                        "action_id": "hobbies",
                        "type": "multi_static_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select hobbies"
                        },
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Football"
                                },
                                "value": "Football"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Basketball"
                                },
                                "value": "Basketball"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Music"
                                },
                                "value": "Music"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Movies"
                                },
                                "value": "Movies"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Sleep"
                                },
                                "value": "Sleep"
                            }
                        ]
                    }
                }
            ],
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
    //   console.log(body.actions[0].selected_options);

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
            "blocks": [
                {
                    "dispatch_action": true,
                    "type": "input",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "plain_text_input-action"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "What are the first 3 digits on the Number Scale",
                        "emoji": true
                    }
                }
            ],
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
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Thank You"
                    }
                }
            ],
            "text": "Question"
      })
    }
    catch(error) {

    }
});


(async () => {
  // Start your bot
  await bot.start(process.env.BOT_PORT || 3000);

  console.log('Slack Bot is running!');
})();


server.listen(process.env.PORT || 9000, () => {
    console.log(`Server running at Port 9000`);
});