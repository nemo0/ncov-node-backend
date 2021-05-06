const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: 'jbbh11um',
  dataset: 'production',
  apiVersion: '2021-05-02', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_AUTH_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});

router.get('/:area', async (req, res) => {
  try {
    const { area } = req.params;
    const query = `*[_type == 'doctor' && district == "${area}"]`;
    const response = await client.fetch(query);

    // If No Data
    if (response.length == 0) {
      return res.status(404).json({
        message: 'Sorry. Not Found!',
      });
    }
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

module.exports = router;
