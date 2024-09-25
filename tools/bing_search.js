const fetch = require('node-fetch')
const apiKey = process.env.BING_API_KEY
const query = $optimized_query //'Azure DevOps vs GitHub Enterprise comparison for migration benefits' // replace with your actual query
const encodedQuery = encodeURIComponent(query)
const url = `https://api.bing.microsoft.com/v7.0/search?q=${encodedQuery}`
const options = {
    method: 'GET',
    headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Type': 'application/json'
    }
}

async function fetchSearchResults() {
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        let urls = []

        if (data.webPages && data.webPages.value) {
            data.webPages.value.slice(0, 3).forEach((page) => {
                urls.push(page.url) // Add main page URL

                if (page.deepLinks && page.deepLinks.length > 0) {
                    page.deepLinks.forEach((link) => {
                        urls.push(link.url) // Add deep link URLs
                    })
                }
            })
        }

        console.log(JSON.stringify(urls)) // Output all URLs as JSON
    } catch (error) {
        console.error('Error:', error)
        return ''
    }
}

fetchSearchResults()
