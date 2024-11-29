

async function createAuctionAct() {
    let listInitVal = [];
    let existEvent;
    const chosenAuctionData = thisAuctionFormDataMediator;
    // if data has not downloaded from server:
    const keysData = Array.from(Object.keys(dataKeysFormDataMediatorAuction));
    keysData.forEach(async (keyPair) => {
        listInitVal.push(chosenAuctionData.get(`${dataKeysFormDataMediatorAuction[keyPair]}`));
    })
    listInitVal.forEach(async (datacollected) => {
        if (!datacollected) {
            existEvent = false;
            return;
        } else {
            existEvent = true;
        }
    });
    if (!existEvent) {
        console.log(existEvent);
    }
    // elt createAuction as instance:
    const initiateAuctionTrigger = document.getElementById('submitThisAuction');

    //workflow levers:
    const inputAukName = document.getElementById("auctionNameInput");
    const inputAukStart = document.getElementById("auctionStartInput");
    const inputAukAim = document.getElementById("auctionAimInput");
    const inputAukImage = document.getElementById("auctionImageInput");
    const submitFieldName = document.getElementById("sbmitAuctionName");
    const submitStart = document.getElementById("sbmitAuctionStart");
    const submitFieldAim = document.getElementById("sbmitAuctionAim");
    const getPreviewFieldImage = document.getElementById("sbmitAuctionImage");
    const submitChosenImage = document.getElementById("agreeThisImg");
    const resetChosenImage = document.getElementById("resetImgToNew");
    const setDefaultImage = document.getElementById("setDefaultImg");


}

async function updateFormDataWithData() {
    // obj pairs input <-> its submit:
    const dataPairs = {
        sbmitAuctionName: "auctionNameInput",
        sbmitAuctionStart: "auctionStartInput",
        sbmitAuctionAim: "auctionAimInput",
        sbmitAuctionImage: "auctionImageInput"
    }

}

async function raiseEmptyErrAlert(submitElt, obj) {
    const thisEltId = submitElt.id;
    const inputEltId = obj[`${thisEltId}`];
    const inputElt_ = document.getElementById(`${inputEltId}`);
    if (!inputElt_.value || inputElt_.value === "" || inputElt_.value === null) {
        const layoutMap = await getEltPositionMap(inputEltId);
        const errEmptyContainer = document.getElementById('errEmptyContainer');
        if (!errEmptyContainer) {
            const errEmptyContainer = document.createElement('div');
            errEmptyContainer.id = 'errEmptyContainer';
            const msg = document.createElement('p');
            msg.textContent = "Це поле є обов'язковим до заповнення!";
            errEmptyContainer.classList.add('error-empty-alert-container');
            errEmptyContainer.appendChild(msg);
            document.body.appendChild(errEmptyContainer);
            errEmptyContainer.style.top = `${layoutMap.top + layoutMap.height - 3}px`;
            errEmptyContainer.style.left = `${layoutMap.left - 5}px`;
            setTimeout(async () => {
                while (errEmptyContainer.firstChild) {
                    errEmptyContainer.removeChild(errEmptyContainer.firstChild);
                }
                document.body.removeChild(errEmptyContainer);
                if (inputElt_.type === 'text') {
                    inputElt_.focus();
                }
            }, 3500);
        } else {
            while (errEmptyContainer.firstChild) {
                errEmptyContainer.removeChild(errEmptyContainer.firstChild);
            }
            document.body.removeChild(errEmptyContainer);
            await raiseEmptyErrAlert(submitElt, obj);
        }
    }
}
async function manageCreateAuctionNavigation(eltFormId, eltsArrayIds) {
    if (Array.from(eltsArrayIds).includes(eltFormId)) {
        Array.from(eltsArrayIds).forEach((eltId) => {
            const thisElt = document.getElementById(`${eltId}`);
            if (eltFormId !== eltId) {
                thisElt.classList.add('hidden');
            } else {
                thisElt.classList.remove('hidden');
            }
        })
    }
}

async function dragBlocksToolsScreen(draggerLib) {
    const keys = Object.keys(draggerLib);
    Array.from(keys).forEach(async (key) => {
        const frameId = draggerLib[`${key}`].frameId;
        const thisHeaderId = draggerLib[`${key}`].dragEltId;
        const stealthThisBtnId = draggerLib[`${key}`].frameStealthMenu;
        const restoreBtnId = draggerLib[`${key}`].frameAppearsMenu;
        let isDragging = false;
        let offsetX, offsetY;
        const frame = document.getElementById(`${frameId}`);
        const thisHeader = document.getElementById(`${thisHeaderId}`);
        const stealthThisBtn = document.getElementById(`${stealthThisBtnId}`);
        const restoreBtn = document.getElementById(`${restoreBtnId}`);

        thisHeader.addEventListener('mousedown', (e) => {
            frame.classList.add('absolute-position-elts');
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
    })
}

// startAuctions Manager: formDatamediator based workflow 
async function intiateFirstLayoutInitiateAuction(initFormDataMediator, initKeysAuctionLib, eltsAuctionForm) {
    const dataPairs = {
        sbmitAuctionName: "auctionNameInput",
        sbmitAuctionStart: "auctionStartInput",
        sbmitAuctionAim: "auctionAimInput",
        sbmitAuctionImage: "auctionImageInput"
    }
    const keymap = Array.from(Object.keys(initFormDataMediator));
    const blockKeymapAuction = Array.from(Object.keys(initKeysAuctionLib));
    // collect current values:
    let formDataValue = [];
    // array for form init auction section:
    let stagesAuctionIds = Array.from(Object.values(eltsAuctionForm));
    console.log(stagesAuctionIds);
    // mediator for stages of listener:
    let submissionIndex;
    let submitFunction
    blockKeymapAuction.forEach(async (key) => {
        formDataValue.push(initFormDataMediator.get(key));
    });
    for (let i = 0; i < formDataValue.length; i++) {
        const currentKey = blockKeymapAuction[i];
        const currentData = initFormDataMediator.get(`${currentKey}`);
        if (!currentData) {
            console.log(currentData, i, currentKey);
            stagesAuctionIds.forEach(async (stageId, index) => {
                if (index !== i) {
                    console.log(index, i);
                    const thisStage = document.getElementById(stageId);
                    thisStage.style.display = 'none';
                } else {
                    const thisStage = document.getElementById(stageId);
                    console.log(thisStage);
                    thisStage.style.display = 'grid';
                    const thisFormsection = document.getElementById(`${stagesAuctionIds[i]}`);
                    const submitThisStageBtn = thisFormsection.querySelector('button');
                    const thisStageInput = thisFormsection.querySelector('input');
                    if (thisStageInput.type === 'text' || thisStageInput.type === 'date') {
                        submitFunction = async (event) => {
                            const thisInputValue = thisStageInput.value;
                            if (thisInputValue === "" || thisInputValue === null || thisInputValue === undefined) {
                                await raiseEmptyErrAlert(submitThisStageBtn, dataPairs)
                            } else {
                                initFormDataMediator.set(`${blockKeymapAuction[i]}`, thisInputValue);
                                console.log(initFormDataMediator);
                                formDataValue.push(thisInputValue);
                                await intiateFirstLayoutInitiateAuction(initFormDataMediator, initKeysAuctionLib, eltsAuctionForm)
                            }
                        }
                        submitThisStageBtn.addEventListener('click', submitFunction);

                    } else if (thisStageInput.type === 'file') {
                        submitFunction = async (event) => {
                            thisStageInput.click();
                            const dataListenerFiles = async (evt) => {
                                const targetImgContainerId = 'previewImageAuction';
                                const imgPreviewId = 'auctionImgpreview';
                                const imgPreviewElt = document.getElementById(imgPreviewId);
                                const resetImgBtnId = 'resetImgToNew';
                                const agreeImgBtnId = 'agreeThisImg';
                                const setDefaultImg = 'setDefaultImg';
                                const resetImgBtn = document.getElementById(resetImgBtnId);
                                const agreeImgBtn = document.getElementById(agreeImgBtnId);
                                const setDefault = document.getElementById(setDefaultImg);
                                if (evt.type === 'change') {
                                    await createPreviewImg(
                                        imgPreviewElt, // img src elt
                                        thisStageInput, // input field type file
                                        initFormDataMediator, // formDatamediator
                                        currentKey, // key for formDatamediator
                                        resetImgBtn, // btn renove this chosen -> choose another img,
                                        agreeImgBtn, // btn set chosen img as img to this auction
                                        setDefault, // btn default img trigger
                                        defaultImgSrc, // default src image path/url
                                        targetImgContainerId, // this preview container wrapper
                                        evt.target // input file elt
                                    );
                                }

                            }
                        }
                    }
                }
            })
            return
        }
    }


}
// --
// init layout toolset
async function createUpdateAuctionWorkspace(username) {
    if (username) {
        const welcomeScreen = document.createElement('div');
        welcomeScreen.id = "initWorkspaceBloger";
        welcomeScreen.classList.add('welcome-bloger-init-mainwrap');
        const welcomeMsg = document.createElement('div');
        welcomeMsg.classList.add('welcome-header-screen-bloger')
        const manageBtnsWrap = document.createElement('div');
        manageBtnsWrap.classList.add('initial-tools-welcome-bloger');
        const msg = `<h4>Вітаємо Вас, <span style="color:goldenrod; font-weight:bold;">${username}!</span></h4><br><hr><p>Це місце керування аукціонів, зборів, то що..</p><br><hr>`;
        welcomeMsg.innerHTML = msg;
        const headerActions = document.createElement('p');
        headerActions.textContent = "Оберіть будь ласка що ви бажаєте активувати (створити)..";
        welcomeMsg.appendChild(headerActions);
        welcomeScreen.appendChild(welcomeMsg)
        const headerRep = document.createElement('span');
        headerRep.textContent = "Звіти";
        headerRep.style.color = 'wheat';
        const moneyReports = document.createElement('div');
        const createReport = document.createElement('button');
        const reviewreports = document.createElement('button');
        const pushreports = document.createElement('button');
        createReport.classList.add('welcome-btns-bloger');
        reviewreports.classList.add('welcome-btns-bloger');
        pushreports.classList.add('welcome-btns-bloger');
        pushreports.textContent = "Обрати та оприлюднити";
        moneyReports.appendChild(headerRep)
        moneyReports.appendChild(createReport);
        moneyReports.appendChild(reviewreports);
        moneyReports.appendChild(pushreports);
        createReport.textContent = "Створити Звітність";
        moneyReports.classList.add('reports-bloger-create-update-review');
        reviewreports.textContent = "Переглянути Звіти";
        welcomeScreen.appendChild(moneyReports);


        const manageNewAuction = document.createElement('button');
        manageNewAuction.textContent = "Новий Аукціон";
        const manageChooseAuction = document.createElement('button');
        manageChooseAuction.textContent = "Активувати Аукціон";

        const manageSetUpStremRepresentation = document.createElement('button');
        manageSetUpStremRepresentation.textContent = "Додати Нове Відео";
        const manageincertVideoFrame = document.createElement('button');
        manageincertVideoFrame.textContent = "Активувати Дійсне Відео";

        const btnOpenNewSession = document.createElement('button');
        btnOpenNewSession.textContent = "Розпочати Сесію";
        const btnCheckSessions = document.createElement('button');
        btnCheckSessions.textContent = "Перелік Дійсних Сесій";

        const btnManageMaoderators = document.createElement('button');
        btnManageMaoderators.textContent = "Мої Модератори";
        const btnCheckChats = document.createElement('button');
        btnCheckChats.textContent = "Доступні Чати";

        const btnBlockedkUsers = document.createElement('button');
        btnBlockedkUsers.textContent = "Заблоковані добродії";
        const btnAddNewUser = document.createElement('button');
        btnAddNewUser.textContent = "Додати Добродія";

        manageNewAuction.classList.add('welcome-btns-bloger');
        manageChooseAuction.classList.add('welcome-btns-bloger');
        manageincertVideoFrame.classList.add('welcome-btns-bloger');
        btnOpenNewSession.classList.add('welcome-btns-bloger');
        btnOpenNewSession.classList.add('welcome-btns-bloger');
        btnCheckSessions.classList.add('welcome-btns-bloger');
        btnManageMaoderators.classList.add('welcome-btns-bloger');
        btnCheckChats.classList.add('welcome-btns-bloger');
        btnBlockedkUsers.classList.add('welcome-btns-bloger');
        btnAddNewUser.classList.add('welcome-btns-bloger');
        manageSetUpStremRepresentation.classList.add('welcome-btns-bloger');

        manageBtnsWrap.appendChild(manageNewAuction);
        manageBtnsWrap.appendChild(manageChooseAuction);
        manageBtnsWrap.appendChild(manageSetUpStremRepresentation);
        manageBtnsWrap.appendChild(manageincertVideoFrame);
        manageBtnsWrap.appendChild(btnOpenNewSession);
        manageBtnsWrap.appendChild(btnCheckSessions);
        manageBtnsWrap.appendChild(btnManageMaoderators);
        manageBtnsWrap.appendChild(btnCheckChats);
        manageBtnsWrap.appendChild(btnBlockedkUsers);
        manageBtnsWrap.appendChild(btnAddNewUser);
        welcomeScreen.appendChild(manageBtnsWrap);
        document.body.appendChild(welcomeScreen);
        // tools listeners:
        //reports section:
        createReport.onclick = async function (e) {
            await createNewBlogerReportMainnav(createReport, e);
        }
        reviewreports.onclick = async function (e) {
            await reviewReportsBlogerMainnav(reviewreports, e);
        }
        pushreports.onclick = async function (e) {
            await pushUpReportsBlogerMainnav(pushreports, e);
        }
        // manageing section
        manageNewAuction.onclick = async function (e) {
            await createAuctionMainnav(manageChooseAuction, e);
        }
        manageChooseAuction.onclick = async function (e) {
            await chooseActivateAuctionMainnav(manageChooseAuction, e);
        }

        btnOpenNewSession.onclick = async function (e) {
            await initiateSessionToolsetMainnav(btnOpenNewSession, e);
        }
        btnCheckSessions.onclick = async function (e) {
            await sessionsListMainnav(btnCheckSessions, e);
        }

        manageSetUpStremRepresentation.onclick = async function (e) {
            await createVideoFrameMainnav(manageSetUpStremRepresentation, e);
        }
        manageincertVideoFrame.onclick = async function (e) {
            await choooseUpdateVideoframesMainnav(manageincertVideoFrame, e);
        }

        btnManageMaoderators.onclick = async function (e) {
            await moderatorsListMainnav(btnManageMaoderators, e);
        }
        btnCheckChats.onclick = async function (e) {
            await chatsListMainnav(btnCheckChats, e);
        }

        btnBlockedkUsers.onclick = async function (e) {
            await felowsInBanMainnav(btnBlockedkUsers, e);
        }
        btnAddNewUser.onclick = async function (e) {
            await addNewFelowMainnav(btnAddNewUser, e);
        }
    }
}
// section init layout management:
async function initiateSessionToolsetMainnav(thisBtn, event) {
    console.log('start session clicked', event.type);
}
async function createAuctionMainnav(thisBtn, evt) {
    const thisInitWrap = document.getElementById(`${layoutsLib.initWorkspace}`);
    const targerWorkspace = document.getElementById(`${layoutsLib.toolsWorkspace}`);
    thisInitWrap.style.display = 'none';
    targerWorkspace.style.display = 'inline-block';
    setTimeout(async () => {
        const openCreateAuctionBtn = document.getElementById(`${layoutsLib.createNewAuctionBtnId}`);
        openCreateAuctionBtn.click();
    }, 500);


}
async function chooseActivateAuctionMainnav(thisBtn, evt) {
    console.log('chooose auction', evt.type);
}
async function createVideoFrameMainnav(thisBtn, evt) {
    console.log('new utube cread set up');
}
async function choooseUpdateVideoframesMainnav(thisBtn, evt) {
    console.log('videoframe choose instances', evt.type);
}
async function sessionsListMainnav(thisBtn, evt) {
    console.log('sessions list', evt.type);
}
async function moderatorsListMainnav(thisBtn, evt) {
    console.log('list of moderators', evt.tupe)
}
async function chatsListMainnav(thisBtn, evt) {
    console.log('all available chats', evt.type);
}
async function felowsInBanMainnav(thisBtn, evt) {
    console.log('banned felows', evt.type);
}
async function addNewFelowMainnav(thisBtn, evt) {
    console.log('add new user to chats', evt.type);
}

// reports init layout management:
async function createNewBlogerReportMainnav(thisBtn, evt) {
    console.log('new report from bloger', evt.type);
}
async function reviewReportsBlogerMainnav(thisBtn, evt) {
    console.log('here list of existion reports from this bloger', evt.type);
}
async function pushUpReportsBlogerMainnav(thisBtn, evt) {
    console.log('publishing dedicated/set report/s', evt.type);
}

async function createPreviewImg(
    previewImgElt, // img src elt
    inputFileElt, // input field type file
    formDataMediator, // formDatamediator
    formDataImgKey,// key for formDatamediator
    resetImgBtn,// btn renove this chosen -> choose another img,
    agreeImgBtn,// btn set chosen img as img to this auction
    setDefaultImgBtn,// btn default img trigger
    defaultImgSrc,// default src image path/url
    thisImgPreviewContainer,// this preview container wrapper
    inputFileFiedl // input file elt
) {
    const file = inputFileElt.files[0];
    const createdAuctionImgId = 'imgOfThisAuctionItem';
    const alertUChooseElt = document.getElementById('alertUChoosetheImage');

    if (file) {
        thisImgPreviewContainer.style.display = 'grid';
        // 1. Create a Blob from the file
        let blob = new Blob([file], { type: file.type });

        // 2. Generate a URL from the Blob
        let blobUrl = URL.createObjectURL(blob);

        // 3. Preview the image using the Blob URL
        previewImgElt.src = blobUrl;
        previewImgElt.alt = 'Обране Зображення не завнтажене';

        // 4. Add the Blob to FormData
        formDataMediator.set(`${formDataImgKey}`, blob, file.name);

        const resetImgFun = async (event) => {
            if (event.target === resetImgBtn) {
                // Reset the preview image and release the URL object
                previewImgElt.src = '';
                if (blobUrl) {
                    URL.revokeObjectURL(blobUrl);  // Ensure the Blob URL is revoked
                }

                // Reset the Blob reference
                blob = null;

                // Clear the file input
                inputFileElt.value = '';  // Proper way to clear file input value
                inputFileElt.files = new FileList([]);  // Clear the file list (though this is mostly for browsers with strict handling)

                // Trigger the file input to re-choose the file
                inputFileFiedl.click();
            }
        }
        resetImgBtn.addEventListener('click', resetImgFun);
        const setDefaultImgFun = async (evt) => {
            if (evt.target === setDefaultImgBtn) {
                formDataMediator.set(`${formDataImgKey}`, null, null);
                previewImgElt.src = '';
                URL.revokeObjectURL(blobUrl);
                blob = null;
                previewImgElt.src = defaultImgSrc;
                formDataMediator.set(`${formDataImgKey}`, defaultImgSrc);
                const createdAuctionImagelt = document.getElementById(`${createdAuctionImgId}`);
                createdAuctionImagelt.src = defaultImgSrc;
                await toggleAlert(alertUChooseElt, setDefaultImgBtn.parentElement, thisImgPreviewContainer);
                const btnsParent = setDefaultImgBtn.parentElement;
            }
        }
        setDefaultImgBtn.addEventListener('click', setDefaultImgFun);
        const agreeImgFun = async (event) => {
            if (event.target === agreeImgBtn) {
                const thisData = formDataMediator.get(`${formDataImgKey}`);
                if (thisData !== null) {
                    previewImgElt.src = '';
                    URL.revokeObjectURL(blobUrl);
                    const createdAuctionImagelt = document.getElementById(`${createdAuctionImgId}`);
                    const blobUrl_ = URL.createObjectURL(blob);
                    createdAuctionImagelt.src = blobUrl_;
                    await toggleAlert(alertUChooseElt, agreeImgBtn.parentElement, thisImgPreviewContainer);
                }
            }
        }
        agreeImgBtn.addEventListener('click', agreeImgFun);
    }
    async function toggleAlert(alertElt, btnsParent, previewContainer) {
        btnsParent.style.display = 'none';
        alertElt.style.display = 'grid';

        setTimeout(() => {
            alertElt.style.display = 'none';
            btnsParent.style.display = 'grid';
            previewContainer.style.display = 'none';
        }, 4000);
    }
}