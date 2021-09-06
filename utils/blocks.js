const welcomeMessageBlock = [
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
];

const homeBlock = [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Welcome* :tada:"
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "This is the Slack Bot HomePage"
      }
    }
];

const appointmentBlock = [
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
];

const hobbiesBlock = [
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
];

const numbersBlock = [
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
];

const thanksBlock = [
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Thank You"
        }
    }
];

module.exports = { 
    welcomeMessageBlock,
    homeBlock,
    appointmentBlock,
    hobbiesBlock,
    numbersBlock,
    thanksBlock
};