/*
 * CloudInfoByte site settings. This file is public (it ships to every visitor), so only put
 * values here that are meant to be public. A Web3Forms access key and a Formspree endpoint are
 * designed to be public; they only let people SEND mail to your inbox, never read it.
 *
 * Form delivery, in priority order (first one that is filled in wins):
 *   1. web3formsKey      -> https://web3forms.com  (free, enter your email there, get a key)
 *   2. formspreeEndpoint -> https://formspree.io   (free, create a form, copy "https://formspree.io/f/xxxx")
 *   3. contactEmail      -> fallback: opens the visitor's mail app (mailto:) - works with no service
 */
//window.CIB_CONFIG = {
  //web3formsKey: "e9079b42-7b87-4cc6-a551-b7354b400250",         
  //formspreeEndpoint: "https://api.web3forms.com/submit",    
  //contactEmail: "cloudinfobyte@gmail.com",
  //subjectPrefix: "CloudInfoByte enquiry"
//};


const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "e9079b42-7b87-4cc6-a551-b7354b400250");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
