// -------------------------------------------------------------------------------
// retrieve domains to be used per territory
// -------------------------------------------------------------------------------
var domains = "";
document.addEventListener("DOMContentLoaded", function() {
    fetch('https://www.dafaonline.com/domain-bannerflow.json')
    .then(response => response.json())
    .then(domains => {
        const urlParams = new URLSearchParams(window.location.search);
        const queryString = urlParams.toString(); // e.g. "btag=xxxxx"
        // Step 1: Define your region objects
        const regions = {
            id: {
                'tpl-logo'  : "https://rellsagesamerence.com/click",
                'tpl-logo-mobi' : "https://rellsagesamerence.com/click",

                'claim-now' : "https://rellsagesamerence.com/click",
                'claim-now-mobi' : "https://rellsagesamerence.com/click",
            }
        };
        // Determine region from URL
        function getRegionFromPath() {
            const pathParts = window.location.pathname.split('/').filter(Boolean); // remove empty entries
            if (pathParts.length === 0) return 'en'; // default root path => 'en'
            return pathParts[2].toLowerCase(); // gets 'eu' from '/eu/', etc.
        }
        // Get active region config
        const regionKey = getRegionFromPath();
        const regionConfig = regions[regionKey] || regions['en']; // fallback to 'en'
        // Update anchor hrefs
        for (let key in regionConfig) {
            const el = document.getElementById(key);
            if (el && el.tagName.toLowerCase() === 'a') {
            	let originalUrl = regionConfig[key];
                // Append query string only if the URL is not a "mailto:"
                if (queryString && !originalUrl.startsWith('mailto:')) {
                    const separator = originalUrl.includes('?') ? '&' : '?';
                    originalUrl += separator + queryString;
                }
                el.href = originalUrl;
            }
        }
    })
    .catch(error => {
        console.error('Error loading domain.json:', error);
    });
});