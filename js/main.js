(() => {
    console.log(3);
    console.log(4);
    const inputForm = document.getElementById("input");
    const outputContainer = document.getElementsByClassName("outputContainer");

    const protocolOutput = document.getElementById("protocol");
    const subdomainOutput = document.getElementById("subdomain");
    const subdomainDot = document.getElementById("subdomain-dot");
    const domainOutput = document.getElementById("domain");
    const extensionOutput = document.getElementById("extension");
    const portColon = document.getElementById("port-colon");
    const portOutput = document.getElementById("port");
    const pathnameOutput = document.getElementById("pathname");
    const parametersOutput = document.getElementById("parameters");

    const messageContainer = document.getElementById("message");
    let https = "https:";
    let http = "http:";
    let url = "";
    let hostArr = [];
    let subdomain = "";
    let isHide = true;
    let hasSubdomain = false;
    let hasPort = false;

    let listener = {
        setInput: () => {
            inputForm.addEventListener("input", parse.check);
        },
        setProtocol: () => {
            protocolOutput.addEventListener("click", output.copy);
        },
        setSubdomain: () => {
            subdomainOutput.addEventListener("click", output.copy);
        },
        setDomain: () => {
            domainOutput.addEventListener("click", output.copy);
        },
        setExtension: () => {
            extensionOutput.addEventListener("click", output.copy);
        },
        setPort: () => {
            portOutput.addEventListener("click", output.copy);
        },
        setPathname: () => {
            pathnameOutput.addEventListener("click", output.copy);
        },
        setParameters: () => {
            parametersOutput.addEventListener("click", output.copy);
        },

        removeInput: () => {
            inputForm.removeEventListener("input", parse.check);
        },
        removeProtocol: () => {
            protocolOutput.removeEventListener("click", output.copy);
        },
        removeSubdomain: () => {
            subdomainOutput.removeEventListener("click", output.copy);
        },
        removeDomain: () => {
            domainOutput.removeEventListener("click", output.copy);
        },
        removeExtension: () => {
            extensionOutput.removeEventListener("click", output.copy);
        },
        removePort: () => {
            portOutput.removeEventListener("click", output.copy);
        },
        removePathname: () => {
            pathnameOutput.removeEventListener("click", output.copy);
        },
        removeParameters: () => {
            parametersOutput.removeEventListener("click", output.copy);
        }
    }
    let message = {
        setMessage: (str) => {
            messageContainer.innerHTML = str;
        },
        output: (str) => {
            message.setMessage(str);
            setTimeout(() => {message.setMessage("")}, 2000);
        }
    }
    let output = {
        toConsole: () => {
            let len = hostArr.length;
            console.log("url: ", url);
            console.log("hostArr: ", hostArr);
            console.log("subdomain: ", subdomain);
            console.log("");
            output.setProtocol(url.protocol);
            if(hasSubdomain) {
                output.setSubdomain(subdomain);
            }
            output.setDomain(hostArr[len-2]);
            output.setExtension(hostArr[len-1]);
            if(hasPort) {
                output.setPort(url.port);
            }
            console.log("url.port: ", url.port);
            output.setPathname(url.pathname);
//            output.setParameters(url.xxx);
            output.hideOutput(false);
        },
        copy: (e) => {
            console.log(e.target.innerHTML);
            message.output("Copied!");
        },
        hideOutput: (bool) => {
            isHide = bool;

            if(isHide===true) {
                listener.removeProtocol();
                listener.removeSubdomain();
                listener.removeDomain();
                listener.removeExtension();
                listener.removePathname();
                listener.removeParameters();
                outputContainer[0].classList.add("hide");
            } else {
                listener.setProtocol();
                listener.setSubdomain();
                listener.setDomain();
                listener.setExtension();
                listener.setPathname();
                listener.setParameters();
                outputContainer[0].classList.remove("hide");
            }
        },
        setProtocol: (e) => {
            protocolOutput.innerHTML = e;
        },
        setSubdomain: (e) => {
            subdomainOutput.innerHTML = e;
        },
        setDomain: (e) => {
            domainOutput.innerHTML = e;
        },
        setExtension: (e) => {
            extensionOutput.innerHTML = e;
        },
        setPort: (e) => {
            portOutput.innerHTML = e;
        },
        setPathname: (e) => {
            pathnameOutput.innerHTML = e;
        },
        setParameters: (e) => {
            parametersOutput.innerHTML = e;
        },
        setAll: (e) => {
            output.setProtocol(e);
            if(hasSubdomain) {
                output.setSubdomain(e);
                parse.hasSubdomain(false);
            }
            output.setDomain(e);
            output.setExtension(e);
            output.setPathname(e);
            output.setParameters(e);
            output.hideOutput(true);
        }
    }
    let parse = {
        init: () => {
            listener.setInput();
        },
        check: () => {
            let input = parse.getInput();

            if(!parse.isBlank(input)) {
                if(parse.isValidURL(input)) {
                    parse.resetAll();
                    console.log("Valid URL");
                    parse.control(input);
                } else {
                    parse.resetAll();
                    console.log("Invalid URL");
                    message.output("Please enter valid URL.");
                }
            } else {
                parse.resetAll();
                console.log("Is blank");
            }
        },
        control: (input) => {
            url = parse.setURL(input);
            hostArr = parse.setHostArr(url.hostname);
            subdomain = parse.setSubdomain(hostArr);
            if(parse.isBlank(subdomain)===true) {
                parse.hasSubdomain(false);
            } else {
                parse.hasSubdomain(true);
            }
            console.log(hasSubdomain);
            output.toConsole();
        },
        getInput: () => inputForm.value,
        isValidURL: (str) => {
            let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

            if(!pattern.test(str)) {
                return false;
            } else {
                return true;
            }
        },
        setURL: (e) => {
            return new URL(e);
        },
        setHostArr: (str) => {
            return str.split(".");
        },
        setSubdomain: (arr) => {
            let len = arr.length;
            let sub = "";

            arr.forEach((item, i) => {
                if(!(i>=len-2)) {
                    let dot = "";
                    if(!(i>=len-3) && item!=="") {
                        dot = ".";
                    }
                    sub += item + dot;
                }
            });
            return sub;
        },
        hasSubdomain: (bool) => {
            hasSubdomain = bool;
            !hasSubdomain ? subdomainDot.setAttribute("style", "display: none") : subdomainDot.removeAttribute("style");
        },
        hasPort: (bool) => {
            hasPort = bool;
            !url.port ? portColon.setAttribute("style", "display: none;") : portColon.removeAttribute("style");
        },
        resetAll: () => {
            url = "";
            hostArr = [];
            subdomain = "";
            output.setAll("");
        },
        isBlank: (e) => {
            return x = e==="" || e===" " || e==="undefined" || e===null ? true : false;
        }
    }


    $(document).ready(() => {
        console.log(1);
        console.log(2);
        parse.init();
    });
})();

/*
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
    tempURI = "";
    tempURL = "";
    tempHost = "";
    tempDomain = "";
    isHTTPS = false;
    url = [];
    //0 = Protocol
    //1 = Subdomain
    //2 = Domain
    //3 = Domain Extension
    //4 = Relative Path
    //5 = Parameters

    let listener = {
        setInput: () => {
            inputForm.addEventListener("input", parse.control);
        },
        setTLD: () => {
            tldContainer.addEventListener("click", parse.copy);
        },
        setRelativePath: () => {
            relativePathContainer.addEventListener("click", parse.copy);
        },
        removeInput: () => {
            inputForm.removeEventListener("input", parse.parse);
        },
        removeTLD: () => {
            tldContainer.removeEventListener("click", parse.copy);
        },
        removeRelativePath: () => {
            relativePathContainer.removeEventListener("click", parse.copy);
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
        substr: (str, val) => {str.substr(0, val).toLowerCase()}
    }
    let parse = {
        main: () => {
            listener.setInput();
        },
        setProtocol: (str) => {
            if(str.substr(8)===https) {
                console.log("has HTTPS");
                isHTTPS = true;
                return https;
            } else if(str.substr(7)===http) {
                console.log("has HTTP");
                isHTTPS = false;
                return http;
            } else {
                console.log("Does not have ANY protocol.");
                //tempURI = https + tempURI;
                isHTTPS = true;
                return https;
            }
        },
        extractProtocol: (str, pro) => {
            return str.split(pro)[1];
        },
        setHost: (str) => {
            return str.split(/(\/)/)[0];
        },
        splitDot: (str, val) => {
            return str.split(/\./)[val];
        },
        setDomain: (str) => {
            return str.split("/")[1];
        },
        setRelativePath: () => {
            return tempURL.match(/\/.*$/i)[0];
        },
        output: () => {
            console.log("url[0] ", url[0]);
            console.log("url[1] ", url[1]);
            console.log("url[2] ", url[2]);
            console.log("url[3] ", url[3]);
            console.log("url[4] ", url[4]);
            console.log("url[5] ", url[5]);
        },
        control: () => {
            tempURI = parse.getInput();

            url[0] = parse.setProtocol(tempURI);
            tempURL = isHTTPS ? parse.extractProtocol(tempURI, https) : parse.extractProtocol(tempURI, http);
            console.log("-------------", tempURI);
            tempHost = parse.setHost(tempURL);

            var tempArr = [];
            for(var i=0; i<str.length;i++) {
                if (str[i] === "s") indices.push(i);
            }

            let dotLen = tempHost.match(/\./g).length;
            if(dotLen === 2) {
                url[1] = parse.splitDot(tempHost, 0);
                url[2] = parse.splitDot(tempHost, 1);
            } else if(dotLen === 1) {
                url[1] = "";
                url[2] = parse.splitDot(tempHost, 0);
            } else {
                url[1] = "www";
            }
            console.log("tempURI: ", tempURI);
            console.log("tempURL: ", tempURL);
            console.log("tempHost: ", tempHost);
            console.log("tempDomain: ", tempDomain);

//            url[3] = parse.setDomainExtension();
//            url[4] = parse.setRelativePath();
//            url[5] = parse.setParameters();

            parse.output();
        },
        checkTLD: () => {

        },
        parse: () => {
            let tempURI = parse.getURL();

            if(parse.isBlank(tempURI)!==true) {
                if(tempURI.includes(".org")) {
                    url = tempURI;
                    tld = parse.getTLD();
                    relativePath = parse.getRelativePath();
                    parse.hideOutput(false);
                    parse.setOutput(tld, relativePath);
                    listener.setTLD();
                    listener.setRelativePath();
                } else {
                    parse.setOutputBlank();
                    listener.removeTLD();
                    listener.removeRelativePath();
                    parse.hideOutput(true);
                }
            } else {
                parse.setOutputBlank();
                listener.removeTLD();
                listener.removeRelativePath();
                parse.hideOutput(true);
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
        getURL: () => tempURI,
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
        parse.main();
    });
})();
*/