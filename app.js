/*
    PLUTO ANALYSIS
    VERSION 1

    Educational simulation engine.

    This version does NOT connect to a broker
    and does NOT execute real trades.
*/


const analyzeButton = document.getElementById("analyzeButton");


analyzeButton.addEventListener("click", analyzeMarket);


function analyzeMarket() {

    /*
        VERSION 1 USES SIMULATED CONDITIONS.

        Later we can replace these values with
        historical/live market data.
    */

    const market = {

        direction: "BULLISH",

        fibZone: true,

        liquidityManipulation: true,

        liquiditySweep: true,

        marketStructureShift: true,

        displacement: true,

        secondFibZone: true,

        finalConfirmation: false

    };


    updateTimeframes(market);

    updateFibonacci(market);

    updateConditions(market);

    updateSetup(market);

    updatePaperTradeLevels(market);

    updateExplanation(market);
}


/*
    MULTI-TIMEFRAME ANALYSIS
*/

function updateTimeframes(market) {

    document.getElementById("tf4h").textContent =
        market.direction;

    document.getElementById("tf1h").textContent =
        market.direction;

    document.getElementById("tf15m").textContent =
        market.marketStructureShift
            ? "STRUCTURE SHIFT"
            : "WAITING";

    document.getElementById("tf5m").textContent =
        market.finalConfirmation
            ? "CONFIRMED"
            : "WAITING";
}


/*
    MAIN FIBONACCI
*/

function updateFibonacci(market) {

    const high = 105000;

    const low = 100000;

    const range = high - low;


    /*
        Bullish Fibonacci:

        0%   = high
        100% = low
    */

    const fib618 =
        high - range * 0.618;

    const fib809 =
        high - range * 0.809;


    document.getElementById("fibDirection")
        .textContent = market.direction;


    document.getElementById("fib0")
        .textContent = formatPrice(high);


    document.getElementById("fib618")
        .textContent = formatPrice(fib618);


    document.getElementById("fib809")
        .textContent = formatPrice(fib809);


    document.getElementById("fib100")
        .textContent = formatPrice(low);
}


/*
    CONFIRMATION ENGINE
*/

function updateConditions(market) {

    setCondition(
        "fibCondition",
        market.fibZone
    );


    setCondition(
        "liquidityCondition",
        market.liquidityManipulation
    );


    setCondition(
        "sweepCondition",
        market.liquiditySweep
    );


    setCondition(
        "mssCondition",
        market.marketStructureShift
    );


    setCondition(
        "displacementCondition",
        market.displacement
    );


    setCondition(
        "secondFibCondition",
        market.secondFibZone
    );


    setCondition(
        "finalCondition",
        market.finalConfirmation
    );
}


function setCondition(id, condition) {

    const element = document.getElementById(id);


    if (condition) {

        element.textContent = "CONFIRMED";

    } else {

        element.textContent = "WAITING";

    }
}


/*
    SETUP STATUS
*/

function updateSetup(market) {

    const setupStatus =
        document.getElementById("setupStatus");

    const setupIcon =
        document.getElementById("setupIcon");

    const setupMessage =
        document.getElementById("setupMessage");


    if (
        market.fibZone &&
        market.liquidityManipulation &&
        market.liquiditySweep &&
        market.marketStructureShift &&
        market.displacement &&
        market.secondFibZone &&
        market.finalConfirmation
    ) {

        setupStatus.textContent =
            "CONFIRMED";

        setupIcon.textContent =
            "✓";

        setupMessage.textContent =
            "All defined confirmation conditions are satisfied. The setup is confirmed in the simulation.";

    }

    else {

        setupStatus.textContent =
            "WAITING";

        setupIcon.textContent =
            "—";

        setupMessage.textContent =
            "The setup is not fully confirmed. The engine is waiting for the remaining confirmation conditions.";

    }
}


/*
    PAPER-TRADE LEVELS

    These are demonstration values only.
*/

function updatePaperTradeLevels(market) {

    const entry =
        document.getElementById("entry");

    const stopLoss =
        document.getElementById("stopLoss");

    const target =
        document.getElementById("target");


    if (!market.finalConfirmation) {

        entry.textContent = "—";

        stopLoss.textContent = "—";

        target.textContent = "—";

        return;
    }


    const simulatedEntry = 101800;

    const simulatedStop = 100900;

    const simulatedTarget = 104500;


    entry.textContent =
        formatPrice(simulatedEntry);

    stopLoss.textContent =
        formatPrice(simulatedStop);

    target.textContent =
        formatPrice(simulatedTarget);
}


/*
    EXPLANATION
*/

function updateExplanation(market) {

    const explanation =
        document.getElementById("explanation");


    if (!market.fibZone) {

        explanation.textContent =
            "Price is not inside the required Fibonacci area.";

        return;
    }


    if (!market.liquidityManipulation) {

        explanation.textContent =
            "The Fibonacci condition is present, but liquidity manipulation has not been detected.";

        return;
    }


    if (!market.liquiditySweep) {

        explanation.textContent =
            "Manipulation is present, but the required liquidity sweep has not been detected.";

        return;
    }


    if (!market.marketStructureShift) {

        explanation.textContent =
            "The liquidity sweep occurred, but a market structure shift has not been confirmed.";

        return;
    }


    if (!market.displacement) {

        explanation.textContent =
            "Market structure shifted, but displacement has not been confirmed.";

        return;
    }


    if (!market.secondFibZone) {

        explanation.textContent =
            "The initial confirmation exists, but price has not returned to the second Fibonacci zone.";

        return;
    }


    if (!market.finalConfirmation) {

        explanation.textContent =
            "The setup has reached the final stage, but final price-action confirmation is still missing. WAIT.";

        return;
    }


    explanation.textContent =
        "All defined conditions have been satisfied in the simulation.";
}


/*
    PRICE FORMATTER
*/

function formatPrice(value) {

    return new Intl.NumberFormat(
        "en-US",
        {
            maximumFractionDigits: 2
        }
    ).format(value);
}
