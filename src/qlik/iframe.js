/**
 * Script to manage both the iframe.html page and the self-service.html. It loads the correct iframe in the page.
 */

(async () => {

        // Get the configuration information from the config.js file
        const config =  await fetch("config").then((response) =>
            response.json()
        );
  
        var path = window.location.pathname;
        var page = path.split("/").pop();
        
        //2.1 single integration apis
        if(page=='iframe.html'){
            var iframe_url = `https://${config.tenantHostname}/single/?appid=${config.appId}&sheet=${config.sheetId}&theme=${config.theme}`;
        }

        //2.2 app integration apis (for Self-Service)
        if(page=='self-service.html'){
            var iframe_url = `https://${config.tenantHostname}/sense/app/${config.appId}/overview`;
        }

        
        document.getElementById("iframe").src= iframe_url;  
})();






