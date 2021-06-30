const axiosRetry = require('axios-retry');

function addRequestRetry(axios, numberOfRetry, logger) {
    axiosRetry(axios, {
        retries: numberOfRetry,
        retryDelay: (retryCount) => {
            logger.info(`retry attempt: ${retryCount}`);
            return retryCount * 2000;
        },
    });
}

function addLogInterceptors(axios, logger) {
    axios.interceptors.request.use(request => {
        let log = []
        log.push("###########################################################")
        log.push(`\n>>>>> Request: \n ${JSON.stringify(request, null, 2)}\n`)
        logger.info(log.join(""))
        return request
    })
    axios.interceptors.response.use(response => {
        let log = []
        log.push("\n###########################################################")
        log.push('\n>>>>> Response headers\n'+ JSON.stringify(response.headers, null, 2)+"\n")
        logger.info(log.join(""))
        return response
    })
}

function addLogInterceptors2(axios, logger) {
    axios.interceptors.request.use(request => {
        console.log("\n###########################################################")
        console.log(`Target URL:${request.url}`)
        console.log('>>>>> Starting Request', JSON.stringify(request, null, 2))
        return request
    })
    axios.interceptors.response.use(response => {
        console.log("\n###########################################################")
        console.log('>>>>> Response headers'+ JSON.stringify(response.headers, null, 2))
        return response
    })
}

module.exports = {addRequestRetry, addLogInterceptors}