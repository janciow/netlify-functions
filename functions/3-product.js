require("dotenv").config();
const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base("app2OSvK8grNpPWaW")
  .table("products");

//domain/.netlify/functions/3-product
exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters;

  if (id) {
    try {
      const product = await airtable.retrieve(id);
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id  ${id}`,
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `server error`,
      };
    }
  } else {
    return {
      statusCode: 404,
      body: "please provide id",
    };
  }
};
