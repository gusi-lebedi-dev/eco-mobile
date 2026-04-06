document.addEventListener('DOMContentLoaded', () => {
    const events = [
        { year: 2002, text: "Основание Экомобайл", position: "bottom", clickable: true, variant: "blue" },
        { year: 2004, text: "", position: "top", clickable: false },
        { year: 2006, text: "Первая реализация тарифов физическим лицам через аренду номеров", position: "top", clickable: true, variant: "transparent" },
        { year: 2008, text: "Период кризиса и реструктуризация", position: "bottom", clickable: true, variant: "white" },
        { year: 2010, text: "", position: "bottom", clickable: false },
        { year: 2012, text: "Возвращение к росту", position: "top", clickable: true, variant: "blue" },
        { year: 2014, text: "Возвращение к росту", position: "bottom", clickable: true, variant: "transparent" },
        { year: 2016, text: "Технологическая трансформация", position: "bottom", clickable: true, variant: "white" },
        { year: 2018, text: "Сложный этап масштабирования", position: "bottom", clickable: false },
        { year: 2020, text: "Новый виток развития", position: "top", clickable: false },
        { year: 2022, text: "Широкий рост абонентской базы", position: "top", clickable: false, variant: "blue" },
        { year: 2024, text: "Широкий рост абонентской базы", position: "top", clickable: true, variant: "blue" },
        { year: 2026, text: "Широкий рост абонентской базы", position: "bottom", clickable: true, variant: "transparent" }
    ];

    const timeline = document.getElementById("timeline");
    const startYear = 2002;
    const endYear = 2026;
    const totalYears = endYear - startYear;

    let clickableDots = [];

    events.forEach((event) => {
        const percent = (event.year - startYear) / totalYears;

        const eventEl = document.createElement("div");
        eventEl.className = "event";
        eventEl.style.left = `${percent * 100}%`;
        timeline.appendChild(eventEl);

        const year = document.createElement("div");
        year.className = "year";
        year.textContent = event.year;
        eventEl.appendChild(year);

        if (!event.clickable) {
            return;
        }

        const dotCenter = document.createElement("div");
        dotCenter.className = "dot-center";
        eventEl.appendChild(dotCenter);

        const baseHeight = 80 + Math.random() * 150;
        const centerLineY = 200;
        const visualOffset = (Math.random() - 0.5) * 10;

        const connector = document.createElement("div");
        connector.className = "connector";

        if (event.position === "top") {
            connector.style.top = `${centerLineY - baseHeight}px`;
            connector.style.height = `${baseHeight}px`;
        } else {
            connector.style.top = `${centerLineY}px`;
            connector.style.height = `${baseHeight}px`;
        }
        eventEl.appendChild(connector);

        const dotEnd = document.createElement("div");
        dotEnd.className = "dot-end clickable";
        if (event.position === "top") {
            dotEnd.style.top = `${centerLineY - baseHeight + visualOffset}px`;
        } else {
            dotEnd.style.top = `${centerLineY + baseHeight + visualOffset}px`;
        }
        eventEl.appendChild(dotEnd);

        const variant = event.variant || 'blue';
        const card = document.createElement("div");
        card.className = `card card--${variant}`;
        card.textContent = event.text;
        card.style.position = "absolute";
        card.style.left = "50%";
        card.style.transform = "translateX(-50%)";
        card.style.width = "260px";
        card.style.textAlign = "center";
        card.style.padding = "16px";
        card.style.borderRadius = "12px";
        card.style.fontSize = "14px";
        card.style.opacity = "0";
        card.style.visibility = "hidden";
        card.style.transition = "all 0.3s ease";
        card.style.zIndex = "10";
        eventEl.appendChild(card);

        clickableDots.push(dotEnd);

        dotEnd.addEventListener("click", (e) => {
            e.stopPropagation();

            card.style.display = "block";
            card.style.visibility = "hidden";

            const dotRect = dotEnd.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const timelineRect = timeline.getBoundingClientRect();

            const offset = 8;
            if (event.position === "top") {
                card.style.top = `${dotRect.top - timelineRect.top - offset}px`;
            } else {
                card.style.top = `${dotRect.top - timelineRect.top + offset}px`;
            }

            card.style.opacity = "1";
            card.style.visibility = "visible";
            dotEnd.style.display = "none";
        });

        card.addEventListener("click", (e) => {
            e.stopPropagation();
            card.style.opacity = "0";
            card.style.visibility = "hidden";
            dotEnd.style.display = "block";
        });
    });

    function startWave() {
        clickableDots.forEach((dot, i) => {
            setTimeout(() => {
                dot.classList.add("pulse");
                setTimeout(() => {
                    dot.classList.remove("pulse");
                }, 1400);
            }, i * 400);
        });
    }

    setInterval(startWave, 2000);
});