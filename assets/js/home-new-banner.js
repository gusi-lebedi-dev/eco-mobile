document.addEventListener('DOMContentLoaded', function() {
    const banners = document.querySelectorAll('.home-new-banner__item');

    banners.forEach(banner => {
        const modalId = banner.dataset.modal;
        const modal = document.querySelector(`.home-new-banner__modal[data-modal-id="${modalId}"]`);

        if (!modal) return;

        const button = banner.querySelector('.home-new-banner__button');
        const closeBtn = modal.querySelector('.home-new-banner__modal-close');
        const modalButton = modal.querySelector('.home-new-banner__button-modal');

        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('is-active');
            this.classList.add('is-active');

            setTimeout(() => {
                this.classList.remove('is-active');
            }, 2000);
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('is-active');
            });
        }

        if (modalButton) {
            modalButton.addEventListener('click', function() {
                this.classList.add('is-active');
                setTimeout(() => {
                    this.classList.remove('is-active');
                }, 2000);
            });
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('is-active');
            }
        });
    });
});