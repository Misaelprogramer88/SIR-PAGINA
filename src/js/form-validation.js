export function initFormValidation() {
  const contactForm = document.getElementById('sirContactForm');
  if (!contactForm) return;

  const emailInput = document.getElementById('inputEmail');
  const phoneInput = document.getElementById('inputPhone');
  const messageInput = document.getElementById('inputMessage');
  const successAlert = document.getElementById('formSuccessAlert');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (input, isConditionValid) => {
    if (isConditionValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      return true;
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      return false;
    }
  };

  // Real-time input validation handlers
  emailInput.addEventListener('input', () => {
    validateField(emailInput, emailRegex.test(emailInput.value.trim()));
  });

  phoneInput.addEventListener('input', () => {
    const cleanPhone = phoneInput.value.replace(/\D/g, '');
    validateField(phoneInput, cleanPhone.length >= 8);
  });

  messageInput.addEventListener('input', () => {
    validateField(messageInput, messageInput.value.trim().length >= 10);
  });

  // Submit Handler
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()));
    const isPhoneValid = validateField(phoneInput, phoneInput.value.replace(/\D/g, '').length >= 8);
    const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10);

    if (isEmailValid && isPhoneValid && isMessageValid) {
      if (successAlert) {
        successAlert.style.display = 'flex';
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      
      contactForm.reset();

      // Clear valid classes after 3 seconds
      setTimeout(() => {
        [emailInput, phoneInput, messageInput].forEach(input => {
          input.classList.remove('is-valid');
        });
        if (successAlert) {
          successAlert.style.display = 'none';
        }
      }, 5000);
    }
  });
}
