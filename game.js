/* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */
/* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */
/* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */ /* HTML */

const LS_ROUND = document.getElementById("ls_info_roundnum");
const LS_CASH = document.getElementById("ls_info_cash");
const LS_APPROVAL = document.getElementById("ls_info_approval");

const BILLS_DIV = document.getElementById("bills_div");

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

        this.bills = [new Bill(0, 0, 0, 0, 0)];
        this.selectedBill = 0;

        this.actionCards = [];
        this.selectedActionCard = -1;

        this.selectedMW = MW_OVERVIEW;

        this.buildHouse();
        this.buildSenate();


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
            let btn = bill.createMenuCardBtn();
            btn.onclick = function() { GAME.selectBill(idx++) };
            BILLS_DIV.appendChild(btn);
        }
    }

    renderActionCards() {
        
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

    }

    selectBill(idx) {
        // re-render
    }

    selectActionCard(idx) {
        // re-render
    }

    useActionCard() {

    }

    discardActionCard() {

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
        for (let bill of this.bills) {
            bill.roundTick();
        }

        renderBillsHeld();
        renderActionCards();

        this.selectedBill = -1;
        renderBillOverview();
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
    constructor(alignment, popSupport, cReward, pReward, score) {
        this.title = "Debug Bill";
        this.desc = "Bill of Debug Description";
        this.committeeName = "Committee of Debug";

        this.alive = true;
        this.stage = IN_PROPOSAL;
        
        this.baseAlignment = 0; // -100 = far left, 100 = far right
        this.basePopularSupport = popSupport; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = cReward; // $
        this.basePopReward = pReward; // % gained for public approval
        this.baseScore = score; 

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

    createProposalCardBtn() {
        // Creates a div that displays the bill in the "select proposal" menu.
    }

    createMenuCardBtn() {
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

        return btn;
    }

    renderRightSidebar() {
        // If nothing is selected, render the right sidebar
    }
}

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

    }

    isUsable(game) {

    }

    use(game) {

    }

    createShopCardBtn() {

    }

    createMenuCardBtn() {

    }
}

/* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */
/* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */
/* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */ /* MAINLOOP */

var GAME = new Game();