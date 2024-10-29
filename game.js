/* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */
/* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */
/* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */

const LS_ROUND = document.getElementById("ls_info_roundnum");
const LS_CASH = document.getElementById("ls_info_cash");
const LS_APPROVAL = document.getElementById("ls_info_approval");

const BILLS_DIV = document.getElementById("bills_div");

const ACTIONS_DIV = document.getElementById("actions_div");
const AD_CARDS = document.getElementById("ad_cards");
const AD_USE_BTN = document.getElementById("ad_use");
const AD_DISCARD_BTN = document.getElementById("ad_discard");

const MW_OVERVIEW_BTN = document.getElementById("mw_header_overview");
const OVERVIEWDIV = document.getElementById("mw_overviewdiv");

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
const RS_CONGRESSMEMBER_DIV = document.getElementById("rs_congressmember_div");


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
        this.publicApproval = 40;

        this.bills = [];
        this.selectedBill = 0;

        this.actionCards = [];
        this.selectedActionCard = -1;

        this.selectedMW = MW_OVERVIEW;

        this.buildHouse();
        this.buildSenate();
        this.generateShop();


        // Initial Render
        this.renderAll();
    }

    buildHouse() {
        this.house = [];
        HOUSEDIV_GRID.innerHTML = "";
        for (let i = 0; i < 25; i++) {
            let btn = document.createElement("button");
            btn.innerText = `${i+1}`;
            btn.onclick = function() { GAME.selectCongressMember(i); };

            let alignment = FAR_LEFT;
            if (i < 8) alignment = FAR_LEFT;
            else if (i < 11) alignment = MID_LEFT;
            else if (i < 14) alignment = INDEPENDENT;
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
            if (i < 8) alignment = FAR_LEFT;
            else if (i < 10) alignment = MID_LEFT;
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
        LS_CASH.innerText = `$${this.money}`;
        LS_APPROVAL.innerText = `Public Approval: ${this.publicApproval}%`;
    }

    renderBillsHeld() {
        BILLS_DIV.innerHTML = "";
        let idx = 0;
        for (let bill of this.bills) {
            bill.menuBtn = bill.createMenuCardBtn(idx++);
            BILLS_DIV.appendChild(bill.menuBtn);
        }
    }

    renderActionCards() {
        AD_CARDS.innerHTML = "";
        let idx = 0;
        for (let ac of this.actionCards) {
            ac.menuBtn = ac.createMenuCardBtn(idx++);
            AD_CARDS.appendChild(ac.menuBtn);
        }

        if (this.selectedActionCard != -1) {
            AD_USE_BTN.removeAttribute("disabled");
            AD_DISCARD_BTN.removeAttribute("disabled");
        } else {
            AD_USE_BTN.setAttribute("disabled", "");
            AD_DISCARD_BTN.setAttribute("disabled", "");
        }
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

    }

    renderHouse() {
        for (let h of this.house) {
            h.render(this);
        }

        if (this.selectedBill != -1) {

        } else {

        }
    }

    renderSenate() {
        for (let s of this.senate) {
            s.render(this);
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

            AD_USE_BTN.removeAttribute("disabled");
            AD_DISCARD_BTN.removeAttribute("disabled");
        }
    }

    useActionCard() {
        
    }

    discardActionCard() {

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
                this.shopBills[idx] = BoughtBill;
                this.money--;
                this.bills.push(b);
            }
        }

        this.renderAll();
    }

    selectMW(mw) {
        this.selectedMW = mw;
        this.renderMW();
    }

    selectCongressMember(idx) {
        if (idx >= 25) {
            this.senate[idx-25].render(this)
        } else {
            this.house[idx].render(this)
        }
    }

    nextRound() {
        this.selectedBill = -1;
        this.selectMW(MW_OVERVIEW);

        for (let bill of this.bills) {
            bill.roundTick();
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

class Bill {
    constructor() {
        this.title = "Debug Bill";
        this.desc = "Bill of Debug Description";
        this.committeeName = "Committee of Debug";

        this.alive = true;
        this.stage = IN_PROPOSAL;
        
        this.baseAlignment = 0; // -100 = far left, 100 = far right
        this.basePopularSupport = 50; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = 10; // $
        this.basePopReward = 5; // % gained for public approval
        this.baseScore = 100; 

        this.committeeApproval = null;
        this.roundsInCommittee = 0;

        this.amendments = [];
        // Added on to base values (capped within ranges)
        this.amdnPopularSupport = 0; // Directly affects
        this.amdnCashReward = 0; 
        this.amdnPopReward = 0; // % gained (or lost) for public approval

        this.actionCards = [];
        // Add specific action cards (i.e. party-line vote) here

        this.house = 0;
    }

    roundTick() {
        // Random actions based on current bill position
        // Runs every "new round"
    }

    propose() {
        // Sends this bill to committee; run after selected
    }

    sendToHouse() {
        // Sends the bill to the House of Reps; run after committee approves in roundTick
    }

    sendToSenate() {
        // Sends the bill to the Senate; run after House votes on bill successfully
    }

    sendToConference() {
        // Sends the bill to the Conference Committee; run if Senate vote has differences from House vote
    }

    sendToOffice() {

    }

    sendToVetoHouse() {

    }

    sendToVetoSenate() {

    }

    putInLaw() {

    }

    kill() {

    }

    createShopCardBtn(idx) {
        let div = document.createElement("div");
        div.className = "mw_sd_ac";

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
        btn.innerText = `Propose Bill ($1)`;
        div.appendChild(btn);

        return div;
    }

    createMenuCardBtn(idx) {
        // Creates a div that displays the bill in the "bills" holder.
        let btn = document.createElement("button");
        btn.className = "bd_bill";

        let btnTitle = document.createElement("p");
        btnTitle.innerText = `${this.title}`;
        btnTitle.className = "bd_bill_title";
        btn.appendChild(btnTitle);
        btn.appendChild(document.createElement("br"));

        let btnStatus = document.createElement("p");
        btnStatus.innerText = `${["Proposal", "In Committee", "House Floor", "Senate Floor", "Oval Office", "House Floor (Vetoed)", "Senate Floor (Vetoed)", "Law"][this.stage]}`;
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

var BILLS = [Bill, Bill, Bill, Bill];

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
        this.alignment = alignment;
        this.button = htmlBtn;

        this.button.className = ["far_left", "mid_left", "independent", "mid_right", "far_right"][2+alignment];
        HOUSEDIV_GRID.appendChild(this.button);

        this.actionCards = [];
    }

    render(game) {
        this.button.classList.remove("vote_no");
        this.button.classList.remove("vote_yes");
        if (game.selectedBill != -1) {
            let bill = game.bills[game.selectedBill];

            let alignmentImpact = 10;
            if (this.alignment > INDEPENDENT) {
                alignmentImpact += 1.5 * (bill.baseAlignment) - 50 * this.alignment;
            } else {
                alignmentImpact += 50 * this.alignment - 1.5 * bill.baseAlignment;
            }
            alignmentImpact = Math.min(alignmentImpact, 50);
            alignmentImpact = Math.max(alignmentImpact, -50);
            alignmentImpact = Math.round(alignmentImpact);

            let popularImpact = bill.basePopularSupport / 4;
            popularImpact = Math.round(popularImpact);

            // TODO AMENDMENTS & ACTION CARDS

            let netImpact = alignmentImpact + popularImpact;
            if (netImpact > 0) {
                this.button.classList.add("vote_yes");
            } else {
                this.button.classList.add("vote_no");
            }
        }
    }

    updateSidebar(game) {
        RS_CD_NAME.innerText = `Representative #${this.num}`;
        RS_CD_ALIGNMENT.innerText = ["Far Left-Leaning", "Moderately Left-Leaning", "Independent", "Moderately Right-Leaning", "Far Right-Leaning"][this.alignment+2];

        let bill = game.bills[game.selectedBill];

        let alignmentImpact = 0;
        if (this.alignment > INDEPENDENT) {
            alignmentImpact += 1.5 * (bill.baseAlignment) - 50 * this.alignment;
        } else {
            alignmentImpact += 50 * this.alignment - 1.5 * bill.baseAlignment;
        }

        alignmentImpact = Math.min(alignmentImpact, 50);
        alignmentImpact = Math.max(alignmentImpact, -50);
        alignmentImpact = Math.round(alignmentImpact);

        let popularImpact = bill.popSupport / 4;
        popularImpact = Math.round(popularImpact);

        // TODO AMENDMENTS & ACTION CARDS

        let netImpact = alignmentImpact + popularImpact;

        if (netImpact > 0) {

        } else {

        }
    }
}


class SenateMember {
    constructor(num, alignment, htmlBtn) {
        this.num = num;
        this.alignment = alignment;
        this.button = htmlBtn;

        this.button.className = ["far_left", "mid_left", "independent", "mid_right", "far_right"][2+alignment];
        SENATEDIV_GRID.appendChild(this.button);

        this.actionCards = [];
    }

    render(game) {

    }

    updateSidebar(game) {
        // 
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

        this.border = "#000000";
        this.bg = "#ffffff";

        this.menuBtn = null;
    }

    isUsable(game) {

    }

    use(game) {

    }

    createShopCardBtn(idx) {
        let div = document.createElement("div");
        div.className = "mw_sd_ac";

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

var ACTION_CARDS = [ActionCard, ActionCard, ActionCard, ActionCard];

/* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */
/* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */
/* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */

var GAME = new Game();