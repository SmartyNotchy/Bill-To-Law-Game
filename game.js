/* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */
/* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */
/* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */ /* PLAYER */

class Game {
    constructor() {
        this.round = 1;
        this.money = 6;
        this.publicApproval = 40;

        this.bills = [];
        this.selectedBill = -1;

        this.actionCards = [];
        this.selectedActionCard = -1;

        // TODO: Build
        this.house = [];
        HOUSEDIV_GRID.innerHTML = "";
        for (let i = 0; i < 25; i++) {
            let btn = document.createElement("button");
            btn.innerText = `${i+1}`;
            let alignment = FAR_LEFT;
            if (i < 8) alignment = FAR_LEFT;
            else if (i < 11) alignment = MID_LEFT;
            else if (i < 14) alignment = INDEPENDENT;
            else if (i < 17) alignment = MID_RIGHT;
            else alignment = FAR_RIGHT;

            this.house.push(new HouseMember(i+1, alignment, btn));
        }

        this.senate = [];
    }

    renderBillsHeld() {

    }

    renderActionCards() {

    }

    renderShop() {

    }

    hideMW() {

    }

    renderHouse() {
        this.hideMW();
        HOUSEDIV.style.display = "block";
    }

    renderSenate() {

    }

    renderBillOverview() {

    }

    selectBill(idx) {

    }

    selectActionCard(idx) {

    }

    useActionCard(idx) {

    }

    selectCongressMember(idx) {

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
const IN_CONF_HOUSE = 5;
const IN_CONF_SENATE = 6;
const IN_OFFICE = 7;
const IN_HOUSE_VETO = 8;
const IN_SENATE_VETO = 9;
const IN_LAW = 10;

class Bill {
    constructor(alignment, popSupport, cReward, pReward, score) {
        this.title = 0;
        this.desc = "Debug Bill";

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

    sendToConfHouse() {
        
    }

    sendToConfSenate() {

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

const MW_HOUSE_BTN = document.getElementById("mw_header_house");
const HOUSEDIV = document.getElementById("mw_housediv");
const HOUSEDIV_GRID = document.getElementById("mw_housediv_btns");

const MW_SENATE_BTN = document.getElementById("mw_header_senate");
const SENATEDIV = document.getElementById("mw_senatediv");
const SENATEDIV_GRID = document.getElementById("mw_senatediv_btns");

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
        if (game.selectedBill == -1) {

        } else {
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

            if (netImpact > 10) {

            }
        }
    }

    updateSidebar(game) {
        // 
    }
}


class SenateMember {
    constructor(num, alignment, htmlBtn) {
        this.num = num;
        this.alignment = alignment;
        this.button = htmlBtn;

        this.actions = [];
    }

    render(game) {
        //
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
MW_HOUSE_BTN.onclick = function() { GAME.renderHouse() };
MW_SENATE_BTN.onclick = function() { GAME.renderSenate() };