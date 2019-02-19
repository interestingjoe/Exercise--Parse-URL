(() => {
    console.log(3);
    console.log(4);
    inputForm = document.getElementById("input");
    outputContainer = document.getElementsByClassName("outputContainer");
    tldContainer = document.getElementById("tld");
    relativePathContainer = document.getElementById("relativePath");
    messageContainer = document.getElementById("message");
    url = "";
    tld = "";
    relativePath = "";
    isHide = true;

    https = "https://";
    http = "http://";
    tempURL = "";
    tempDomain = "";
    isHTTPS = false;
    url = [];
    //0 = Protocol
    //1 = Subdomain
    //2 = Domain
    //3 = Domain Extension
    //4 = Parameters

    let listener = {
        setInput: () => {
            inputForm.addEventListener("input", parseURL.control);
        },
        setTLD: () => {
            tldContainer.addEventListener("click", parseURL.copy);
        },
        setRelativePath: () => {
            relativePathContainer.addEventListener("click", parseURL.copy);
        },
        removeInput: () => {
            inputForm.removeEventListener("input", parseURL.parse);
        },
        removeTLD: () => {
            tldContainer.removeEventListener("click", parseURL.copy);
        },
        removeRelativePath: () => {
            relativePathContainer.removeEventListener("click", parseURL.copy);
        }
    }

    let message = {
        setCopied: () => {
            messageContainer.innerHTML = "Copied!";
            setTimeout(message.blank(), 2000);
        },
        blank: () => {
            messageContainer.innerHTML = "";
        }
    }
    let string = {
        substr: val => parseURL.getURL().substr(0, val).toLowerCase()
    }
    let parseURL = {
        main: () => {
            listener.setInput();
        },
        setProtocol: () => {
            if(string.substr(8)===https) {
                console.log("has HTTPS");
                isHTTPS = true;
                return https;
            } else if(string.substr(7)==="http://") {
                console.log("has HTTP");
                isHTTPS = false;
                return http;
            } else {
                console.log("Does not have ANY protocol.");
                isHTTPS = true;
                return https;
            }
        },
        setDomain: () => {
            return tempDomain.split("/")[0];
        },
        setRelativePath: () => {
            return tempDomain.match(/\/.*$/i)[0];
        },
        output: () => {
            console.log(url[0]);
            console.log(url[1]);
            console.log(url[2]);
        },
        getProtocol: () => {
            return parseURL.setProtocol();
        },
        getSubdomain: () => {
            return parseURL.setProtocol();
        },
        control: () => {
            tempURL = parseURL.getInput();

            url[0] = parseURL.getProtocol();
            url[1] = parseURL.getSubdomain();
            url[2] = parseURL.getDomain();
            url[3] = parseURL.getDomainExtension();
            url[4] = parseURL.getParameters();

            if(isHTTPS) {
                tempDomain = tempURL.split(https)[1];
            } else {
                tempDomain = tempURL.split(http)[1];
            }

            url[1] = parseURL.setDomain();
            url[2] = parseURL.setRelativePath();
            parseURL.output();
        },
        checkTLD: () => {

        },
        parse: () => {
            let tempURL = parseURL.getURL();

            if(parseURL.isBlank(tempURL)!==true) {
                if(tempURL.includes(".org")) {
                    url = tempURL;
                    tld = parseURL.getTLD();
                    relativePath = parseURL.getRelativePath();
                    parseURL.hideOutput(false);
                    parseURL.setOutput(tld, relativePath);
                    listener.setTLD();
                    listener.setRelativePath();
                } else {
                    parseURL.setOutputBlank();
                    listener.removeTLD();
                    listener.removeRelativePath();
                    parseURL.hideOutput(true);
                }
            } else {
                parseURL.setOutputBlank();
                listener.removeTLD();
                listener.removeRelativePath();
                parseURL.hideOutput(true);
            }
        },
        isBlank: (e) => {
            return x = e==="" || e===" " || e==="undefined" ? true : false;
        },
        hideOutput: (bool) => {
            isHide = bool;

            if(isHide===true) {
                outputContainer[0].classList.add("hide");
            } else {
                outputContainer[0].classList.remove("hide");
            }
        },
        getInput: () => inputForm.value,
        getURL: () => tempURL,
        getTLD: () => {
            let beforeORG = url.split(".org")[0];
            return x = beforeORG + ".org";
        },
        getRelativePath1: () => {
            let afterORG = url.split(".org")[1];
            return x = afterORG!=="" || afterORG!== "/ " ? afterORG : "";
        },
        copy: (e) => {
            console.log(e.target.innerHTML);
            message.setCopied();
        },
        setOutputBlank: () => {
            tldContainer.innerHTML = "";
            relativePathContainer.innerHTML = "";
        },
        setOutput: (tld, relativePath) => {
            tldContainer.innerHTML = tld;
            relativePathContainer.innerHTML = relativePath;
        }
    };
    $(document).ready(() => {
        console.log(1);
        console.log(2);
        parseURL.main();
    });
})();