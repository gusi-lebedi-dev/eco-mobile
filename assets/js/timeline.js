document.addEventListener('DOMContentLoaded', () => {
    const events = [
        { year: 2002, text: "Основание Экомобайл", position: "bottom", clickable: true, variant: "blue", cardWidth: "221px" },
        { year: 2004, text: "", position: "top", clickable: false },
        { year: 2006, text: "Первая реализация тарифов физическим лицам через аренду номеров", position: "top", clickable: true, variant: "transparent", cardWidth: "258px" },
        { year: 2008, text: "Разработан собственный продукт информационной системы", position: "bottom", clickable: true, variant: "transparent", cardWidth: "239px" },
        { year: 2010, text: "", position: "bottom", clickable: false },
        { year: 2012, text: "Расширение спектра телеком-сервисов. Работа с полным жизненным циклом абонента", position: "top", clickable: true, variant: "transparent", cardWidth: "245px" },
        { year: 2014, text: "Первые брендированные SIM-карты Экомобайл", position: "bottom", clickable: true, variant: "transparent", cardWidth: "240px" },
        { year: 2014, text: "Выход на рынок мигрантского сегмента.", position: "top", clickable: true, variant: "transparent", cardWidth: "257px" },
        { year: 2014, text: "Запуск собственной биллинговой системы. Первый шаг к платформенной модели", position: "top", clickable: true, variant: "transparent", cardWidth: "276px" },
        { year: 2016, text: "Охват регионов РФ за 2 года. Запуск планшетов с SIM-картами Экомобайл", position: "bottom", clickable: true, variant: "transparent", cardWidth: "369px" },
        { year: 2018, text: "Сложный этап масштабирования", position: "bottom", clickable: false },
        { year: 2020, text: "Новый виток развития", position: "top", clickable: false },
        { year: 2022, text: "Широкий рост абонентской базы", position: "top", clickable: false, variant: "blue", cardWidth: "220px" },
        { year: 2024, text: "Запуск новых продуктов - приложений, продуктов M2M и др.", position: "top", clickable: true, variant: "transparent", cardWidth: "292px" },
        { year: 2026, text: "Широкий рост абонентской базы", position: "bottom", clickable: true, variant: "blue", cardWidth: "221px" }
    ];

    const timeline = document.getElementById("timeline");
    const startYear = 2002;
    const endYear = 2026;
    const totalYears = endYear - startYear;

    let clickableDots = [];

    const yearCount = {};
    events.forEach(event => {
        yearCount[event.year] = (yearCount[event.year] || 0) + 1;
    });

    const yearIndex = {};
    events.forEach(event => {
        if (!yearIndex[event.year]) {
            yearIndex[event.year] = 0;
        }
        event.groupIndex = yearIndex[event.year]++;
        event.groupTotal = yearCount[event.year];
    });


    events.forEach((event) => {
        let  percent = (event.year - startYear) / totalYears;

        if (event.groupTotal > 1) {
            const offset = (event.groupIndex - (event.groupTotal - 1) / 2) * 3;
            percent += offset / 100;
            percent = Math.max(0.03, Math.min(0.97, percent));
        }

        const eventEl = document.createElement("div");
        eventEl.className = "event";
        eventEl.style.left = `${percent * 100}%`;
        timeline.appendChild(eventEl);

        if (event.groupIndex === 0) {
            const year = document.createElement("div");
            year.className = "year";
            year.textContent = event.year;
            eventEl.appendChild(year);
        }

        if (!event.clickable) {
            return;
        }

        const dotCenter = document.createElement("div");
        dotCenter.className = "dot-center";
        eventEl.appendChild(dotCenter);

        const baseHeight = 80 + Math.random() * 200;
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

        if (event.text.includes('\n')) {
            card.style.whiteSpace = 'pre-wrap';
            card.textContent = event.text;
        } else {
            card.textContent = event.text;
        }

        card.style.position = "absolute";
        card.style.left = "50%";
        card.style.transform = "translateX(-50%)";

        if (event.cardWidth) {
            card.style.width = event.cardWidth;
            card.style.maxWidth = "90vw";
        } else {
            card.style.width = "max-content";
            card.style.maxWidth = "250px";
        }

        card.style.textAlign = "left";
        card.style.padding = "30px";
        card.style.borderRadius = "10px";
        card.style.fontSize = "14px";
        card.style.opacity = "0";
        card.style.visibility = "hidden";
        card.style.transition = "all 0.3s ease";
        card.style.zIndex = "10";

        if (event.text.length > 80) {
            card.style.fontSize = "13px";
            card.style.lineHeight = "1.5";
        }

        eventEl.appendChild(card);

        clickableDots.push(dotEnd);

        dotEnd.addEventListener("click", (e) => {
            e.stopPropagation();

            card.style.display = "block";
            card.style.visibility = "hidden";
            card.style.opacity = "0";

            const dotRect = dotEnd.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const timelineRect = timeline.getBoundingClientRect();

            const offset = 2;
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