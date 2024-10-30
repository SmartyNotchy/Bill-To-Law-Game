/* CUSTOM ACTION CARDS */

class DischargePetitionAC extends ActionCard {
    constructor() {
        super();

        this.name = "Discharge Petition";
        this.desc = "Immediately send a bill from committee into the House.";
        this.price = 2;

        this.border = "#000000";
        this.bg = "#ffffff";
        this.color = "#000000";
    }

    isUsable(game) {

    }

    use(game) {

    }
}

class PorkBarrelAmendmentAC extends ActionCard {
    constructor() {
        super();

        this.name = "Pork-Barrel Amendment";
        this.desc = "Earn more money if passed into law, but hurts chances in Congress.";
        this.price = 3;
    }
}

class RiderAmendmentAC extends ActionCard {
    constructor() {
        super();

        this.name = "Rider Amendment";
        this.desc = "Influence a specific member of Congress to vote YES for a bill.";
        this.price = 3;
    }
}

class AdCampaignAC extends ActionCard {
    constructor() {
        super();

        this.name = "Ad Campaign"; 
        this.desc = "Increase public support for a bill. More effective in the House.";
        this.price = 1;
    }

    isUsable(game) {
        return game.selectedBill != -1 && game.bills[game.selectedBill].stage != FAILED && game.bills[game.selectedBill].stage != IN_LAW;
    }

    use(game) {
        let amount = Math.floor(Math.random() * 10 + 10);
        amount = Math.min(amount, 100 - game.bills[game.selectedBill].basePopularSupport);
        game.bills[game.selectedBill].basePopularSupport += amount;
        alert(`The ad campaign for your bill boosted public support for it by ${amount}%, up to ${game.bills[game.selectedBill].basePopularSupport}%!`);
    }
}

class CommitteeHearingAC extends ActionCard {
    constructor() {
        super();

        this.name = "Committee Hearing";
        this.desc = "Use while a bill is in committee to greatly increase public support.";
        this.price = 1;
    }

    isUsable(game) {
        return game.selectedBill != -1 && game.bills[game.selectedBill].stage == IN_COMMITTEE;
    }

    use(game) {
        let amount = Math.floor(Math.random() * 10 + 15);
        amount = Math.min(amount, 100 - game.bills[game.selectedBill].basePopularSupport);
        game.bills[game.selectedBill].basePopularSupport += amount;
        alert(`The committee hearing boosted public awareness by ${amount}%, up to ${game.bills[game.selectedBill].basePopularSupport}%!`);
    }
}


ACTION_CARDS = [DischargePetitionAC, PorkBarrelAmendmentAC, RiderAmendmentAC, AdCampaignAC, CommitteeHearingAC];

/* MAINLOOP */

var GAME = new Game();