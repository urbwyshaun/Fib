/*
    PLUTO ANALYSIS
    VERSION 2 - SMART SIMULATION
    Educational simulation engine.
*/

const analyzeButton = document.getElementById("analyzeButton");
analyzeButton.addEventListener("click", analyzeMarket);

const assetConfigs = {
    "BTC/USD": { high: 105000, low: 100000, decimals: 2 },
    "XAU/USD": { high: 2680, low: 2620, decimals: 2 },
    "EUR/USD": { high: 1.08500, low: 1.07200, decimals: 5 },
    "GBP/USD": { high: 1.27500, low: 1.26100, decimals: 5 }
};

function analyzeMarket() {
    const assetSelect = document.getElementById("asset");
    const asset = assetSelect.value;
    const config = assetConfigs[asset] || assetConfigs["BTC/USD"];

    // Create dynamic conditions - different per pair and per click
    const baseChance = Math.random();

    // Make it so sometimes ALL pass (for demo)
    const isFullConfirmation = baseChance > 0.65;

    const market = {
        asset: asset,
        direction: Math.random() > 0.5? "BULLISH" : "BEARISH",
        fibZone: baseChance > 0.15,
        liquidityManipulation: baseChance > 0.25,
        liquiditySweep: baseChance > 0.35,
        marketStructureShift: baseChance > 0.45,
        displacement: baseChance > 0.55,
        secondFibZone: baseChance > 0.60,
        finalConfirmation: isFullConfirmation,
        config: config
    };

    updateTimeframes(market);
    updateFibonacci(market);
    updateConditions(market);
    updateSetup(market);
    updatePaperTradeLevels(market);
    updateExplanation(market);
}

function updateTimeframes(market) {
    document.getElementById("tf4h").textContent = market.direction;
    document.getElementById("tf1h").textContent = market.direction;
    document.getElementById("tf15m").textContent = market.marketStructureShift? "STRUCTURE SHIFT" : "WAITING";
    document.getElementById("tf5m").textContent = market.finalConfirmation? "CONFIRMED" : "WAITING";
}

function updateFibonacci(market) {
    const { high, low, decimals } = market.config;
    const range = high - low;
    const isBullish = market.direction === "BULLISH";

    let fib618, fib809;
    if (isBullish) {
        fib618 = high - range * 0.618;
        fib809 = high - range * 0.809;
    } else {
        fib618 = low + range * 0.618;
        fib809 = low + range * 0.809;
    }

    document.getElementById("fibDirection").textContent = market.direction;
    document.getElementById("fib0").textContent = formatPrice(isBullish? high : low, decimals);
    document.getElementById("fib618").textContent = formatPrice(fib618, decimals);
    document.getElementById("fib809").textContent = formatPrice(fib809, decimals);
    document.getElementById("fib100").textContent = formatPrice(isBullish? low : high, decimals);
}

function updateConditions(market) {
    setCondition("fibCondition", market.fibZone);
    setCondition("liquidityCondition", market.liquidityManipulation);
    setCondition("sweepCondition", market.liquiditySweep);
    setCondition("mssCondition", market.marketStructureShift);
    setCondition("displacementCondition", market.displacement);
    setCondition("secondFibCondition", market.secondFibZone);
    setCondition("finalCondition", market.finalConfirmation);
}

function setCondition(id, condition) {
    const element = document.getElementById(id);
    element.textContent = condition? "CONFIRMED" : "WAITING";
    element.style.color = condition? "#00ff88" : "#777";
}

function updateSetup(market) {
    const setupStatus = document.getElementById("setupStatus");
    const setupIcon = document.getElementById("setupIcon");
    const setupMessage = document.getElementById("setupMessage");

    const allConfirmed = market.fibZone && market.liquidityManipulation && market.liquiditySweep && market.marketStructureShift && market.displacement && market.secondFibZone && market.finalConfirmation;

    if (allConfirmed) {
        setupStatus.textContent = "CONFIRMED";
        setupStatus.style.color = "#00ff88";
        setupIcon.textContent = "✓";
        setupIcon.style.color = "#00ff88";
        setupMessage.textContent = `${market.asset} - All conditions satisfied. ${market.direction} setup confirmed in simulation.`;
    } else {
        setupStatus.textContent = "WAITING";
        setupStatus.style.color = "#fff";
        setupIcon.textContent = "—";
        setupIcon.style.color = "#fff";
        setupMessage.textContent = `${market.asset} - ${market.direction} bias. Waiting for remaining confirmations.`;
    }
}

function updatePaperTradeLevels(market) {
    const entry = document.getElementById("entry");
    const stopLoss = document.getElementById("stopLoss");
    const target = document.getElementById("target");
    const { high, low, decimals } = market.config;

    if (!market.finalConfirmation) {
        entry.textContent = "—"; stopLoss.textContent = "—"; target.textContent = "—";
        return;
    }

    const mid = (high + low) / 2;
    const range = (high - low) * 0.3;
    const simulatedEntry = mid;
    const simulatedStop = market.direction === "BULLISH"? mid - range : mid + range;
    const simulatedTarget = market.direction === "BULLISH"? mid + range * 2 : mid - range * 2;

    entry.textContent = formatPrice(simulatedEntry, decimals);
    stopLoss.textContent = formatPrice(simulatedStop, decimals);
    target.textContent = formatPrice(simulatedTarget, decimals);
}

function updateExplanation(market) {
    const explanation = document.getElementById("explanation");
    const asset = market.asset;
    if (!market.fibZone) { explanation.textContent = `${asset}: Price is not inside the required Fibonacci area.`; return; }
    if (!market.liquidityManipulation) { explanation.textContent = `${asset}: Inside Fib zone, but liquidity manipulation not detected.`; return; }
    if (!market.liquiditySweep) { explanation.textContent = `${asset}: Manipulation present, waiting for liquidity sweep.`; return; }
    if (!market.marketStructureShift) { explanation.textContent = `${asset}: Sweep occurred, waiting for Market Structure Shift.`; return; }
    if (!market.displacement) { explanation.textContent = `${asset}: MSS confirmed, waiting for displacement.`; return; }
    if (!market.secondFibZone) { explanation.textContent = `${asset}: Displacement confirmed, waiting for return to second Fib zone.`; return; }
    if (!market.finalConfirmation) { explanation.textContent = `${asset}: At second Fib zone, waiting for final price-action confirmation. WAIT.`; return; }
    explanation.textContent = `${asset}: ${market.direction} - All defined conditions satisfied in the simulation.`;
}

function formatPrice(value, decimals) {
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}
