import fetch from "node-fetch"
import {launchChrome} from "./launch-chrome.js";
import * as mockttp from "mockttp"
// https://httptoolkit.github.io/mockttp/interfaces/Mockttp.html#forGet
// https://github.com/httptoolkit/mockttp/tree/main

(async () => {
    if (process.argv.length < 4) {
        console.error("You need to provide the name of the instance as the second parameter");
        process.exit(-1);
    }
    const instance = process.argv[2]
    const scriptFile = process.argv[3]
    
    const scriptname = "mypluginscript.js"
    
    // Create a proxy server with a self-signed HTTPS CA certificate:
    const https = await mockttp.generateCACertificate();
    const server = mockttp.getLocal({ https, debug: false });

    const target = `${instance}.matrixreq.com`
    const url = `https://${target}`

    const addedUrl = `<script src="/${scriptname}"></script>`
    const replaced = `${addedUrl}\n</body>\n</html>`
    const page = await fetch(url).then(data => data.text())
    const patchedPage = page.replace(/<\/body>\s*<\/html>/, replaced)

    await server.forAnyWebSocket().always()
        .thenPassThrough();
    await server.forGet(url).always()
        .thenReply(200, patchedPage)
    await server.forGet(`${url}/${scriptname}`).always()
        .thenFromFile(200, `../${scriptFile}`)
    await server.forAnyRequest().forHostname(target).always()
        .thenPassThrough()
    await server.start();

    const caFingerprint = mockttp.generateSPKIFingerprint(https.cert);

    if (process.argv[4] === 'chrome') {
        // Launch an intercepted Chrome using this proxy:
        await launchChrome(url, server, caFingerprint);
        process.on('SIGINT', function() {
            console.log("Caught interrupt signal");
            // Find a way to kill the Chrome process
            process.exit();
        });
    } else {
        // Print out the server details for manual configuration:
        console.log(`Server running on port ${server.port}`);
        console.log(`CA cert fingerprint ${caFingerprint}`);
    }
})();