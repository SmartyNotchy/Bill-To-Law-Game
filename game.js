/* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */
/* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */
/* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */

const LS_ROUND = document.getElementById("ls_info_roundnum");
const LS_CASH = document.getElementById("ls_info_cash");
const LS_APPROVAL = document.getElementById("ls_info_approval");

const LS_NEXTROUND_BTN = document.getElementById("ls_nextround_btn");

const BILLS_DIV = document.getElementById("bills_div");

const ACTIONS_DIV = document.getElementById("actions_div");
const AD_CARDS = document.getElementById("ad_cards");
const AD_USE_BTN = document.getElementById("ad_use");
const AD_DISCARD_BTN = document.getElementById("ad_discard");

const MW_OVERVIEW_BTN = document.getElementById("mw_header_overview");
const OVERVIEWDIV = document.getElementById("mw_overviewdiv");
const MW_OD_TITLE = document.getElementById('mw_od_title');
const MW_OD_DESC = document.getElementById('mw_od_desc');
const MW_OD_AMND = document.getElementById('mw_od_amnd');
const MW_OD_AMNDLIST = document.getElementById('mw_od_amndlist');

const MW_HOUSE_BTN = document.getElementById("mw_header_house");
const HOUSEDIV = document.getElementById("mw_housediv");
const HOUSEDIV_GRID = document.getElementById("mw_housediv_btns");

const MW_SENATE_BTN = document.getElementById("mw_header_senate");
const SENATEDIV = document.getElementById("mw_senatediv");
const SENATEDIV_GRID = document.getElementById("mw_senatediv_btns");

const MW_SHOP_BTN = document.getElementById("mw_header_shop");
const SHOPDIV = document.getElementById("mw_shopdiv");
const SHOPDIV_AC = document.getElementById("mw_sd_actioncards");
const SHOPDIV_BILLS = document.getElementById("mw_sd_bills");

const RS_CONGRESSOVERVIEW_DIV = document.getElementById("rs_congressoverview_div");
const RS_CO_HOUSE = document.getElementById("rs_co_house");
const RS_CO_NAME = document.getElementById("rs_co_name");
const RS_CO_SUPPORT = document.getElementById("rs_co_support");
const RS_CO_VOTE = document.getElementById("rs_co_vote");

const RS_CONGRESSMEMBER_DIV = document.getElementById("rs_congressmember_div");
const RS_CM_NAME = document.getElementById('rs_cm_name');
const RS_CM_ALIGNMENT = document.getElementById("rs_cm_alignment");
const RS_CM_LINE = document.getElementById('rs_cm_vote');
const RS_CM_VOTETEXT = document.getElementById("rs_cm_votetext");
const RS_CM_VOTEBILL = document.getElementById("rs_cm_votebill");
const RS_CM_INF = document.getElementById("rs_cm_inf");

const RS_SHOP_DIV = document.getElementById('rs_shop_div');

const RS_OVERVIEW_DIV = document.getElementById("rs_overview_div");
const RS_OD_ALIGNMENT = document.getElementById("rs_od_alignment");
const RS_OD_POPSUPPORT = document.getElementById("rs_od_popsupport");
const RS_OD_REWARD = document.getElementById("rs_od_reward");
const RS_OD_DESC = document.getElementById("rs_od_desc");
const RS_OD_DISCARD = document.getElementById("rs_od_discard");


/* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */
/* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */
/* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */

const MW_OVERVIEW = 1;
const MW_HOUSE = 2;
const MW_SENATE = 3;
const MW_SHOP = 4;

class Game {
    constructor() {
        this.round = 1;
        this.money = 6;
        this.publicApproval = 60;

        this.bills = [];
        this.selectedBill = -1;

        this.actionCards = [];
        this.selectedActionCard = -1;
        
        this.selectedCongress = -1;

        this.selectedMW = MW_OVERVIEW;

        this.buildHouse();
        this.buildSenate();
        this.generateShop();


        // Initial Render
        this.renderAll();

        this.billsPassed = 0;
        this.billsProposed = 0;
        this.cardsUsed = 0;
        this.amendmentsAdded = 0;
    }

    buildHouse() {
        this.house = [];
        HOUSEDIV_GRID.innerHTML = "";
        for (let i = 0; i < 25; i++) {
            let btn = document.createElement("button");
            btn.innerText = `${i+1}`;
            btn.onclick = function() { GAME.selectCongressMember(i); };

            let alignment = FAR_LEFT;
            if (i < 10) alignment = FAR_LEFT;
            else if (i < 13) alignment = MID_LEFT;
            else if (i < 15) alignment = INDEPENDENT;
            else if (i < 17) alignment = MID_RIGHT;
            else alignment = FAR_RIGHT;

            this.house.push(new HouseMember(i+1, alignment, btn));
        }
    }

    buildSenate() {
        this.senate = [];
        SENATEDIV_GRID.innerHTML = "";
        for (let i = 0; i < 20; i++) {
            let btn = document.createElement("button");
            btn.innerText = `${i+1}`;
            btn.onclick = function() { GAME.selectCongressMember(i+25); };

            let alignment = FAR_LEFT;
            if (i < 6) alignment = FAR_LEFT;
            else if (i < 8) alignment = MID_LEFT;
            else if (i < 12) alignment = MID_RIGHT;
            else alignment = FAR_RIGHT;

            this.senate.push(new SenateMember(i+1, alignment, btn));
        }
    }

    renderAll() {
        this.renderLeftSidebar();
        this.renderBillsHeld();
        this.renderActionCards();
        this.renderMW();
    }

    renderLeftSidebar() {
        LS_ROUND.innerText = `Round ${this.round}/30`;
        LS_CASH.innerText = `Money: $${this.money}`;
        LS_APPROVAL.innerText = `Public Approval: ${this.publicApproval}%`;

        LS_NEXTROUND_BTN.onclick = function() { GAME.nextRound(); }
    }

    renderBillsHeld() {
        BILLS_DIV.innerHTML = "";
        let idx = 0;
        for (let bill of this.bills) {
            bill.menuBtn = bill.createMenuCardBtn(idx++);
            BILLS_DIV.appendChild(bill.menuBtn);
            if (idx - 1 == this.selectedBill) {
                bill.menuBtn.classList.add('active');
            }
        }
    }

    renderActionCards() {
        AD_CARDS.innerHTML = "";
        let idx = 0;
        for (let ac of this.actionCards) {
            ac.menuBtn = ac.createMenuCardBtn(idx++);
            AD_CARDS.appendChild(ac.menuBtn);
            if (idx - 1 == this.selectedActionCard) {
                ac.menuBtn.classList.add('active');
            }
        }

        if (this.selectedActionCard != -1) {
            if (this.actionCards[this.selectedActionCard].isUsable(this)) AD_USE_BTN.removeAttribute("disabled");
            else AD_USE_BTN.setAttribute("disabled", "");
            AD_DISCARD_BTN.removeAttribute("disabled");
        } else {
            AD_USE_BTN.setAttribute("disabled", "");
            AD_DISCARD_BTN.setAttribute("disabled", "");
        }

        AD_USE_BTN.onclick = function() { GAME.useActionCard(); }
        AD_DISCARD_BTN.onclick = function() { GAME.discardActionCard(); }
    }

    renderMW() {
        MW_OVERVIEW_BTN.onclick = function() { GAME.selectMW(MW_OVERVIEW) };
        MW_HOUSE_BTN.onclick = function() { GAME.selectMW(MW_HOUSE) };
        MW_SENATE_BTN.onclick = function() { GAME.selectMW(MW_SENATE) };
        MW_SHOP_BTN.onclick = function() { GAME.selectMW(MW_SHOP) };

        OVERVIEWDIV.style.display = (this.selectedMW == MW_OVERVIEW) ? "block" : "none";
        HOUSEDIV.style.display = (this.selectedMW == MW_HOUSE) ? "block" : "none";
        SENATEDIV.style.display = (this.selectedMW == MW_SENATE) ? "block" : "none";
        SHOPDIV.style.display = (this.selectedMW == MW_SHOP) ? "block" : "none";

        if (this.selectedMW == MW_OVERVIEW) {
            this.renderOverview();
        } else if (this.selectedMW == MW_HOUSE) {
            this.renderHouse();
        } else if (this.selectedMW == MW_SENATE) {
            this.renderSenate();
        } else if (this.selectedMW == MW_SHOP) {
            this.renderShop();
        }
    }
    
    renderOverview() {
        function alignmentStr(alignment) {
            if (alignment < -40) return "Far Left";
            if (alignment < 0) return "Somewhat Left";
            if (alignment == 0) return "Bipartisan"
            if (alignment <= 40) return "Somewhat Right";
            return "Far Right";
        }

        RS_SHOP_DIV.style.display = "none";
        RS_CONGRESSOVERVIEW_DIV.style.display = "none";
        RS_CONGRESSMEMBER_DIV.style.display = "none";
        RS_OVERVIEW_DIV.style.display = "block";

        if (this.selectedBill == -1) {
            RS_OD_ALIGNMENT.innerText = "No Bill Selected!";
            RS_OD_POPSUPPORT.innerText = "";
            RS_OD_REWARD.innerText = "";
            RS_OD_DESC.innerText = "";

            RS_OD_DISCARD.style.display = "none";

            MW_OD_TITLE.innerText = "Bill Overview - _____";
            MW_OD_DESC.innerText = "No bill selected! You can propose new bills in the Shop menu.";
            MW_OD_AMND.innerText = "Current Amendments (-/5)";
            MW_OD_AMNDLIST.innerHTML = "";
        } else {
            let bill = this.bills[this.selectedBill];
            RS_OD_ALIGNMENT.innerText = alignmentStr(bill.baseAlignment);
            RS_OD_POPSUPPORT.innerText = `Popular Support: ${bill.basePopularSupport}%`;

            let cash = bill.baseCashReward;
            for (let amnd of bill.amendments) {
                cash += amnd.cash;
            }

            RS_OD_REWARD.innerText = `Reward: $${cash}`;
            
            RS_OD_DESC.innerText = bill.desc;

            MW_OD_TITLE.innerText = `Bill Overview - ${bill.title}`;
            MW_OD_DESC.innerHTML = bill.getDesc();
            MW_OD_AMND.innerText = `Current Amendments (${bill.amendments.length}/5)`;

            let amnds = [];
            let idx = 1;
            for (let amnd of bill.amendments) {
                amnds.push(`Amendment #${idx++} - ${amnd.text}`);
            }

            MW_OD_AMNDLIST.innerHTML = amnds.join("<br>");

            RS_OD_DISCARD.style.display = "block";
            if (bill.stage == FAILED) RS_OD_DISCARD.innerText = "Discard Bill Card";
            else if (bill.stage == IN_LAW) RS_OD_DISCARD.innerText = "Claim Rewards";
            else RS_OD_DISCARD.innerText = "Discard this Bill";

            RS_OD_DISCARD.onclick = function() { GAME.discardBill(); };
        }
    }

    renderHouse() {
        for (let h of this.house) {
            h.render(this);
        }

        if (this.selectedCongress == -1 || this.selectedCongress >= 25) {
            for (let i = 0; i < 25; i++) {
                this.house[i].button.classList.remove("activealt");
            }
            RS_CONGRESSMEMBER_DIV.style.display = "none";
            RS_SHOP_DIV.style.display = "none";
            RS_OVERVIEW_DIV.style.display = "none";
            RS_CONGRESSOVERVIEW_DIV.style.display = "block";

            RS_CO_HOUSE.innerText = "House of Representatives";
            if (this.selectedBill == -1) {
                RS_CO_NAME.innerText = "No bill selected"
                RS_CO_SUPPORT.innerText = "";
                RS_CO_VOTE.setAttribute("disabled", "");
            } else {
                let bill = this.bills[this.selectedBill];
                RS_CO_NAME.innerText = bill.title;

                if (bill.stage == IN_HOUSE || bill.stage == IN_HOUSE_VETO) {
                    let support = 0;
                    for (let i = 0; i < 25; i++) {
                        if (this.house[i].calculateImpact(this)[0] > 0) support += 4;
                    }
                    RS_CO_SUPPORT.innerText = `Congressional Support: ${support}%`;
                    RS_CO_VOTE.removeAttribute("disabled", "");
                    RS_CO_VOTE.onclick = function() { GAME.bills[GAME.selectedBill].voteInHouse(GAME); }
                } else {
                    RS_CO_SUPPORT.innerText = "Not on the House floor";
                    RS_CO_VOTE.setAttribute("disabled", "");
                }
            }
        } else {
            for (let i = 0; i < 25; i++) {
                if (i == this.selectedCongress) this.house[i].button.classList.add("activealt");
                else this.house[i].button.classList.remove("activealt");
            }
            RS_SHOP_DIV.style.display = "none";
            RS_CONGRESSOVERVIEW_DIV.style.display = "none";
            RS_OVERVIEW_DIV.style.display = "none";
            RS_CONGRESSMEMBER_DIV.style.display = "block";

            let rep = this.house[this.selectedCongress];
            rep.updateSidebar(this);
        }
    }

    renderSenate() {
        for (let s of this.senate) {
            s.render(this);
        }

        if (this.selectedCongress == -1 || this.selectedCongress < 25) {
            for (let i = 0; i < 20; i++) {
                this.senate[i].button.classList.remove("activealt");
            }
            RS_CONGRESSMEMBER_DIV.style.display = "none";
            RS_SHOP_DIV.style.display = "none";
            RS_OVERVIEW_DIV.style.display = "none";
            RS_CONGRESSOVERVIEW_DIV.style.display = "block";

            RS_CO_HOUSE.innerText = "The Senate";
            if (this.selectedBill == -1) {
                RS_CO_NAME.innerText = "No bill selected"
                RS_CO_SUPPORT.innerText = "";
                RS_CO_VOTE.setAttribute("disabled", "");
            } else {
                let bill = this.bills[this.selectedBill];
                RS_CO_NAME.innerText = bill.title;

                if (bill.stage == IN_SENATE || bill.stage == IN_SENATE_VETO) {
                    let support = 0;
                    for (let i = 0; i < 20; i++) {
                        if (this.senate[i].calculateImpact(this)[0] > 0) support += 5;
                    }

                    RS_CO_SUPPORT.innerText = `Congressional Support: ${support}%`; // todo fix
                    RS_CO_VOTE.onclick = function() { GAME.bills[GAME.selectedBill].voteInSenate(GAME); }
                    RS_CO_VOTE.removeAttribute("disabled", "");
                } else {
                    RS_CO_SUPPORT.innerText = "Not on the Senate floor";
                    RS_CO_VOTE.setAttribute("disabled", "");
                }
            }
        } else {
            for (let i = 0; i < 20; i++) {
                if (i == this.selectedCongress - 25) this.senate[i].button.classList.add("activealt");
                else this.senate[i].button.classList.remove("activealt");
            }
            RS_SHOP_DIV.style.display = "none";
            RS_CONGRESSOVERVIEW_DIV.style.display = "none";
            RS_OVERVIEW_DIV.style.display = "none";
            RS_CONGRESSMEMBER_DIV.style.display = "block";

            let senator = this.senate[this.selectedCongress-25];
            senator.updateSidebar(this);
        }
    }

    renderShop() {
        SHOPDIV_AC.innerHTML = "";
        let idx = 0;
        for (let ac of this.shopActions) {
            SHOPDIV_AC.appendChild(new ac().createShopCardBtn(idx++));
        }

        SHOPDIV_BILLS.innerHTML = "";
        idx = 4;
        for (let b of this.shopBills) {
            SHOPDIV_BILLS.appendChild(new b().createShopCardBtn(idx++));
        }

        
        RS_CONGRESSOVERVIEW_DIV.style.display = "none";
        RS_CONGRESSMEMBER_DIV.style.display = "none";
        RS_OVERVIEW_DIV.style.display = "none";
        RS_SHOP_DIV.style.display = "block";
    }

    selectBill(idx) {        
        if (this.selectedBill == idx) {
            this.bills[idx].menuBtn.classList.remove("active");
            this.selectedBill = -1;
        } else {
            if (this.selectedBill != -1) this.bills[this.selectedBill].menuBtn.classList.remove("active");
            this.selectedBill = idx
            this.bills[this.selectedBill].menuBtn.classList.add("active");
        }

        this.renderAll();
    }

    discardBill() {
        if (this.selectedBill != -1) {
            let bill = this.bills[this.selectedBill];
            this.bills.splice(this.selectedBill, 1);
            this.selectedBill = -1;

            if (bill.stage == IN_LAW) {
                this.billsPassed += 1;
                let cash = bill.baseCashReward;
                for (let amnd of bill.amendments) {
                    cash += amnd.cash;
                }
                let popSupport = (bill.basePopularSupport > 75 ? 20 : 16);
                this.money += cash;
                popSupport = Math.min(popSupport, 100 - this.publicApproval);
                this.publicApproval += popSupport;
                if (popSupport == 0) {
                    alert(`You earned $${cash} from passing this bill!`);
                } else {
                    alert(`You earned $${cash} from passing this bill and gained ${popSupport}% more public approval!`);
                }
                
            }
            this.renderAll();
        }
    }

    selectActionCard(idx) {
        if (this.selectedActionCard == idx) {
            this.actionCards[idx].menuBtn.classList.remove("active");
            this.selectedActionCard = -1;
            
            AD_USE_BTN.setAttribute("disabled", "");
            AD_DISCARD_BTN.setAttribute("disabled", "");
        } else {
            if (this.selectedActionCard != -1) this.actionCards[this.selectedActionCard].menuBtn.classList.remove("active");
            this.selectedActionCard = idx;
            this.actionCards[idx].menuBtn.classList.add("active");

            if (this.actionCards[idx].isUsable(this)) AD_USE_BTN.removeAttribute("disabled");
            else AD_USE_BTN.setAttribute("disabled", "");
            AD_DISCARD_BTN.removeAttribute("disabled");
        }
    }

    useActionCard() {
        this.actionCards[this.selectedActionCard].use(this);
        this.discardActionCard();
        this.renderAll();
    }

    discardActionCard() {
        this.actionCards.splice(this.selectedActionCard, 1);
        this.selectedActionCard = -1;
        this.renderAll();
    }

    generateShop() {
        this.shopActions = ACTION_CARDS.sort(() => 0.5 - Math.random()).slice(0, 4);
        this.shopBills = BILLS.sort(() => 0.5 - Math.random()).slice(0, 2);
    }

    buyShopItem(idx) {
        if (idx < 4) {
            let ac = new this.shopActions[idx]();
            if (ac.price > this.money) alert("Not enough money!");
            else if (this.actionCards.length >= 3) alert("You can only hold 3 action cards at a time! Use or discard one to free up space.");
            else {
                this.shopActions[idx] = BoughtActionCard;
                this.money -= ac.price;
                this.actionCards.push(ac);
            }
        } else {
            idx -= 4;
            let b = new this.shopBills[idx]();
            if (this.money < 1) alert("Not enough money!");
            else if (this.bills.length >= 3) alert("You can only have 3 active bills at a time!");
            else {
                this.billsProposed++;
                this.shopBills[idx] = BoughtBill;
                this.money--;
                this.bills.push(b);
            }
        }

        this.renderAll();
    }

    selectMW(mw) {
        this.selectedMW = mw;
        this.renderAll();
    }

    selectCongressMember(idx) {
        if (this.selectedCongress == idx) {
            this.selectedCongress = -1;
        } else {
            this.selectedCongress = idx;
        }

        this.renderAll();
    }

    nextRound() {
        for (let bill of this.bills) {
            bill.roundTick();
        }

        this.round += 1;
        let old = this.money;
        this.money += 5;
        if (this.publicApproval < 80) this.money -= 1;
        if (this.publicApproval < 60) this.money -= 1;
        if (this.publicApproval < 40) this.money -= 1;
        if (this.publicApproval < 20) this.money -= 1;
        this.publicApproval -= 3;
        this.publicApproval = Math.max(this.publicApproval, 0);

        alert(`You earned $${this.money - old} from fundraisers & donations!`);

        if (this.round >= 30) {
            let res = prompt(
`Your term in Congress has ended! Your final results:

Bills Passed: ${this.billsPassed}
Bills Proposed: ${this.billsProposed}

Final Public Approval: ${this.publicApproval}%
Re-elected? ${this.publicApproval >= 50 ? "Yes!" : "No..." }

Enter your name to save to the leaderboards.
(After entering your name, a fresh new game will begin! Once a politician, always a politician...)
`);
            location.reload();
        }
        this.generateShop();
        this.renderAll();
    }
}

/* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */
/* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */
/* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */ /* BILLS */

const IN_PROPOSAL = 0;
const IN_COMMITTEE = 1;
const IN_HOUSE = 2;
const IN_SENATE = 3;
const IN_CONFERENCE = 4;
const IN_OFFICE = 5;
const IN_HOUSE_VETO = 6;
const IN_SENATE_VETO = 7;
const IN_LAW = 8;
const FAILED = 9;

class Bill {
    constructor() {
        this.title = `H.R. ${(GAME.round * 100) + Math.floor(Math.random() * 90)}`;
        this.desc = "Bill of Debug Description";
        this.color = "#000000";
        this.bg = "#ffffff";

        this.alive = true;
        this.stage = IN_COMMITTEE;
        
        this.baseAlignment = 0; // -100 = far left, 100 = far right
        this.basePopularSupport = 50; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = 10; // $
        this.baseScore = 100; 

        this.roundsInCommittee = 0;

        this.amendments = [];
        this.amendmentsAddedInSenate = 0;
        this.amndCashReward = 0;

        this.house = 0;
    }

    getDesc() {
        if (this.stage == IN_COMMITTEE) return `Your bill is stuck in committee. It will be reported on in ${3-this.roundsInCommittee} round(s).`;
        if (this.stage == IN_HOUSE) return `Your bill is being debated on the house floor.`;
        if (this.stage == IN_SENATE) return `Your bill is being debated on the Senate floor.`;
        if (this.stage == IN_CONFERENCE) return `Your bill is being resolved in a conference committee. It will be released next round.`;
        if (this.stage == IN_OFFICE) return `Your bill is at the Oval Office, to be signed by the president!`;
        if (this.stage == IN_HOUSE_VETO) return `Your bill was vetoed, and is being re-voted on in the House.`;
        if (this.stage == IN_SENATE_VETO) return `Your bill was vetoed, and is being re-voted on in the Senate.`;
        if (this.stage == IN_LAW) return `Your bill is now a law!`;
        return "Your bill has failed. Time to start over...";
    }

    roundTick() {
        if (this.stage == IN_COMMITTEE) {
            this.roundsInCommittee += 1;
            if (this.roundsInCommittee >= 3) {
                alert(`Your bill ${this.title} was reported out by the committee, and is now on the house floor!`);
                this.stage = IN_HOUSE;
            }
        } else if (this.stage == IN_HOUSE) {

        } else if (this.stage == IN_SENATE) {

        } else if (this.stage == IN_CONFERENCE) {
            alert(`Your bill ${this.title} was fixed by the conference committee and is now on the president's desk!`);
            this.stage = IN_OFFICE;
        } else if (this.stage == IN_OFFICE) {
            alert(`Luckily, your bill ${this.title} was signed by the president into law! Congratulations!`);
            this.stage = IN_LAW;
        } else if (this.stage == IN_HOUSE_VETO) {

        } else if (this.stage == IN_SENATE_VETO) {

        } else if (this.stage == IN_LAW) {

        }
        // Random actions based on current bill position
        // Runs every "new round"
    }

    voteInHouse(game) {
        let support = 0;
        for (let i = 0; i < 25; i++) {
            if (game.house[i].calculateImpact(game)[0] > 0) support += 4;
        }

        if (support >= 50) {
            this.stage = IN_SENATE;
            alert(`Congratulations! Your bill passed the House with ${support}% of votes and is now on the Senate floor.`);
            this.newChanges = `Congratulations! Your bill passed the House with ${support}% of votes and is now on the Senate floor.<br>`;
        } else {
            this.stage = FAILED;
            alert(`Unfortunately, your bill failed to pass the House, as it only got ${support}% of votes.`);
            this.newChanges = `Unfortunately, your bill failed to pass the House, as it only got ${support}% of votes.<br>`;
        }

        game.renderAll();
    }

    voteInSenate(game) {
        let support = 0;
        for (let i = 0; i < 20; i++) {
            if (game.senate[i].calculateImpact(game)[0] > 0) support += 5;
        }

        if (support >= 50) {
            if (this.amendmentsAddedInSenate > 0) {
                this.stage = IN_CONFERENCE;
                alert(`Congratulations! Your bill passed the Senate with ${support}% of votes and is now being resolved in a conference committee.`);
            } else {
                this.stage = IN_OFFICE;
                alert(`Congratulations! Your bill passed the Senate with ${support}% of votes and is now on the President's desk!`);
            }
        } else {
            this.stage = FAILED;
            alert(`Unfortunately, your bill failed to pass the Senate, as it only got ${support}% of votes.`);
            this.newChanges = "Unfortunately, your bill failed to pass the Senate.<br>";
        }

        game.renderAll();
    }

    createShopCardBtn(idx) {
        let div = document.createElement("div");
        div.className = "mw_sd_ac";
        div.style.border = `2px solid ${this.color}`;
        div.style.color = `${this.color}`;
        div.style.backgroundColor = `${this.bg}`;

        let p1 = document.createElement("p");
        p1.className = "mw_sd_ac_title";
        p1.innerText = "Bill Proposal";
        div.appendChild(p1);

        let p2 = document.createElement("p");
        p2.className = "mw_sd_ac_desc";
        p2.innerText = this.desc;
        div.appendChild(p2);

        let btn = document.createElement("button");
        btn.onclick = function() { GAME.buyShopItem(idx) };
        btn.className = "mw_sd_ac_buy";
        btn.innerText = `Propose Bill ($1)`;
        div.appendChild(btn);

        return div;
    }

    createMenuCardBtn(idx) {
        // Creates a div that displays the bill in the "bills" holder.
        let btn = document.createElement("button");
        btn.className = "bd_bill";
        btn.style.border = `2px solid ${this.color}`;
        btn.style.color = `${this.color}`;
        btn.style.backgroundColor = `${this.bg}`;

        let btnTitle = document.createElement("p");
        btnTitle.innerText = `${this.title}`;
        btnTitle.className = "bd_bill_title";
        btn.appendChild(btnTitle);
        btn.appendChild(document.createElement("br"));

        let btnStatus = document.createElement("p");
        btnStatus.innerText = `${["Proposal", "In Committee", "House Floor", "Senate Floor", "In Conference", "Oval Office", "House Floor (Vetoed)", "Senate Floor (Vetoed)", "Law", "Failed"][this.stage]}`;
        btnStatus.className = "bd_bill_status";
        btn.appendChild(btnStatus);
        btn.onclick = function() { GAME.selectBill(idx) };

        return btn;
    }
}

class BoughtBill extends Bill {
    constructor() {
        super();

        this.title = "Bought!";
        this.desc = "";
    }

    createShopCardBtn(idx) {
        let div = document.createElement("div");
        div.className = "mw_sd_ac";
        div.style.border = "2px solid lightgray";

        let p1 = document.createElement("p");
        p1.className = "mw_sd_ac_title";
        p1.innerText = this.title;
        div.appendChild(p1);

        let p2 = document.createElement("p");
        p2.className = "mw_sd_ac_desc";
        p2.innerText = this.desc;
        div.appendChild(p2);

        let btn = document.createElement("button");
        btn.onclick = function() { GAME.buyShopItem(idx) };
        btn.className = "mw_sd_ac_buy";
        btn.innerText = `Already Proposed!`;
        btn.setAttribute("disabled", "");
        div.appendChild(btn);

        return div;
    }
}

class Amendment {
    constructor(text, type, alignment, cash, specific) {
        this.text = text;
        this.type = type;
        this.alignment = alignment;
        this.cash = cash;

        this.specific = specific;
    }

    getImpact(member) {
        if (this.type == 0) {
            if (this.alignment <= 0 && member.alignment <= 0) {
                return Math.round((80 - Math.abs(this.alignment - member.alignment * 40))/3.25);
            } else if (this.alignment >= 0 && member.alignment >= 0) {
                return Math.round((80 - Math.abs(this.alignment - member.alignment * 40))/3.25);
            } else {
                return -15;
            }
        } else if (this.type == 1) {
            return -10;
        } else if (this.type == 2) {
            if (member.rawNum == this.specific) {
                return 100;
            }
        }
    }
}

var BILLS = [];

/* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */
/* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */
/* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */ /* HOUSE & SENATE */

const FAR_LEFT = -2;
const MID_LEFT = -1;
const INDEPENDENT = 0;
const MID_RIGHT = 1;
const FAR_RIGHT = 2;

class HouseMember {
    constructor(num, alignment, htmlBtn) {
        this.num = num;
        this.rawNum = num;
        this.alignment = alignment;
        this.button = htmlBtn;

        this.button.className = ["far_left", "mid_left", "independent", "mid_right", "far_right"][2+alignment];
        HOUSEDIV_GRID.appendChild(this.button);

        this.actionCards = [];
    }

    calculateImpact(game) {
        let bill = game.bills[game.selectedBill];

        let alignmentImpact = 0;
        if (this.alignment <= 0 && bill.baseAlignment <= 0) {
            alignmentImpact = 80 - Math.abs(this.alignment * 40 - bill.baseAlignment);
        } else if (this.alignment >= 0 && bill.baseAlignment >= 0) {
            alignmentImpact = 80 - Math.abs(this.alignment * 40 - bill.baseAlignment);
        } else {
            alignmentImpact = -40;
        }

        alignmentImpact = Math.round(alignmentImpact);

        let popularImpact = bill.basePopularSupport - 50;
        popularImpact = Math.round(popularImpact);

        let influences = [`${alignmentImpact}% - Political Alignment`, `${popularImpact}% - Popular Opinion`];
        
        let miscImp = this.calculateMiscImpact(game);

        let netImpact = alignmentImpact + popularImpact + miscImp[0];
        return [netImpact, influences.concat(miscImp[1])];
    }

    calculateMiscImpact(game) {
        let bill = game.bills[game.selectedBill];
        let idx = 1;
        let res = 0;
        let infs = [];
        for (let amnd of bill.amendments) {
            let imp = amnd.getImpact(this);
            res += imp;
            infs.push(`${imp}% - Amendment #${idx++}`);
        }
        return [res, infs];
    }

    render(game) {
        this.button.classList.remove("vote_no");
        this.button.classList.remove("vote_yes");
        if (game.selectedBill != -1 && (game.bills[game.selectedBill].stage == IN_HOUSE || game.bills[game.selectedBill].stage == IN_HOUSE_VETO)) {
            let imp = this.calculateImpact(game);
            if (imp[0] > 0) {
                this.button.classList.add("vote_yes");
            } else {
                this.button.classList.add("vote_no");
            }
        }
    }

    updateSidebar(game) {
        RS_CM_NAME.innerText = `Representative #${this.num}`;
        RS_CM_ALIGNMENT.innerText = ["Far Left-Leaning", "Moderately Left-Leaning", "Independent", "Moderately Right-Leaning", "Far Right-Leaning"][this.alignment+2];

        if (game.selectedBill == -1) {
            RS_CM_LINE.style.display = "none";
        } else {
            let imp = this.calculateImpact(game);
            let bill = game.bills[game.selectedBill];
            if (bill.stage == IN_HOUSE || bill.stage == IN_HOUSE_VETO) {
                RS_CM_LINE.style.display = "block";
                RS_CM_VOTETEXT.innerText = `${imp[0] > 0 ? "YES" : "NO"} (${imp[0]}%)`;
                RS_CM_VOTEBILL.innerText = bill.title;
                RS_CM_INF.innerHTML = imp[1].join("<br>");
            } else {
                RS_CM_LINE.style.display = "none";
                let imp = this.calculateMiscImpact(game);

                if (imp[1].length == 0) {
                    RS_CM_INF.innerHTML = "None";
                } else {
                    RS_CM_INF.innerHTML = imp[1].join("<br>");
                }
            }
        }
    }
}


class SenateMember {
    constructor(num, alignment, htmlBtn) {
        this.num = num;
        this.rawNum = num + 25;
        this.alignment = alignment;
        this.button = htmlBtn;

        this.button.className = ["far_left", "mid_left", "independent", "mid_right", "far_right"][2+alignment];
        SENATEDIV_GRID.appendChild(this.button);

        this.actionCards = [];
    }

    calculateImpact(game) {
        let bill = game.bills[game.selectedBill];

        let alignmentImpact = 0;
        if (this.alignment <= 0 && bill.baseAlignment <= 0) {
            alignmentImpact = 80 - Math.abs(this.alignment * 40 - bill.baseAlignment);
        } else if (this.alignment >= 0 && bill.baseAlignment >= 0) {
            alignmentImpact = 80 - Math.abs(this.alignment * 40 - bill.baseAlignment);
        } else {
            alignmentImpact = -40;
        }

        alignmentImpact = Math.round(alignmentImpact);

        let popularImpact = (bill.basePopularSupport - 60) / 2;
        popularImpact = Math.round(popularImpact);

        let influences = [`${alignmentImpact}% - Political Alignment`, `${popularImpact}% - Popular Opinion`];
        
        let miscImp = this.calculateMiscImpact(game);

        let netImpact = alignmentImpact + popularImpact + miscImp[0];
        return [netImpact, influences.concat(miscImp[1])];
    }

    calculateMiscImpact(game) {
        let bill = game.bills[game.selectedBill];
        let idx = 1;
        let res = 0;
        let infs = [];
        for (let amnd of bill.amendments) {
            let imp = amnd.getImpact(this);
            res += imp;
            infs.push(`${imp}% - Amendment #${idx++}`);
        }
        return [res, infs];
    }

    render(game) {
        this.button.classList.remove("vote_no");
        this.button.classList.remove("vote_yes");
        if (game.selectedBill != -1 && (game.bills[game.selectedBill].stage == IN_SENATE || game.bills[game.selectedBill].stage == IN_SENATE_VETO)) {
            let imp = this.calculateImpact(game);
            if (imp[0] > 0) {
                this.button.classList.add("vote_yes");
            } else {
                this.button.classList.add("vote_no");
            }
        }
    }

    updateSidebar(game) {
        RS_CM_NAME.innerText = `Senator #${this.num}`;
        RS_CM_ALIGNMENT.innerText = ["Far Left-Leaning", "Moderately Left-Leaning", "Independent", "Moderately Right-Leaning", "Far Right-Leaning"][this.alignment+2];

        if (game.selectedBill == -1) {
            RS_CM_LINE.style.display = "none";
        } else {
            let imp = this.calculateImpact(game);
            let bill = game.bills[game.selectedBill];
            if (bill.stage == IN_SENATE || bill.stage == IN_SENATE_VETO) {
                RS_CM_LINE.style.display = "block";
                RS_CM_VOTETEXT.innerText = `${imp[0] > 0 ? "YES" : "NO"} (${imp[0]}%)`;
                RS_CM_VOTEBILL.innerText = bill.title;
                RS_CM_INF.innerHTML = imp[1].join("<br>");
            } else {
                RS_CM_LINE.style.display = "none";
                let imp = this.calculateMiscImpact(game);

                if (imp[1].length == 0) {
                    RS_CM_INF.innerHTML = "None";
                } else {
                    RS_CM_INF.innerHTML = imp[1].join("<br>");
                }
            }
        }
    }
}



/* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ 
/* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ 
/* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ /* ACTION CARDS */ 

class ActionCard {
    constructor() {
        this.name = "Debug Action Card";
        this.desc = "Does nothing; debug.";
        this.price = 1;

        this.color = "#000000";
        this.bg = "#ffffff";
        

        this.menuBtn = null;
    }

    isUsable(game) {
        return false;
    }

    use(game) {

    }

    createShopCardBtn(idx) {
        let div = document.createElement("div");
        div.className = "mw_sd_ac";
        div.style.color = this.color;
        div.style.border = `2px solid ${this.color}`;
        div.style.backgroundColor = this.bg;

        let p1 = document.createElement("p");
        p1.className = "mw_sd_ac_title";
        p1.innerText = this.name;
        div.appendChild(p1);

        let p2 = document.createElement("p");
        p2.className = "mw_sd_ac_desc";
        p2.innerText = this.desc;
        div.appendChild(p2);

        let btn = document.createElement("button");
        btn.onclick = function() { GAME.buyShopItem(idx) };
        btn.className = "mw_sd_ac_buy";
        btn.innerText = `Buy Card ($${this.price})`;
        div.appendChild(btn);

        return div;
    }

    createMenuCardBtn(idx) {
        let btn = document.createElement("button");
        btn.className = "ad_card";
        btn.style.color = this.color;
        btn.style.border = `2px solid ${this.color}`;
        btn.style.backgroundColor = this.bg;

        let p1 = document.createElement("p");
        p1.innerText = this.name;
        p1.className = "ad_card_title";

        let p2 = document.createElement("p");
        p2.innerText = this.desc;
        p2.className = "ad_card_desc";

        btn.appendChild(p1);
        btn.appendChild(p2);
        btn.onclick = function() { GAME.selectActionCard(idx) };
        return btn;
    }
}

class BoughtActionCard extends ActionCard {
    constructor() {
        super();

        this.name = "Bought!";
        this.desc = "";

        this.border = "#000000";
        this.bg = "#ffffff";
    }

    createShopCardBtn(idx) {
        let div = document.createElement("div");
        div.className = "mw_sd_ac";
        div.style.border = "2px solid lightgray";

        let p1 = document.createElement("p");
        p1.className = "mw_sd_ac_title";
        p1.innerText = this.name;
        div.appendChild(p1);

        let p2 = document.createElement("p");
        p2.className = "mw_sd_ac_desc";
        p2.innerText = this.desc;
        div.appendChild(p2);

        let btn = document.createElement("button");
        btn.onclick = function() { GAME.buyShopItem(idx) };
        btn.className = "mw_sd_ac_buy";
        btn.innerText = `Already Bought!`;
        btn.setAttribute("disabled", "");
        div.appendChild(btn);

        return div;
    }
}

var ACTION_CARDS = []; // Defined in content.js