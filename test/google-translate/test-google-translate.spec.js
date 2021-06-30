const axios = require('axios');
const {expect} = require('chai');
const {addRequestRetry, addLogInterceptors} = require('../../lib/axios-helper');
const {createLogger} = require('../../lib/loggerHelper')
const defaultTimeout=5000 //5s

const targetUrl = "https://translate.google.com/"

const logger = createLogger("google-translate");
addLogInterceptors(axios, logger)
addRequestRetry(axios, 3, logger);

describe(`Verify google translate headers`, async () => {
    it(`Valid Headers on: ${targetUrl}`, async () => {
        logger.info(`Requesting to ${targetUrl}`)
        await axios.get(targetUrl)
            .then(response => {
                expect(response.headers["content-type"], "header: content-type").to.equal("text/html; charset=utf-8")
            }).catch((err) => {
                throw new Error(`API call failed with status code: ${err}, after 3 retry attempts`);
            })
    }).timeout(defaultTimeout);
});
