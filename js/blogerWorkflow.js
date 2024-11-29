const mainFormdata = new FormData();

document.addEventListener('DOMContentLoaded', async (event) => {
    // // get or update currencies rates api-based (initiation rates converter):
    // const setcurrenciesUrls = await currencyURIConstructor();
    // const curExists = mainFormdata.get("USD");
    // if (!curExists) {
    //     await fetchCurrenciesRatesWithDelay(setcurrenciesUrls, mainFormdata, 1000);
    // }
    // //--
    // initiate lever of countdown auction manually
    const btnCallCownDounAuction = document.getElementById('callCountdownAuction');
    const initiateAuction = async (event) => {
        await countDownInitiateCount(event, initiateAuction);
    }
    btnCallCownDounAuction.addEventListener('click', initiateAuction);
    //--

    await intiateFirstLayoutInitiateAuction(
        thisAuctionFormDataMediator,
        dataKeysFormDataMediatorAuction,
        elementsLibAuctionInitiation,
    );

    // await createAuctionAct();

    await dragBlocksToolsScreen(dragпerLib);

    // initiation init welcome toolset on - production set as const from URI endpoint
    await createUpdateAuctionWorkspace('username');
    //--
    const submitStakesElt = document.getElementById('selectThisStake');
    submitStakesElt.addEventListener('change', async (event) => {
        if (event.target.checked) {
            const aproovedStake = await collectStakesAndUsersManager(event, mainFormdata);
            if (aproovedStake) {
                setTimeout(() => {
                    submitStakesElt.checked = false;
                }, 500);
            }

        }
    })
});

async function clearFormData(formDataThis) {
    const entries = Array.from(formDataThis.entries());
    entries.forEach(([key]) => {
        formDataThis.delete(key);
    });
}
async function currencyURIConstructor() {
    let urls = {}
    let from = 'UAH';
    let to = ['USD', 'EUR', 'USDT', 'ILS'];

    for (let i = 0; i < to.length; i++) {
        urls[`${to[i]}`] = `https://api.getgeoapi.com/v2/currency/convert?api_key=5f848fa15155692c21954ebb5d68c9c291ad2d79&from=${from}&to=${to[i]}&format={json}`
    }

    return urls;
}
// helper slepping function;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// store data in cache :
// Save request data
async function cacheRequest(key, data) {
    localStorage.setItem(key, JSON.stringify(data)); // Use sessionStorage if temporary
}

// Retrieve cached data
async function getCachedRequest(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null; // Returns parsed JSON or null if not found
}

// On page reload
document.addEventListener("DOMContentLoaded", async () => {
    const key = "lastCurrncies";
    const cachedData = await getCachedRequest(key);
    if (cachedData && typeof cachedData === "string") {
        try {
            const curObj = JSON.parse(cachedData);
            const keysObj = Array.from(Object.keys(curObj));
            keysObj.forEach((key) => {
                mainFormdata.set(`${key}`, curObj[`${key}`]);
            });
        } catch (err) {
            console.error("Error parsing cached data:", err);
        }
    } else {
        console.warn("Cached data is invalid or not a string");
    }
});
//

async function fetchCurrenciesRatesWithDelay(urls, formDataMediator, delay = 1000) {
    const currenciesObj = {};
    const results = [];
    const arrayObj = Object.keys(urls);
    console.log(arrayObj)
    for (let key of arrayObj) {
        const url = urls[`${key}`];
        try {
            // Fetch data
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const rates = data.rates;
            console.log(rates);
            const thisRate = rates[`${key}`].rate;
            formDataMediator.set(`${key}`, thisRate);
            currenciesObj[`${key}`] = thisRate;

        } catch (error) {
            console.error("Error fetching data:", error);
        }

        // Wait for the specified delay before the next iteration
        await sleep(delay);
    }
    await cacheRequest('lastCurrncies', currenciesObj);
    return results;
}
// in-use
async function retrieveObjFromFormData(key, formdataMediator) {
    try {
        const thisRawObject = formdataMediator.get(key);
        return JSON.parse(thisRawObject);
    } catch (error) {
        console.error(error);
        return false;
    };

}
//in-use
async function setObjToFormData(key, objectData, formDataMediator) {
    try {
        const setObjToStr = JSON.stringify(objectData);
        formDataMediator.set(`${key}`, setObjToStr);
        return true;
    } catch (error) {
        console.error(error)
        return false;
    }
}
//in-use
async function collectStakesAndUsersManager(event, formDataMediator) {
    const timestamp = await timeStampNow();
    try {
        if (event.target.id === 'selectThisStake') {
            // colect all fields in patent to be as set of values:
            const idCollection = {
                name: 'nameExists',
                stake: 'money',
                currency: 'currency',
                targetUser: 'onBehalf',
                contacts: {
                    email: 'contactEmail',
                    phone: 'contactEmail'
                }
            }
            // collect submitedData:
            let amountInvalue;
            let onbehalfStake;
            const nameInput = document.getElementById(`${idCollection.name}`);
            const stakeAmountRaw = document.getElementById(`${idCollection.stake}`);
            const currencyThis = document.getElementById(`${idCollection.currency}`);
            const onBehalveUser = document.getElementById(`${idCollection.targetUser}`);
            const emailUser = document.getElementById(`${idCollection.contacts.email}`);
            const phoneUser = document.getElementById(`${idCollection.contacts.phone}`);
            const nameChosen = await getSelectedValue(nameInput);
            const rawMoney = stakeAmountRaw.value;
            const currency = await getSelectedValue(currencyThis);
            let coef;
            const auctionItemTotal = document.getElementById('auctionLastUpdatedSumm');

            if (currency === "UAH") {
                coef = 1;

            } else {
                coef = parseFloat(formDataMediator.get(`${currency}`));
            }
            amountInvalue = (parseFloat(rawMoney) / coef);

            // amount checked +;
            const totalAmoutonProcess = parseFloat(formDataMediator.get('tradeResults'));
            console.log(totalAmoutonProcess, 'as init', typeof totalAmoutonProcess);
            if (!totalAmoutonProcess) {
                formDataMediator.append('tradeResults', amountInvalue);
                auctionItemTotal.textContent = parseInt(amountInvalue).toString() + ' UAH';

            } else {

                console.log('entering to update total', amountInvalue, totalAmoutonProcess);
                const newAmountInProcess = totalAmoutonProcess + amountInvalue;
                console.log('summ of amount', newAmountInProcess, typeof newAmountInProcess);
                formDataMediator.set('tradeResults', newAmountInProcess);
                auctionItemTotal.textContent = parseInt(newAmountInProcess).toString() + ' UAH'
            }
            onbehalfStake = await getSelectedValue(onBehalveUser);
            if (onbehalfStake === '' || onbehalfStake === nameChosen) {
                onbehalfStake = nameChosen;
                const thisUserActive = await retrieveObjFromFormData(nameChosen, formDataMediator);
                if (thisUserActive) {
                    thisUserActive.lastStake = amountInvalue;
                    const lastPrevSumm = parseFloat(thisUserActive.totalSumm);
                    const updatedSumm = (lastPrevSumm + amountInvalue).toString();
                    thisUserActive.totalSumm = updatedSumm;
                    thisUserActive.timestamp = timestamp;
                    await setObjToFormData(nameChosen, thisUserActive, formDataMediator);
                    await updateAuctionViewTable(formDataMediator);

                    return true
                } else {
                    const dataOfUser = {
                        name: nameChosen,
                        lastStake: amountInvalue,
                        totalSumm: amountInvalue,
                        email: emailUser.value,
                        phone: phoneUser.value,
                        timestamp: timestamp,
                        active: true,
                        increasedBy: [nameChosen],
                        toBehalf: [nameChosen]
                    };
                    await setObjToFormData(nameChosen, dataOfUser, formDataMediator);
                    console.log(formDataMediator);
                    await updateAuctionViewTable(formDataMediator);
                    return true
                }
            } else {
                const benificiar = await retrieveObjFromFormData(onbehalfStake, formDataMediator);
                if (benificiar) {
                    const totalToUpdate = parseFloat(benificiar.totalSumm);
                    const resultBenificiar = (totalToUpdate + amountInvalue).toString();
                    benificiar.lastStake = 0;
                    benificiar.totalSumm = resultBenificiar;
                    benificiar.increasedBy.push(nameChosen);
                    await setObjToFormData(onbehalfStake, benificiar, formDataMediator);
                    const fellow = await retrieveObjFromFormData(nameChosen, formDataMediator);
                    if (!fellow) {
                        const dataOfUser = {
                            name: nameChosen,
                            lastStake: amountInvalue,
                            totalSumm: 0,
                            email: emailUser.value,
                            phone: phoneUser.value,
                            active: true,
                            increasedBy: [],
                            toBehalf: [onbehalfStake]
                        }
                        await setObjToFormData(nameChosen, dataOfUser, formDataMediator);
                        await updateAuctionViewTable(formDataMediator);
                        return true
                    } else {
                        fellow.lastStake = amountInvalue;
                        fellow.toBehalf.push(onbehalfStake);
                        await setObjToFormData(nameChosen, fellow, formDataMediator);
                        await updateAuctionViewTable(formDataMediator);
                        return true
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
// in-use
async function getSelectedValue(selectElement, alterData = null) {
    const selectedValue = selectElement.selectedIndex;
    const chosenOption = selectElement.options[selectedValue];
    if (selectedValue > 0) {
        return chosenOption.value;
    } else {
        if (alterData) {
            return alterData
        } else {
            return '';
        }
    }
}

//in-use
async function timeStampNow() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
//in-use
async function getEltPositionMap(eltId) {
    const elt = document.getElementById(`${eltId}`).getBoundingClientRect();
    const eltMap = {
        top: elt.top,
        left: elt.right,
        width: elt.width,
        height: elt.height,
        end_btm: elt.top + elt.height,
        right: elt.left + elt.width
    };
    return eltMap;
}

//in-use
const getLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => reject(error)
    );
});
//in-use
async function dataSubmissionFetching(formdataMediator, requestMethod, endpointApi, data) {
    try {
        const userAgent = navigator.userAgent;
        const location = await getLocation().catch(() => null);
        const headers = {
            'X_CSRFToken': formdataMediator.csrf_token,
            'User-Agent': userAgent,
            ...(location && { 'X-User-Location': `${location.latitude},${location.longitude}` })
        };
        if (requestMethod === "POST") {
            try {
                const response = await fetch(`${endpointApi}`, {
                    method: 'POST',
                    body: formdataMediator,
                    headers: headers
                });
                const data_ = await response.json();
                return data_;
            } catch (error) {
                console.error(error);
                return null;
            }

        } else {
            try {
                if (data && typeof data !== 'object') {
                    throw new Error("Invalid data type: Expected an object or array.");
                }
                let uri = '';
                const keys = Object.keys(data);
                Array.from(keys).forEach((key, index) => {
                    if (index === 0) {
                        uri = endpointApi + `?${key}=${data[key]}`;
                    } else {
                        uri += `&${key}=${data[key]}`;
                    }
                })
                const response = await fetch(uri, {
                    headers: headers
                });
                const data_ = await response.json();
                return data_;
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}
async function updateAuctionViewTable(formdataMediator) {
    const requiredKeys = {
        totalAuction: 'tradeResults',
        currencies: ['USD', 'EUR', 'USDT', 'ILS'],
    };
    const totalCurrentSumAuction = parseFloat(formdataMediator.get(`${requiredKeys.totalAuction}`));
    const participantsList = [];
    const formdataKeys = Array.from(formdataMediator.keys());
    for (let i = 0; i < formdataKeys.length; i++) {
        if (!requiredKeys.currencies.includes(formdataKeys[i]) && formdataKeys[i] !== requiredKeys.totalAuction) {
            participantsList.push(formdataKeys[i]);
        }
    }
    if (participantsList.length > 0) {
        await tableResultsConstuctor(participantsList, formdataMediator);
    }
}

async function startUpcountDownStakeSession(
    prevAmount,
    currentAmount,
    participantNamePrev,
    participantNameCurrent
) {
    const thisWrapper = document.getElementById('countdownStakesWrap');
    if (participantNamePrev !== participantNameCurrent && prevAmount < currentAmount) {
        while (thisWrapper.firstChild) {
            thisWrapper.removeChild(thisWrapper.firstChild);
        }
    }

}
async function countDownInitiateCount(event, mainListenerMediator, timeout = undefined) {
    event.target.removeEventListener('click', mainListenerMediator);
    const triggerElt = event.target;
    if (!timeout) {
        timeout = 0.5; // Default timeout in minutes
    }

    const parentElt = document.getElementById('countdownStakesWrap');
    parentElt.innerHTML = `
        <table class="table-blogs">
            <caption class="caption-blogs-table" overflow>Робимо ставки</caption>
            <tr>
                <td class="td-count-down-table-blogs" id="minutes">00</td>
                <td class="td-count-down-table-blogs">:</td>
                <td class="td-count-down-table-blogs" id="seconds">00</td>
            </tr>
        </table>
    `;
    const minutesEl = parentElt.querySelector("#minutes");
    const secondsEl = parentElt.querySelector("#seconds");

    const endTime = Date.now() + timeout * 60 * 1000;
    let intervalId = 0;
    let shouldExit = false;

    // Event listener to exit early
    const innerListener = () => {
        shouldExit = true;
        triggerElt.removeEventListener("click", innerListener); // Remove listener
    };

    triggerElt.addEventListener("click", innerListener);
    let beep = new Audio(`${beepSound}`);
    // Countdown logic using setInterval
    intervalId = setInterval(() => {
        beep.play();


        const now = Date.now();
        const remainingTime = Math.max(0, endTime - now);

        const mins = Math.floor(remainingTime / (60 * 1000));
        const secs = Math.floor((remainingTime % (60 * 1000)) / 1000);

        // Update the UI
        minutesEl.textContent = String(mins).padStart(2, "0");
        secondsEl.textContent = String(secs).padStart(2, "0");

        // Check exit conditions
        if (remainingTime <= 0 || shouldExit) {
            beep.pause();
            console.log("heer hetyurtyasdf");
            const sound = new Audio(`${audioOhNoPath}`);
            sound.play();
            parentElt.innerHTML = `
                <table class="table-blogs">
                    <caption class="caption-blogs-table" style="color:red;" overflow>Ставки Зроблено!</caption>
                    <tr>
                        <td class="td-count-down-table-blogs" id="minutes">00</td>
                        <td class="td-count-down-table-blogs">:</td>
                        <td class="td-count-down-table-blogs" id="seconds">00</td>
                    </tr>
                </table>
            `;
            event.target.addEventListener('click', mainListenerMediator);
            clearInterval(intervalId);
        }
    }, 1000); // Run every second
}


async function tableResultsConstuctor(usersList, formDataMediator) {
    const currentTotal = formDataMediator.get('tradeResults');
    const parentTableBody = document.getElementById('auctionDataCellsContents');
    while (parentTableBody.firstChild) {
        parentTableBody.removeChild(parentTableBody.firstChild);
    }
    for (let i = 0; i < usersList.length; i++) {
        const userObj = await retrieveObjFromFormData(usersList[i], formDataMediator);
        await tablerowsConstructor(userObj, currentTotal, parentTableBody);
    }

}
async function tablerowsConstructor(userObject, totalSummAuction, parentElt) {
    let increasedBy;
    const thisStake = parseInt(userObject.lastStake) === 0;
    const increasedList = userObject.increasedBy;
    if (thisStake) {
        increasedBy = increasedList.slice(-1);
    } else {
        increasedBy = (userObject.increasedBy).slice(-1);
    }
    const nameElt = document.createElement('th');
    nameElt.classList.add("th-bloger-users-data");
    const username = userObject.name;
    nameElt.textContent = username;
    const summCell = document.createElement('td');
    summCell.classList.add('td-bloger-users-data');
    const userTotalSumm = userObject.totalSumm;
    let relation = Math.floor((parseFloat(userTotalSumm) / parseFloat(totalSummAuction)) * 100);
    const summWrapper = document.createElement('div');
    const summGraph = document.createElement('div');
    if (relation === 0) {
        relation = 1;
    }
    summGraph.style.width = `${relation}%`;
    summGraph.style.height = '15px';
    summGraph.style.backgroundColor = 'red';
    const summStrCont = document.createElement('div');
    const sumStrElt = document.createElement('p');
    sumStrElt.textContent = parseInt(userTotalSumm);
    summStrCont.appendChild(sumStrElt);
    summWrapper.appendChild(summGraph);
    summWrapper.appendChild(summStrCont);
    summWrapper.classList.add('in-sell-grig-rows');
    summCell.appendChild(summWrapper);
    const stakeCell = document.createElement('td');
    stakeCell.classList.add('td-bloger-users-data');
    const thisStakeWrap = document.createElement('div');
    const stakeAmount = document.createElement('p');
    stakeAmount.textContent = parseInt(userObject.lastStake);
    thisStakeWrap.appendChild(stakeAmount);
    stakeCell.appendChild(thisStakeWrap);
    const timestamp = document.createElement('td');
    timestamp.classList.add('td-bloger-users-data');
    const timeData = userObject.timestamp;
    timestamp.textContent = timeData;
    const createParent = document.createElement('tr');
    createParent.appendChild(nameElt);
    createParent.appendChild(summCell);
    createParent.appendChild(stakeCell);
    createParent.appendChild(timestamp);
    parentElt.appendChild(createParent);
}

async function dragAuctionToolsScreen() {
    let isDragging = false;
    let offsetX, offsetY;
    const frame = document.getElementById('countDownElt');
    const thisHeader = document.getElementById('auctionContainerDraggingTool');
    const stealthThisBtn = document.getElementById('closeAuctionWrap');
    const restoreBtn = document.getElementById('OpenAuctionWrap');
    thisHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - frame.offsetLeft;
        offsetY = e.clientY - frame.offsetTop;
        thisHeader.style.cursor = 'grabbing';
    });

    // Function to drag the frame
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            frame.style.left = `${e.clientX - offsetX}px`;
            frame.style.top = `${e.clientY - offsetY}px`;
        }
    });
    // Stop dragging
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            thisHeader.style.cursor = 'grab';
        }
    });

    // Close the frame
    stealthThisBtn.addEventListener('click', () => {
        frame.classList.add('hidden');
    });

    // Restore the frame
    restoreBtn.addEventListener('click', () => {
        frame.classList.remove('hidden');
    });
    // Save position on drag end
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            const position = { top: frame.style.top, left: frame.style.left };
            localStorage.setItem('framePosition', JSON.stringify(position));
        }
    });

    // Restore position on page load
    window.addEventListener('load', () => {
        const savedPosition = JSON.parse(localStorage.getItem('framePosition'));
        if (savedPosition) {
            frame.style.top = savedPosition.top;
            frame.style.left = savedPosition.left;
        }
    });
}
async function currentResultUpdater(cWinnerName, prevMaxResult, ThisUserTotResult, mainListenerMediator) {
    const triggerBtn = document.getElementById('callCountdownAuction');
    if (parseInt(ThisUserTotResult) > prevMaxResult) {
        prevMaxResult = parseInt(ThisUserTotResult);
        const winnerRecElt = document.getElementById('winnerNow');
        winnerRecElt.textContent = `${cWinnerName}`;
        const winnerStakeRec = document.getElementById('winSumm');
        winnerStakeRec.textContent = `${ThisUserTotResult} UAH`;
        await countDownInitiateCount(triggerBtn.click, mainListenerMediator, 5);
    }
}