// Simple modal behavior
        (function(){
            const openBtn = document.getElementById('openProfile');
            const modal = document.getElementById('profileModal');
            const closeBtn = document.getElementById('closeModal');

            function show() {
                modal.style.display = 'flex';
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                closeBtn.focus();
            }
            function hide() {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                openBtn.focus();
            }

            openBtn.addEventListener('click', show);
            closeBtn.addEventListener('click', hide);
            modal.addEventListener('click', (e) => { if (e.target === modal) hide(); });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
            // Start hidden
            modal.style.display = 'none';
        })();

        // Submit confirm modal behavior
        (function () {
            const submitBtn = document.getElementById('submitBtn');
            const confirmModal = document.getElementById('submitConfirm');
            const confirmYes = document.getElementById('confirmYes');
            const confirmNo = document.getElementById('confirmNo');
            const contactForm = document.getElementById('contactForm');
            const toast = document.getElementById('submitToast');

            if (!submitBtn || !confirmModal || !confirmYes || !confirmNo) return;

            function openConfirm() {
                confirmModal.classList.add('open');
                confirmModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                confirmNo.focus();
            }
            function closeConfirm() {
                confirmModal.classList.remove('open');
                confirmModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                submitBtn.focus();
            }
            function showToast(msg = 'Submitted successfully') {
                if (!toast) return;
                toast.textContent = msg;
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2200);
            }

            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // optional: validate email before opening modal
                const emailInput = document.getElementById('contactEmail');
                if (emailInput && emailInput.value.trim() === '') {
                    emailInput.focus();
                    emailInput.classList.add('invalid');
                    return;
                }
                openConfirm();
            });

            confirmNo.addEventListener('click', closeConfirm);

            confirmYes.addEventListener('click', () => {
                // perform submission actions 
                closeConfirm();
                showToast('Your message has been sent');
                // reset the form optionally
                if (contactForm) contactForm.reset();
            });

            // close when clicking outside content
            confirmModal.addEventListener('click', (e) => { if (e.target === confirmModal) closeConfirm(); });

            // close on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && confirmModal.classList.contains('open')) closeConfirm();
            });
        })();