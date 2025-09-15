document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.getElementById('deliveryTabs');
    if (!tabs) return;

    const headers = tabs.querySelectorAll('.tabs__header');
    const bodies = tabs.querySelectorAll('.tabs__body');

    function activateTab(index) {
        headers.forEach((hdr, i) => {
            const selected = i === index;
            hdr.classList.toggle('active', selected);
            hdr.setAttribute('aria-selected', selected);
            bodies[i].classList.toggle('active', selected);
            if (selected) {
                bodies[i].removeAttribute('hidden');
            } else {
                bodies[i].setAttribute('hidden', '');
            }
        });
    }

    headers.forEach((hdr, idx) => {
        hdr.addEventListener('click', () => activateTab(idx));
        hdr.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                let next = idx + (e.key === 'ArrowRight' ? 1 : -1);
                if (next < 0) next = headers.length - 1;
                if (next >= headers.length) next = 0;
                headers[next].focus();
                activateTab(next);
            } // ДОБАВИТЬ ЭТУ СКОБКУ!
        });
    });

    activateTab(0);
});
