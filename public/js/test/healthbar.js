
function healthTo(actualPs, damage, maxHp, initPs, finalPs) {
    var interval;
    var health = document.querySelector(".info.you > .wrap > .health");
    var initialHealth = cfg.user.stats.hp;
    // console.log("initialHealth", initialHealth);
    console.log("actualPs", actualPs);
    console.log(maxHp);
    // console.log("damage", damage);
    // console.log("maxHp", maxHp);
    damage < 0 ? initialHealth-- : initialHealth++;
    health.innerHTML = ((cfg.user.stats.hp+damage) > 0 ? cfg.user.stats.hp+damage : 0) + "/" + cfg.user.stats.maxHp;
    interval = setInterval(function () {
        damage < 0 ? initialHealth-- : initialHealth++;

        health.innerHTML = initialHealth + "/" + health.innerHTML.split("/")[1];

        if (initialHealth == (actualPs + damage)) {
            clearInterval(interval);

            if (actualPs <= 0) {
                health.innerHTML = "0/" + health.innerHTML.split("/")[1];
                return;
            }
        }
    }, 100);

    var bar = document.querySelector(".info.you > .wrap > .healthbar");
    bar.style.transition = "all " + 0.02 * (finalPs) + "s linear";

    bar.style.width = "calc(14vmin * " + (finalPs / maxHp) + ")";
    bar.style.right = "calc(var(--font-size) + (14vmin - 14vmin * " + (finalPs / maxHp) + "))";
    console.log("finalPs",finalPs);
    if ((finalPs) <= (maxHp *0.1)) {
        bar.classList.remove("full");
        bar.classList.remove("half");
        bar.classList.add("quarter");
    } else if ((finalPs) <= (maxHp *0.5)){
        bar.classList.remove("full");
        bar.classList.remove("quarter");
        bar.classList.add("half");
    } else if ((finalPs) > (maxHp *0.5)){
        bar.classList.remove("quarter");
        bar.classList.remove("half");
        bar.classList.add("full");
    }
}