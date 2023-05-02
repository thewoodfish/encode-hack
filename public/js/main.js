/*
 * File: Main controller for Elect '0' Rate
 * Author: @thewoodfish
 * Date-Time: Thu 27 Apr 22:43
 */

function qs(tag) {
    return document.querySelector(tag);
}

function qsa(tag) {
    return document.querySelectorAll(tag);
}

function ce(tag) {
    return document.createElement(tag);
}

function clearField(attr) {
    qs(attr).value = "";
}

function appear(attr) {
    qs(attr).classList.remove("hidden");
}

function hide(attr) {
    if (!qs(attr).classList.contains("hidden"))
        qs(attr).classList.add("hidden");
}

function appear_n_hide(attr, time) {
    appear(attr);
    setTimeout(() => hide(attr), time);
}

function toast(msg) {
    const toastLiveExample = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastLiveExample);
    qs('.toast-body').innerHTML = msg;
    toast.show();
}

function setSessionNonce(value) {
    sessionStorage.setItem("session_nonce", value);
}

function getSessionNonce(value) {
    return sessionStorage.getItem("session_nonce");
}

function click(attr) {
    qs(attr).click();
}

// candidates count;
let candidates_count = 1;

document.body.addEventListener(
    "click",
    (e) => {
        e = e.target;
        // ensure connection is established for both required chains
        if (e.classList.contains("load-election-before")) {
            let elink = qs(".election-link");
            if (elink.value) {
                hide(".load-election-before");
                appear(".load-election-after");

                // send request to chain
                fetch("/load-election", {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "link": elink.value
                    })
                })
                    .then(async res => {
                        await res.json().then(res => {
                            hide(".load-election-after");
                            appear(".load-election-before");

                            console.log(res);
                        });
                    })
            } else
                toast("Please fill in a link")
        } else if (e.classList.contains("add-candidate")) {
            candidates_count++;
            qs(".candidates-coll").innerHTML +=
                `
                <div class="mt-30 border p-10 rad-10">
                    <p class="del-form pointer right">Delete Form</p>
                    <form>
                        <div class="mb-3">
                            <label for="formFileMultiple" class="form-label">Candidates Name</label>
                            <input class="form-control election-link candidate-name"  type="text"
                                placeholder="Woodfish"
                                aria-label="default input example">
                        </div>
                        <div class="mb-3">
                            <label for="formFileMultiple" class="form-label">Candidates Political
                                party</label>
                            <input class="form-control election-link political-party" type="text" data-party="1"
                                placeholder="Rebellion Xtra Party"
                                aria-label="default input example">
                        </div>
                        <div class="mb-3">
                            <label for="formFileMultiple" class="form-label">Image</label>
                            <input class="form-control candidate-image" type="file">
                        </div>
                    </form>
                </div>
            `;
        } else if (e.classList.contains("del-form")) {
            e.parentElement.parentElement.removeChild(e.parentElement);
        } else if (e.classList.contains("kick-off-before")) {
            // gather all the form data we have
            let hours = qs(".election-epoch");
            let names = qsa(".candidate-name");
            let nval = [];
            let pval = [];
            let parties = qsa(".political-party");
            let images = qsa(".candidate-image");
            let empty = false;
            let bin_array = [];

            // first check that the voting hours if filled
            if (hours.value) {
                // make sure they are not empty
                [].forEach.call(names, (n) => {
                    if (!n.value) empty = true;
                    nval.push(n.value);
                });

                [].forEach.call(parties, (p) => {
                    if (!p.value) empty = true;
                    pval.push(p.value);
                });

                [].forEach.call(images, (i) => {
                    if (!i.value) empty = true;
                    let file = i.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            const bin = new Blob([new Uint8Array(e.target.result)], { type: file.type });
                            bin_array.push(bin);
                        };
                        reader.readAsArrayBuffer(file);
                    }
                });

                setTimeout(() => {
                    if (!empty) {
                        hide(".kick-off-before");
                        appear(".kick-off-after");

                        const formData = new FormData();
                        for (var i = 0; i < bin_array.length; i++) {
                            let b = bin_array[i];
                            formData.append(`bin_${i}`, b);
                        }

                        // send the data to the server
                        formData.append(`names`, nval);
                        formData.append(`parties`, pval);
                        formData.append("hours", hours.value);

                        fetch("/create-election", {
                            method: 'post',
                            body: formData
                        })
                            .then(async res => {
                                await res.json().then(res => {
                                    appear(".kick-off-before");
                                    hide(".kick-off-after");

                                    qs(".creation-success").innerHTML = `The Election link is <span class="bold">${res.data}</span>`;
                                    qs(".creation-success").scrollIntoView();
                                    appear_n_hide(".creation-success", 30000);
                                });
                            })
                    } else
                        toast("Please fill in details of all candidates");
                }, 500);
            } else
                toast("Please fill in the election time span in hours");

        }
    },
    false);