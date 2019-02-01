let inputForm = document.getElementById("input");
let outputContainer = document.getElementsByClassName("outputContainer");
let tldContainer = document.getElementById("tld");
let relativePathContainer = document.getElementById("relativePath");
let messageContainer = document.getElementById("message");
let url = "";
let tld = "";
let relativePath = "";
let isHide = true;

let listener = {
    setInput: () => {
        inputForm.addEventListener("input", parseURL.parse);
    },
    setInput: () => {
        inputForm.addEventListener("input", parseURL.parse);
    },
    setTLD: () => {
        tldContainer.addEventListener("click", parseURL.copy);
    },
    setRelativePath: () => {
        relativePathContainer.addEventListener("click", parseURL.copy);
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
let parseURL = {
    main: () => {
        listener.setInput();
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
    getURL: () => inputForm.value,
    getTLD: () => {
        let beforeORG = url.split(".org")[0];
        return x = beforeORG + ".org";
    },
    getRelativePath: () => {
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
}

parseURL.main();
