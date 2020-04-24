const { App } = require("@slack/bolt");
const store = require("./store");
//const helpers = require('./helpers');
//const responses = require('./responses');
const axios = require("axios");
//const body-parser = require ('body-parser');  // just in case I can't work out how to parse the JSON response

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

//rset up axios config defaults where possible
axios.defaults.baseURL = "https://web.consonance.app/api/v4/products.json"; // test the entire URL with params from Talend
axios.defaults.headers.common["Authorization"] =
  "Token token=19fb1745def5471bac1126a924067254"; // send the authorisation token in the header
axios.defaults.headers.post["Content-Type"] = "application/json"; // is this one needed or even helpful?

app.command("/conso", async ({ command, ack, say }) => {
  //capture the command.text string and split
  const comParams = command.text;
  const paramSplit = comParams.split(", "); // split the string into two values and assign to new var as array properties
  const paramKey = paramSplit.shift().toLowerCase(); // remove the last property from the array and make remaining one lower case
  const paramVal = paramSplit; // assign remaining value string to another var

  // create the URLSearchParams object for axios params:
  const consParams = new URLSearchParams();

  try {
    switch (paramKey) {
      case "id":
        consParams.append("q[id_eq]", paramVal);
        var response = await axios({ method: "get", params: consParams });
        await ack();
        if (response.data.products.length < 1) {
          await say("Your query returned no results - please try again");
        } else {
          var responseString = 1; // this isn't necessary - use the paramVal instead???
        }
        break;

      case "title":
        consParams.append("q[full_title]", paramVal);
        var response = await axios({ method: "get", params: consParams });
        await ack();
        if (response.data.products.length < 1) {
          await say("Your query returned no results - please try again");
        } else if (response.data.products.length == 1) {
          // do stuff 
        }
          
        break;

      default:
        await say(
          "You didn't specify a correct search type (id, title, ISBN or authorname.)"
        );
    }
  } catch (error) {
   console.log(error);
    await say("This app is broken - check the code to see if the search string has become malformed or the API you are querying has changed.");
  }

  
  //const configString = JSON.stringify(configData)
  //const stringResponse = response.data.products[0];

  const stringData = {
    publication_layout: {
    text: "Full layout for single publication instances",
    blocks: [
      {
        type: "divider"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Publication ID:*  ${response.data.products[0].id} \n *Full Title:* ${response.data.products[0].full_title} \n *Author(s):* ${response.data.products[0].authorship} \n *ISBN:* ${response.data.products[0].isbn}`
        },
        accessory: {
          type: "image",
          //"image_url": `${response.data.products[0].supportingresources[0].style_urls[0].url}`,
          image_url:
            "https://cdn.faber.co.uk/media/catalog/product/cache/1/small_image/400x/040ec09b1e35df139433887a97daa66f/2/2/22954.books.origjpg.jpg",
          alt_text: "Plath"
        }
      },

      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Publication Date:* ${response.data.products[0].pub_date}`
            //"emoji": true
          },
          {
            type: "mrkdwn",
            text: `*Pages:* ${response.data.products[0].extents.page_count}`
            //"emoji": true
          },
          {
            type: "mrkdwn",
            text: `*ISBN:* ${response.data.products[0].isbn}`
            //"emoji": true
          },
          {
            type: "mrkdwn",
            text: `*Edition:* ${response.data.products[0].in_house_edition}`
            //"emoji": true
          },
          {
            type: "mrkdwn",
            text: `*Format:* ${response.data.products[0].in_house_format}`
            //"emoji": true
          },
          // {
          // type: "mrkdwn",
          // text: `*Price:* ${response.data.products[0].prices[0].currency_code} ${response.data.products[0].prices[0].price_amount}`
          // "emoji": true
          // }
        ]
      }
    ]
     },
    multiple_returns: {
    text: "Limited data in case there are multiple records returned",
    blocks: [
      {
        type: "divider"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Here are your results. Search on the Publication ID for full results for each publication. \n\n*Publication ID:*  ${response.data.products[0].id}   \n*Full Title:*  ${response.data.products[0].full_title}   \n*Author(s):* ${response.data.products[0].authorship}`
        }
      }
    ]
     }
  };
  
if (paramKey == 'id') {
 await say(stringData.publication_layout);
} else if (paramKey == 'title') {
  await say(stringData.multiple_returns);
} else {
  await say("Bog off")
}
  


 // console.log(paramKey, paramVal);
 // console.log(responseString);
  
});

//USE THIS TO TEST OUTPUT  TO GET NESTED PROPERTIES FROM CONS - IT WORKS!!!
// axios.get()
//   .then((response) => {
//     console.log(response.data.products[0].supportingresources[0].style_urls[0].url);
//    // console.log(response.status);
//    // console.log(response.statusText);
//    // console.log(response.headers);
//    // console.log(response.config);
//    })
//   .catch(function (error) {
//     console.log(error);
//   });

// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();

// may be usable later on
// app.event('app_home_opened', ({ event, say }) => {
//   // Look up the user from DB
//   let user = store.getUser(event.user);

//   if(!user) {
//     user = {
//       user: event.user,
//       channel: event.channel
//     };
//     store.addUser(user);

//     say(`Welcome <@${event.user}>!. How can I help you?`);
//   } else {
//     say('Hi again!');
//   }
// });

