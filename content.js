/* CUSTOM ACTION CARDS */

class DischargePetitionAC extends ActionCard {
    constructor() {
        super();

        this.name = "Discharge Petition";
        this.desc = "Immediately send a bill from committee into the House.";
        this.price = 2;

        this.color = "#996633";
        this.bg = "#eedece";
    }

    isUsable(game) {
        return game.selectedBill != -1 && game.bills[game.selectedBill].stage == IN_COMMITTEE;
    }

    use(game) {
        game.bills[game.selectedBill].stage = IN_HOUSE;
        alert("The discharge petition forced the bill out of committee & onto the house floor!");
    }   
}

class PorkBarrelAmendmentAC extends ActionCard {
    constructor() {
        super();

        this.name = "Pork-Barrel Amendment";
        this.desc = "Earn more money if passed into law, but hurts chances in Congress.";
        this.price = 1;

        this.color = "#6600cc";
        this.bg = "#ffccff";
    }

    isUsable(game) {
        return game.selectedBill != -1 && game.bills[game.selectedBill].stage == IN_SENATE && game.bills[game.selectedBill].amendments.length < 5;
    }

    use(game) {
        game.bills[game.selectedBill].amendments.push(new Amendment("Personal Pork-barrel", 1, 0, 20, 0));
        if (game.bills[game.selectedBill].stage == IN_SENATE) game.bills[game.selectedBill].amendmentsAddedInSenate++;
        alert("Your amendment was added to the bill!");
    }
}

class RiderAmendmentAC extends ActionCard {
    constructor() {
        super();

        this.name = "Rider Amendment";
        this.desc = "Influence a specific member of Congress to vote YES for a bill.";
        this.price = 3;

        this.color = "#6600cc";
        this.bg = "#ffccff";
    }
}

class GermaneAmendmentLeft extends ActionCard {
    constructor() {
        super();

        this.name = "Amendment Card (G, L)";
        this.desc = "Add a germane amendment to a bill, increasing support on the left";
        this.price = 3;

        this.color = "#003399";
        this.bg = "#cceeff";
    }

    isUsable(game) {
        return game.selectedBill != -1 && game.bills[game.selectedBill].stage == IN_HOUSE || game.bills[game.selectedBill].stage == IN_SENATE && game.bills[game.selectedBill].amendments.length < 5;
    }

    use(game) {
        game.bills[game.selectedBill].amendments.push(new Amendment("Germane, Left-Leaning", 0, -40, 0, 0));
        if (game.bills[game.selectedBill].stage == IN_SENATE) game.bills[game.selectedBill].amendmentsAddedInSenate++;
        alert("Your amendment was added to the bill!");
    }   
}

class GermaneAmendmentRight extends ActionCard {
    constructor() {
        super();

        this.name = "Amendment Card (G, R)";
        this.desc = "Add a germane amendment to a bill, increasing support on the right";
        this.price = 3;

        this.color = "#600000";
        this.bg = "#ffcccc";
    }

    isUsable(game) {
        return game.selectedBill != -1 && game.bills[game.selectedBill].stage == IN_HOUSE || game.bills[game.selectedBill].stage == IN_SENATE && game.bills[game.selectedBill].amendments.length < 5;
    }

    use(game) {
        game.bills[game.selectedBill].amendments.push(new Amendment("Germane, Right-Leaning", 0, 40, 0, 0));
        if (game.bills[game.selectedBill].stage == IN_SENATE) game.bills[game.selectedBill].amendmentsAddedInSenate++;
        alert("Your amendment was added to the bill!");
    }   
}

class NongermaneAmendmentLeft extends ActionCard {
    constructor() {
        super();

        this.name = "Amendment Card (NG, L)";
        this.desc = "(Senate Only) Add a nongermane amendment to a bill, increasing support on the left";
        this.price = 3;

        this.color = "#003399";
        this.bg = "#cceeff";
    }

    isUsable(game) {
        return game.selectedBill != -1 && game.bills[game.selectedBill].stage == IN_SENATE && game.bills[game.selectedBill].amendments.length < 5;
    }

    use(game) {
        game.bills[game.selectedBill].amendments.push(new Amendment("Nongermane, Left-Leaning", 0, -80, 0, 0));
        if (game.bills[game.selectedBill].stage == IN_SENATE) game.bills[game.selectedBill].amendmentsAddedInSenate++;
        alert("Your amendment was added to the bill!");
    }   
}

class NongermaneAmendmentRight extends ActionCard {
    constructor() {
        super();

        this.name = "Amendment Card (NG, R)";
        this.desc = "(Senate Only) Add a nongermane amendment to a bill, increasing support on the right";
        this.price = 3;

        this.color = "#600000";
        this.bg = "#ffcccc";
    }

    isUsable(game) {
        return game.selectedBill != -1 && game.bills[game.selectedBill].stage == IN_SENATE && game.bills[game.selectedBill].amendments.length < 5;
    }

    use(game) {
        game.bills[game.selectedBill].amendments.push(new Amendment("Nongermane, Right-Leaning", 0, 80, 0, 0));
        if (game.bills[game.selectedBill].stage == IN_SENATE) game.bills[game.selectedBill].amendmentsAddedInSenate++;
        alert("Your amendment was added to the bill!");
    }   
}

class AdCampaignAC extends ActionCard {
    constructor() {
        super();

        this.name = "Ad Campaign"; 
        this.desc = "Increase public support for a bill. More effective in the House.";
        this.price = 1;

        this.color = "#006699";
        this.bg = "#ccffff";
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

        this.color = "#996633";
        this.bg = "#eedece";
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

class LogrollingAC extends ActionCard {
    constructor() {
        super();

        this.name = "Logrolling"; 
        this.desc = "Vote for another members' unpopular bill, gaining their vote in return";
        this.price = 1;

        this.color = "#663300";
        this.bg = "#ffffcc";
    }
}

class PetitionAC extends ActionCard {
    constructor() {
        super();

        this.name = "Presidential Petition"; 
        this.desc = "Ensures that the president will sign in this bill once in the Oval Office";
        this.price = 1;

        this.color = "#003300";
        this.bg = "#ccffcc";
    }

    isUsable(game) {
        return game.selectedBill != -1 && game.bills[game.selectedBill].stage == IN_OFFICE;
    }

    use(game) {
        alert(`The president is persuaded by the petitions & will not veto the bill!`);
    }
}


ACTION_CARDS = [DischargePetitionAC, CommitteeHearingAC, AdCampaignAC, GermaneAmendmentLeft, GermaneAmendmentRight, NongermaneAmendmentLeft, NongermaneAmendmentRight, PorkBarrelAmendmentAC, PetitionAC];


/* BILLS */

class Bill1 extends Bill {
    constructor() {
        super();
        this.color = "#0066cc";
        this.bg = "#b7e8ff";
        this.desc = "Increase the federal minimum wage to adjust for inflation.";

        this.baseAlignment = -80; // -100 = far left, 100 = far right
        this.basePopularSupport = 50; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = 5; // $
    }
}

class Bill2 extends Bill {
    constructor() {
        super();
        this.color = "#0066cc";
        this.bg = "#b7e8ff";
        this.desc = "Increase funding for public education institutions.";

        this.baseAlignment = -80; // -100 = far left, 100 = far right
        this.basePopularSupport = 50; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = 5; // $
    }
}

class Bill3 extends Bill {
    constructor() {
        super();
        this.color = "#0066cc";
        this.bg = "#b7e8ff";
        this.desc = "Stricter environmental regulations to assist with conservation.";

        this.baseAlignment = -40; // -100 = far left, 100 = far right
        this.basePopularSupport = 50; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = 10; // $
    }
}

class Bill4 extends Bill {
    constructor() {
        super();
        this.color = "#0066cc";
        this.bg = "#b7e8ff";
        this.desc = "Increase tax breaks for alternative & renewable energy sources.";

        this.baseAlignment = -40; // -100 = far left, 100 = far right
        this.basePopularSupport = 30; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = 15; // $
    }
}

class Bill5 extends Bill {
    constructor() {
        super();
        this.color = "#0066cc";
        this.bg = "#b7e8ff";
        this.desc = "Reduce the rate of interest for student loans.";

        this.baseAlignment = -80; // -100 = far left, 100 = far right
        this.basePopularSupport = 50; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = 5; // $
    }
}

class Bill6 extends Bill {
    constructor() {
        super();
        this.color = "#6600cc";
        this.bg = "#e4caff";
        this.desc = "Invest some of the national budget into infrastructure improvements.";

        this.baseAlignment = 0; // -100 = far left, 100 = far right
        this.basePopularSupport = 60; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = 10; // $
    }
}

class Bill7 extends Bill {
    constructor() {
        super();
        this.color = "#800000";
        this.bg = "#ffcccc";
        this.desc = "Pass tax cuts for small & medium businesses";

        this.baseAlignment = 40; // -100 = far left, 100 = far right
        this.basePopularSupport = 40; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = 5; // $
    }
}

class Bill8 extends Bill {
    constructor() {
        super();
        this.color = "#800000";
        this.bg = "#ffcccc";
        this.desc = "Increase federal spending on national defense";

        this.baseAlignment = 40; // -100 = far left, 100 = far right
        this.basePopularSupport = 40; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = 5; // $
    }
}

class Bill9 extends Bill {
    constructor() {
        super();
        this.color = "#800000";
        this.bg = "#ffcccc";
        this.desc = "Strengthen border security & reduce immigration";

        this.baseAlignment = 80; // -100 = far left, 100 = far right
        this.basePopularSupport = 40; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = 5; // $
    }
}

class Bill10 extends Bill {
    constructor() {
        super();
        this.color = "#800000";
        this.bg = "#ffcccc";
        this.desc = "Increase Voter ID Requirements";

        this.baseAlignment = 80; // -100 = far left, 100 = far right
        this.basePopularSupport = 30; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = 15; // $
    }
}

class Bill11 extends Bill {
    constructor() {
        super();
        this.color = "#800000";
        this.bg = "#ffcccc";
        this.desc = "Lower Corporate Taxes to reduce government hindrance of businesses";

        this.baseAlignment = 80; // -100 = far left, 100 = far right
        this.basePopularSupport = 45; // 0 = Very unpopular, 100 = Very popular
        this.baseCashReward = 10; // $
    }
}

BILLS = [Bill1, Bill2, Bill3, Bill4, Bill5, Bill6, Bill7, Bill8, Bill9, Bill10, Bill11];

/* MAINLOOP */

var GAME = new Game();