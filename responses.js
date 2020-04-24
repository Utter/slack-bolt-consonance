module.exports = {
  publication_layout: {
  text: "",
      blocks: [
      {
        type: "divider"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
//          text: `*Publication ID:*  ${response.data.products[0].id} \n *Full Title:* ${response.data.products[0].full_title} \n *Author(s):* ${response.data.products[0].authorship}`
        },
        accessory: {
          type: "image",
          //"image_url": `${response.data.products[0].supportingresources[0].style_urls[0].url}`,
          image_url:
            "https://cdn.faber.co.uk/media/catalog/product/cache/1/small_image/400x/040ec09b1e35df139433887a97daa66f/2/2/22954.books.origjpg.jpg",
          alt_text: "Plath"
        }
      },

//       {
//         type: "section",
//         fields: [
//           {
//             type: "mrkdwn",
//             text: `*Publication Date:* ${response.data.products[0].pub_date}`
//             //"emoji": true
//           },
//           {
//             type: "mrkdwn",
//             text: `*Pages:* ${response.data.products[0].extents.page_count}`
//             //"emoji": true
//           },
//           {
//             type: "mrkdwn",
//             text: `*ISBN:* ${response.data.products[0].isbn}`
//             //"emoji": true
//           },
//           {
//             type: "mrkdwn",
//             text: `*Edition:* ${response.data.products[0].in_house_edition}`
//             //"emoji": true
//           },
//           {
//             type: "mrkdwn",
//             text: `*Format:* ${response.data.products[0].in_house_format}`
//             //"emoji": true
//           },
//           {
//             type: "mrkdwn",
//             text: `*Price:* ${response.data.products[0].prices[0].currency_code} ${response.data.products[0].prices[0].price_amount}`
//             //"emoji": true
//           }
//         ]
//       }
    ]
  }
  };