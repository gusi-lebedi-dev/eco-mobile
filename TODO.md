# TODO: beautiful-number.html JS Functionality

## Plan

### Step 1: Filter selection logic
- Add click listeners to `.beautiful-number__form-filter` items.
- Toggle `is-active` class on clicked filter.
- Update `.text-free` span with selected filter text.
- Store value in `selectedPrice` variable.

### Step 2: Number selection logic
- Add click listeners to `.beautiful-number__list-item` elements.
- Toggle `is-active` class on clicked number.
- Update `.beautiful-number__selected-number` span with selected number text.
- Store value in `selectedNumber` variable.

### Step 3: Direct number toggle logic
- Listen for `change` on `.single-form__switch input` checkbox.
- When checked: replace codes `(903)` and `(905)` with `(495)` in all `.beautiful-number__list-item` texts and in `.beautiful-number__selected-number`.
- When unchecked: restore original codes from `data-original` attribute.
- Store state in `isDirectNumber` variable.

### Step 4: State variables
- Maintain `selectedPrice`, `selectedNumber`, `isDirectNumber` at script level.

### Files to edit
- `beautiful-number.html` (inline script block).

