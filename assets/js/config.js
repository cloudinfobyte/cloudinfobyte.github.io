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
window.CIB_CONFIG = {
  web3formsKey: "",          // e.g. "a1b2c3d4-...."
  formspreeEndpoint: "",     // e.g. "https://formspree.io/f/abcdwxyz"
  contactEmail: "",          // e.g. "hello@yourdomain.com"  (also shown on the page when set)
  subjectPrefix: "CloudInfoByte enquiry"
};
