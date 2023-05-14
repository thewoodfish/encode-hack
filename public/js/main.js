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

function removeBinaryData(str) {
    // Remove characters outside the range of printable ASCII characters
    return str.replace(/[^\x20-\x7E]/g, '');
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

                            if (!res.error) {
                                let data = res.data;
                                appear(".bvn-ask-div");
                                appear(".candid8");
                                qs(".candidates-row-1").innerHTML = "";
                                if (data[0].name != '\x00') {
                                    for (var i = 0; i < data.length; i++) {
                                        qs(".candidates-row-1").innerHTML += `
                                        <div class="candid col-4 border p-10 bold small center">
                                            <p>${removeBinaryData(data[i].name)}</p>
                                            <hr>
                                            <p>${data[i].party}</p>
                                            <div class="d-grid gap-2 mt-30 mb-30">
                                                <button class="btn btn-primary vote-btn" data-hash="${data[i].hash}" type="button">Vote me</button>
                                            </div>
                                        </div>`;
                                    }
                                }
                            } else {
                                toast(res.data);
                                hide(".bvn-ask-div");
                            }
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
                                placeholder="Misfit Xtra Party"
                                aria-label="default input example">
                        </div>
                    </form>
                </div>
            `;
        } else if (e.classList.contains("del-form")) {
            e.parentElement.parentElement.removeChild(e.parentElement);
        } else if (e.classList.contains("vote-btn")) {
            let bvn = qs(".bvn");
            let name = qs(".bvn-owner");

            if (bvn.value && name.value) {
                // disable all button
                [].forEach.call(qsa(".vote-btn"), (b) => {
                    b.disabled = true;
                });

                fetch("/vote", {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "bvn": bvn.value,
                        "name": name.value,
                        "elink": qs(".election-link").value.split("-")[3],
                        "hash": e.dataset.hash
                    })
                })
                    .then(async res => {
                        await res.json().then(res => {
                            toast(res.data);
                        });
                    })
            } else {
                toast("Please input your BVN and name");
            }
        } else if (e.classList.contains("load-election-before-1")) {
            let elink = qs(".election-link-1");
            if (elink.value) {
                hide(".load-election-before-1");
                appear(".load-election-after-1");

                // send request to chain
                fetch("/load-result", {
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

                            hide(".load-election-after-1");
                            appear(".load-election-before-1");
                            if (!res.error) {
                                // first get the data
                                let data = res.data;
                                let votes = res.votes;
                                let total_votes = 0;

                                // get sum total of votes and index of biggest vote
                                let biggest = 0;
                                let trace = 0;
                                for (var i = 0; i < votes.length; i++) {
                                    if (votes[i] > trace) {
                                        trace = votes[i];
                                        biggest = i;
                                    }
                                    total_votes += votes[i] - 1;
                                }


                                qs(".votes-slider").innerHTML = "";
                                appear(".elect-res");
                                qs(".ttl-votes").innerText = total_votes;
                                for (var i = 0; i < data.length; i++) {
                                    // calculate the percentage
                                    let percent = (((votes[i] - 1) / total_votes) * 100).toFixed(1);
                                    qs(".votes-slider").innerHTML +=
                                        `<div class="col-3 p-0 bold small cand">
                                            ${removeBinaryData(data[i].name)} (${data[i].party})
                                        </div>
                                        <div class=" col-9 p-0">
                                        <div class="progress" role="progressbar" 
                                            aria-valuenow="${votes[i] - 1}" aria-valuemin="0" aria-valuemax="${total_votes}">
                                            <div class="progress-bar ${biggest == i ? "bg-success" : ""}" style="width: ${percent}%">${percent}% (${votes[i] - 1} votes)</div>
                                            </div>
                                        </div>`;
                                }

                            } else {
                                toast("could not load election result.")
                            }
                        });
                    })
            } else
                toast("Please fill in a link")
        } else if (e.classList.contains("kick-off-before")) {
            // gather all the form data we have
            let hours = qs(".election-epoch");
            let names = qsa(".candidate-name");
            let nval = [];
            let pval = [];
            let parties = qsa(".political-party");
            let empty = false;

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

                setTimeout(() => {
                    if (!empty) {
                        hide(".kick-off-before");
                        appear(".kick-off-after");

                        const formData = new FormData();
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
                                    appear_n_hide(".creation-success", 30000);
                                    qs(".creation-success").scrollIntoView(false);
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