let variable = {
    inputForm: document.getElementById("input"),
    outputContainer: document.getElementsByClassName("outputContainer"),
    tldContainer: document.getElementById("tld"),
    relativePathContainer: document.getElementById("relativePath"),
    messageContainer: document.getElementById("message"),
    url: "",
    tld: "",
    relativePath: "",
    isHide: true
}

let listener = {
    setInput: () => {
        variable.inputForm.addEventListener("input", parseURL.parse);
    },
    setInput: () => {
        variable.inputForm.addEventListener("input", parseURL.parse);
    },
    setTLD: () => {
        variable.tldContainer.addEventListener("click", parseURL.copy);
    },
    setRelativePath: () => {
        variable.relativePathContainer.addEventListener("click", parseURL.copy);
    },
    removeTLD: () => {
        variable.tldContainer.removeEventListener("click", parseURL.copy);
    },
    removeRelativePath: () => {
        variable.relativePathContainer.removeEventListener("click", parseURL.copy);
    }
}

let string = {
    toLower: (str) => {
        return str.toLower();
    },
    hasHTTP: (str) => {
        let x = str.substr(0, 5);
        return x = x==="http" ? true : false;
    },
    hasHTTPS: (str) => {
        let x = str.substr(0, 5);
        return x = x==="https" ? true : false;
    },
    search: (str) => {
        return str.search();
    },
    isSecureServer: (str) => {
        return str.includes();
    }
}
let message = {
    setCopied: () => {
        variable.messageContainer.innerHTML = "Copied!";
        setTimeout(message.blank(), 2000);
    },
    blank: () => {
        variable.messageContainer.innerHTML = "";
    }
}
let parseURL = {
    main: () => {
        listener.setInput();
    },
    parse: () => {
        let tempURL = parseURL.getURL();

        if(parseURL.isBlank(tempURL)!==true) {
            if(tempURL.includes(".org")) {
                variable.url = tempURL;
                variable.tld = parseURL.getTLD();
                variable.relativePath = parseURL.getRelativePath();
                parseURL.hideOutput(false);
                parseURL.setOutput(variable.tld, variable.relativePath);
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
        variable.isHide = bool;

        if(variable.isHide===true) {
            variable.outputContainer[0].classList.add("hide");
        } else {
            variable.outputContainer[0].classList.remove("hide");
        }
    },
    getURL: () => variable.inputForm.value,
    getTLD: () => {
        let beforeORG = variable.url.split(".org")[0];
        return x = beforeORG + ".org";
    },
    getRelativePath: () => {
        let afterORG = variable.url.split(".org")[1];
        return x = afterORG!=="" || afterORG!== "/ " ? afterORG : "";
    },
    copy: (e) => {
        console.log(e.target.innerHTML);
        message.setCopied();
    },
    setOutputBlank: () => {
        variable.tldContainer.innerHTML = "";
        variable.relativePathContainer.innerHTML = "";
    },
    setOutput: (tld, relativePath) => {
        variable.tldContainer.innerHTML = tld;
        variable.relativePathContainer.innerHTML = relativePath;
    }
}

parseURL.main();
