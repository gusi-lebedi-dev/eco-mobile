# Tab Switching Implementation for always-connection.html

## Plan Steps:
- [x] 1. Create this TODO.md
- [x] 2. Add comprehensive inline JS script to pricing-plans/always-connection.html
- [x] 3. Update TODO.md after JS addition
- [x] 4. Implementation complete — ready for manual browser test
- [x] 5. Mark complete and finish task

**Implementation Summary:**
- **Билайн**: 3 cards (300/500/1000 mins), operators Мегафон+МТС, prices 590/750/1000₽, eSIM visible.
- **Мегафон**: 4 cards (1000/1500/2000/3000 mins), operators Билайн+МТС, prices 850/1000/1150/1300₽, eSIM hidden, Plastic SIM auto-selected.
- **МТС**: 4 cards (500/1000/2000/3500 mins), operators Мегафон+Билайн, prices 600/800/1000/1400₽, eSIM visible.
- Prices update dynamically: total price, subscription fee (price-100₽), connection fee (100₽).
- Operator toggles inside cards remain clickable.
- Static cards are regenerated on load to match the active tab.

